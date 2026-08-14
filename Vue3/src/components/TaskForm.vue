<!-- 任务表单 -->
<script setup>
import {reactive, ref, watch, nextTick} from 'vue'
import { useTaskStore } from '@/stores/taskStore';
// import 'dayjs/locale/zh-cn'
import { statusOptions, priorityOptions} from "@/utils/constants"
import { ElMessage } from 'element-plus';
const taskStore = useTaskStore()
// 表单数据
const ruleForm = reactive({
    id: null,
    title: '',
    description: '',
    assignee: '',
    priority: 'medium',
    status: 'todo',
    dueDate: null
})
// 表单校验
const formRef = ref()
const rules = reactive({
    title: [
        {required: true, message: '请输入标题', trigger: 'blur'},
        {min: 1, max: 100, message: '标题长度为1-100个字符', trigger: 'blur'}
    ],
    assignee:[
        {required: true, message: '请输入作者', trigger: 'blur'},
        {min: 1, max: 30, message: '标题长度为1-30个字符', trigger: 'blur'}
    ],
    priority: [
        {required: true, message: '请选择优先级', trigger: 'blur'},
    ],
    status: [
        {required: true, message: '请选择状态', trigger: 'blur'},
    ],
    dueDate: [
        {pattern: /^\d{4}-\d{2}-\d{2}$/,message: '日期格式必须为YYYY-MM-DD', trigger: 'change'}
    ]
})
// 重置表单数据
const resetForm = () => {
    ruleForm.id = null
    ruleForm.title= '',
    ruleForm.description= '',
    ruleForm.assignee= '',
    ruleForm.priority= 'medium',
    ruleForm.status= 'todo',
    ruleForm.dueDate= null
    // 清除错误校验
    nextTick(() => {
        formRef.value?.clearValidate()
    })
}
// 数据回显
const setFormData = (data) => {
    if (data) {
        ruleForm.id = data.id
        ruleForm.title = data.title
        ruleForm.description = data.description  || ''
        ruleForm.assignee = data.assignee
        ruleForm.priority = data.priority 
        ruleForm.status = data.status 
        ruleForm.dueDate =  data.dueDate ? data.dueDate.split('T')[0] : null

    }
    // 清除错误校验
    nextTick(() => {
        formRef.value?.clearValidate()
    })
}
// 监听弹窗打开
watch(() => taskStore.isVisible,(visibile) => {
    if (visibile) {
        if (taskStore.isEdit && taskStore.editData) {
            // 编辑 回显数据
            setFormData(taskStore.editData)
        }else {
            // 新增 重置表单
            resetForm()
        }
    }
})
// 提交状态
const submitting = ref(false)
// 提交表单
const handleSubmit = async () => {
    if (submitting.value) return
    try {
        // 等待表单校验通过
        await formRef.value.validate()
        submitting.value = true
        const submitData = {
            title: ruleForm.title.trim(),
            description: ruleForm.description.trim() || '',
            assignee: ruleForm.assignee.trim(),
            priority: ruleForm.priority,
            status: ruleForm.status,
            dueDate: ruleForm.dueDate || null
        }
        // 编辑
        if (taskStore.isEdit) {
            await taskStore.editTask(ruleForm.id, submitData)
            ElMessage.success('编辑成功')
        }else {
            // 创建
            await taskStore.addTask(submitData)
            ElMessage.success('创建成功')
        }
        taskStore.isVisible = false
    }catch(err){ }finally {
        submitting.value = false
    }
}
// 取消
const handleCancel = () => {
    if (submitting.value) {
        ElMessage.warning('正在提交中，请勿关闭')
        return
    }
    taskStore.isVisible=false
}
</script>
<template>
    <el-dialog v-model= "taskStore.isVisible"
    :title="taskStore.isEdit ?' 编辑内容' : '新增内容'" :show-close="!submitting"  
    :close-on-click-modal="false" width="50%"
     style="border-radius: 8px; background: #f8f9fc;" 
    >
    <el-form label-width="auto" ref="formRef" :model="ruleForm" :rules="rules"  style="margin: 0 4px;" >
        <el-form-item label="标题" prop="title">
            <el-input v-model="ruleForm.title" placeholder="请输入内容标题" maxlength="100" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="文案">
            <el-input
            v-model="ruleForm.description"
                placeholder="内容说明或文案"
                :rows="3"
                type="textarea"
                maxlength="500"
               show-word-limit 
            />
        </el-form-item>
        <el-form-item label="作者" prop="assignee">
            <el-input v-model="ruleForm.assignee" placeholder="请输入作者昵称" max-length="30" show-word-limit></el-input>
        </el-form-item>
        <el-row>
            <el-col :xs="24" :sm="12">
                <el-form-item label="优先级" prop="priority">
                    <el-select v-model="ruleForm.priority" placeholder="请选择优先级" >
                        <el-option v-for="item in priorityOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12">
                <el-form-item label="状态" prop="status">
                    <el-select v-model="ruleForm.status" placeholder="请选择状态" >
                        <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" ></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-form-item label="截止日期" prop="dueDate">
            <el-date-picker
                v-model="ruleForm.dueDate"
                type="date"
                placeholder="请选择截止日期"
                value-format="YYYY-MM-DD"
                clearable
                style="width: 100%;"
                :disabled-date="(time) => time.getTime() < new Date().setHours(0,0,0,0)"
            />
        </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button style="width: 80px;" @click="handleCancel"  :disabled="submitting">取消</el-button>
        <el-button type="primary" style="width: 80px;" @click="handleSubmit" :loading="submitting">
          {{taskStore.isEdit ? '保存修改' : '创建内容'}}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<style scoped>
@media (max-width: 768px) {
:global(.el-dialog) {
        width: 80% !important;
    }
}
</style>
