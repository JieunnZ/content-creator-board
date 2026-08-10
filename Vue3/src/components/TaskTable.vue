<!-- 任务列表 -->
<script setup>
import {priorityTag,priorityMap, statusOptions} from "@/utils/constants"
import { useTaskStore } from '@/stores/taskStore'
import dayjs from 'dayjs'
const taskStore = useTaskStore()
// 编辑任务
const openEditForm = (task) => {
    taskStore.isVisible = true
    taskStore.isEdit = true
    taskStore.editData = {...task}
    console.log(taskStore.editData)
}
</script>
<template>
    <div class="task-table">
        <!-- 桌面端 -->
        <el-card class="pc-card">
            <el-table :data="taskStore.tasksData" style="width: 100%" >
                <el-table-column prop="id" label="ID" width="60" />
                <el-table-column prop="title" label="标题" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="assignee" label="负责人" width="80" />
                <el-table-column prop="priority" label="优先级" width="80">    
                    <template #default="{ row }">
                        <el-tag :type="priorityTag[row.priority]">{{ priorityMap[row.priority] }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="状态" width="100">
                    <template #default="{ row }">
                        <el-select size="small" v-model="row.status" @change="taskStore.changeStatus(row)">
                            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column prop="dueDate" label="截止日期" width="120" align="center">
                    <template #default="{ row }">
                        {{ row.dueDate ?dayjs(row.dueDate).format('YYYY-MM-DD') : '-' }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180" fixed="right" >
                    <template #default="{ row }">
                        <el-button @click="openEditForm(row)">编辑</el-button>
                        <el-button>删除</el-button>
                    </template>
                </el-table-column>
                <template #empty>
                    <el-empty :description="taskStore.isEmpty? '无匹配结果' : '暂无任务'">
                        <el-button style="margin-top: -60px;" plain @click="taskStore.handleReset">加载所有</el-button>
                    </el-empty>
                </template>
            </el-table> 
        </el-card>
        <!-- 手机端 -->
        <el-card class="mobile-card" v-for="row in taskStore.tasksData">
            <template #header>
                <div class="mobile-title">{{ row.title }}</div>
            </template>
            <div class="mobile-body">
                <div class="mobile-row">
                    <span class="mobile-label">负责人</span>
                    <span > {{ row.assignee }}</span>
                </div>
                <div class="mobile-row">
                    <span class="mobile-label">优先级</span>
                    <el-tag :type="priorityTag[row.priority]">{{ priorityMap[row.priority] }}</el-tag>
                </div>
                <div class="mobile-row">
                    <span class="mobile-label">状态</span>
                    <el-select size="small" v-model="row.status" @change="taskStore.changeStatus(row)">
                        <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </div>
                <div class="mobile-row">
                    <span class="mobile-label">发布日期</span>
                    <span > {{ row.dueDate ?dayjs(row.dueDate).format('YYYY-MM-DD') : '-' }}</span>
                </div>
                <div class="mobile-actions">
                    <el-button link size="small" type="primary" @click="openEditForm(row)">编辑</el-button>
                    <el-button link size="small"type="danger" >删除</el-button>
                </div>
            </div>
        </el-card>
        <!-- 无匹配数据 -->
        <div class="empty-stats" v-if="taskStore.tasksData.length === 0">
            <el-empty :description="taskStore.isEmpty? '无匹配结果' : '暂无任务'">
                <el-button plain @click="taskStore.handleReset">加载所有</el-button>
            </el-empty>
        </div>
    </div>
</template>
<style scoped>
    /* .mobile-card {
        display: none;
    } */
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
    }
    .mobile-row {
        font-size: 14px;
        padding: 3px 0;
    }
    .mobile-row .el-select {
        width: 120px;
    }
    .mobile-label {
        color: #8c8c8c;
        display: inline-block;
        width: 110px;
    }
    .mobile-actions {
        margin-top: 4px;
        display: flex;
        justify-content: space-around;
    }
/* 手机端适配 */
/* @media (max-width: 375px) {
    .mobile-card {
        display: block;
    }
    .pc-card {
        display: none !important;
    }
} */
</style>