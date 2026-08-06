<!-- 任务列表 -->
<script setup>
import {statusTag, statusMap, priorityTag,priorityMap, statusOptions} from "@/utils/constants"
    const tasksData = [
        {id:1, title:"今日上班vlog今日上班vlog今日上班vlog今日上班vlog今日上班vlog", assignee: "zzz", priority: "high", status: "todo", dueDate: "2026-8-6"},
        {id:1, title:"今日上班vlog今日上班vlog今日上班vlog今日上班vlog今日上班vlog", assignee: "zzz", priority: "high", status: "已完成", dueDate: "2026-8-6"},
        {id:1, title:"今日上班vlog今日上班vlog今日上班vlog今日上班vlog今日上班vlog", assignee: "zzz", priority: "high", status: "已完成", dueDate: "2026-8-6"}
    ]
</script>
<template>
    <div class="task-table">
        <!-- 桌面端 -->
        <el-card class="pc-card">
            <el-table :data="tasksData" style="width: 100%" >
                <el-table-column prop="id" label="ID" width="60" />
                <el-table-column prop="title" label="标题" min-width="120" show-overflow-tooltip>
                    <!-- <template></template> -->
                </el-table-column>
                <el-table-column prop="assignee" label="负责人" width="80" />
                <el-table-column prop="priority" label="优先级" width="80">    
                    <!-- <template></template> -->
                </el-table-column>
                <el-table-column prop="status" label="状态" width="80">
                    <!-- <template></template> -->
                </el-table-column>
                <el-table-column prop="dueDate" label="截止日期" width="120">
                    <!-- <template></template> -->
                </el-table-column>
                <el-table-column label="操作" width="180" fixed="right" >
                    <template #default="tasksDate">
                        <el-button>编辑</el-button>
                        <el-button>编辑</el-button>
                    </template>
                </el-table-column>
            </el-table> 
        </el-card>
        <!-- 手机端 -->
        <el-card class="mobile-card" v-for="row in tasksData">
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
                    <el-select size="small">
                        <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </div>
                <div class="mobile-row">
                    <span class="mobile-label">发布/截止日期</span>
                    <span > {{ row.dueDate }}</span>
                </div>
                <div class="mobile-actions">
                    <el-button type="text" size="small" >编辑</el-button>
                    <el-button type="text" size="small" style="color: #f56c6c" >删除</el-button>
                </div>
            </div>
        </el-card>
    </div>
</template>
<style scoped>
/* 手机端适配 */
@media (max-width: 768px) {
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
}
</style>