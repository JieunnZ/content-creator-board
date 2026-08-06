<!-- 任务表单 -->
<script setup>
import {ref} from 'vue'
// import 'dayjs/locale/zh-cn'
import {statusTag, statusMap, priorityTag,priorityMap, statusOptions, priorityOptions} from "@/utils/constants"
const dialogVisible = ref(true)
</script>
<template>
     <el-dialog v-model= "dialogVisible"
    title="新增内容"
    width="90%"
  >
    <el-form label-width="auto">
        <el-form-item label="标题">
            <el-input placeholder="请输入内容标题" max-length="100" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="文案">
            <el-input
                placeholder="内容说明或文案"
                :rows="2"
                type="textarea"
                max-length="500"
                show-word-limit
                rows="3"
            />
        </el-form-item>
        <el-form-item label="作者">
            <el-input placeholder="请输入作者昵称" max-length="30" show-word-limit></el-input>
        </el-form-item>
        <el-row>
            <el-col :span="12">
                <el-form-item label="优先级">
                    <el-select placeholder="请选择优先级" style="width: 200px;">
                        <el-option v-for="item in priorityOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="状态">
                    <el-select placeholder="请选择状态" style="width: 200px;">
                        <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" ></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-form-item label="截止日期">
            <el-date-picker
                type="date"
                placeholder="请选择截止日期"
                :size="size"
                value-format="YYYY-MM-DD"
                clearable
                style="width: 100%;"
            />
        </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button style="width: 80px;">取消</el-button>
        <el-button type="primary" style="width: 80px;">
          保存修改
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<style scoped></style>