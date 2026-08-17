
<!-- 任务列表 -->
<script setup>
import {priorityTag,priorityMap, statusOptions} from "@/utils/constants"
import { useTaskStore } from '@/stores/taskStore'
import dayjs from 'dayjs'
import { ElMessageBox } from 'element-plus'
const taskStore = useTaskStore()
// 编辑任务
const openEditForm = async (task) => {
    const data = await taskStore.getTask(task.id)
    taskStore.isVisible = true
    taskStore.isEdit = true
    taskStore.editData = data
}
// 删除任务
const handleDelete = async (task) => {
    try {
        await ElMessageBox.confirm(
            `确认删除[${ task.title}]吗？此操作不可恢复。`,'确认删除',   {confirmButtonText: '确认删除',cancelButtonText: '取消',type: 'warning',closeOnClickModal: false,}
        )
        await taskStore.deleteTaskById(task.id)
    }catch (err) {
        if (err !== 'cancel') {
            return
        }
    }
}
</script>
<template>
    <div class="task-table"  v-loading.fullscreen.lock="taskStore.loading" element-loading-background="rgba(122, 122, 122, 0.8)" element-loading-text="加载中，请稍候...">
        <!-- 桌面端 -->
         <div class="pc-task">
            <!-- 错误状态 -->
            <div class="taskStore.error" v-if="taskStore.error">
                <el-empty :description="taskStore.error">
                    <el-button  plain type="primary" @click="taskStore.handleReset">重试</el-button>
                </el-empty>
            </div>
            <div v-else class="pc-card">
                <el-table :data="taskStore.tasksData" style="width: 100%;" >
                    <el-table-column fixed  prop="id" label="ID" width="100" />
                    <el-table-column prop="title" label="标题" min-width="200" show-overflow-tooltip>
                        <template #default="{ row }">
                            <span :class="{ 'task-done': row.status === 'done' }">
                                {{ row.title }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="assignee" label="作者" width="180" align="center" show-overflow-tooltip/>
                    <el-table-column prop="priority" label="优先级" width="180" align="center">    
                        <template #default="{ row }">
                            <el-tag :type="priorityTag[row.priority]">{{ priorityMap[row.priority] }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" label="状态" width="120" align="center">
                        <template #default="{ row }">
                            <el-select size="small" v-model="row.status" @focus="() => { row._oldStatus = row.status }" @change="(val) => taskStore.changeStatus(row, val, row._oldStatus)">
                                <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column prop="dueDate" label="截止日期" width="180" align="center">
                        <template #default="{ row }">
                            {{ row.dueDate ?dayjs(row.dueDate).format('YYYY-MM-DD') : '-' }}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="200" fixed="right" align="center" >
                        <template #default="{ row }">
                            <el-button @click="openEditForm(row)"  :disabled="taskStore.isDeleting&& taskStore.deletingId === row.id">编辑</el-button>
                            <el-button @click="handleDelete(row)" :disabled="taskStore.isDeleting && taskStore.deletingId === row.id" plain>删除</el-button>
                        </template>
                    </el-table-column>
                    <template #empty>
                        <el-empty :description="taskStore.isEmpty? '无匹配结果' : '暂无任务'">
                            <el-button style="margin-top: -60px;" plain @click="taskStore.isEmpty?taskStore.handleReset() : taskStore.openAddForm()" >{{ taskStore.isEmpty? '清空筛选' : '新增任务' }}</el-button>
                        </el-empty>
                    </template>
                </el-table> 
            </div>
        </div>
        <!-- 手机端 -->
        <div class="mobile-task">
            <div class="error" v-if="taskStore.error">
                <el-empty :description="taskStore.error">
                    <el-button  plain type="primary" @click="taskStore.handleReset">重试</el-button>
                </el-empty>
            </div>
            <!-- 无匹配数据 -->
            <div class="empty-stats" v-else-if="taskStore.tasksData.length === 0">
                <el-empty :description="taskStore.isEmpty? '无匹配结果' : '暂无任务'">
                    <el-button plain  @click="taskStore.isEmpty?taskStore.handleReset() : taskStore.openAddForm()">{{ taskStore.isEmpty? '清空筛选' : '新增任务' }}</el-button>
                </el-empty>
            </div>
            <el-card v-else class="mobile-card" v-for="row in taskStore.tasksData" :key="row.id" >
                <template #header>
                    <div class="mobile-title" :class="{ 'card-done': row.status === 'done' }" :title="row.title" >{{ row.title }}</div>
                </template>
                <div class="mobile-body">
                    <div class="mobile-row">
                        <span class="mobile-label">作者</span>
                        <span :title="row.assignee"  style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1;max-width: 100px;"> {{ row.assignee }}</span>
                    </div>
                    <div class="mobile-row">
                        <span class="mobile-label">优先级</span>
                        <el-tag :type="priorityTag[row.priority]">{{ priorityMap[row.priority] }}</el-tag>
                    </div>
                    <div class="mobile-row">
                        <span class="mobile-label">状态</span>
                        <el-select size="small" v-model="row.status" @focus="() => { row._oldStatus = row.status }" @change="(val) => taskStore.changeStatus(row, val, row._oldStatus)">
                            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </div>
                    <div class="mobile-row">
                        <span class="mobile-label">发布日期</span>
                        <span > {{ row.dueDate ?dayjs(row.dueDate).format('YYYY-MM-DD') : '-' }}</span>
                    </div>
                    <div class="mobile-actions">
                        <el-button link  type="primary" @click="openEditForm(row)"  :disabled="taskStore.isDeleting">编辑</el-button>
                        <el-button link type="danger" @click="handleDelete(row)" :disabled="taskStore.isDeleting && taskStore.deletingId === row.id">删除</el-button>
                    </div>
                </div>
            </el-card>
        </div>
    </div>
</template>
<style scoped>
    .task-table {
        flex:1;
        padding: 0 5px;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .pc-task {
        flex: 1;
        display: flex;
        flex-direction: column;
    }
    .pc-card {
        flex: 1;
    }
    .task-done {
        color: #b0b0b0;
        text-decoration: line-through;
    }

    .mobile-task {
        display: none;
    }
    .mobile-card {
        margin-bottom: 8px;
        border-radius: 8px;
        padding: 0px 16px;
        border-bottom: 1px solid #f0f0f0;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
    }
    .mobile-title {
        font-weight: 600;
        color: #1a1a2e;
        overflow: hidden; 
        text-overflow: ellipsis; 
        white-space: nowrap; 
        max-width: 280px;
    }
    .card-done {
        color: #b0b0b0;
        text-decoration: line-through;
    }
    .mobile-row {
        font-size: 14px;
        padding: 3px 0;
        margin-bottom: 4px;
        display: flex;
    }
    .mobile-row .el-select {
        width: 120px;
    }
    .mobile-label {
        color: #8c8c8c;
        width: 110px;
    }
    .mobile-actions {
        margin-top: 6px;
        display: flex;
        justify-content: space-around;
    }
    .mobile-actions .el-button {
        min-width: 44px;
    }
/* 手机端适配  */
@media (max-width: 376px) {
    .mobile-task {
        display: block;
    }
    .pc-task {
        display: none !important;
    }
} 
</style>