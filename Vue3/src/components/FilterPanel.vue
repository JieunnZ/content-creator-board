<!-- 筛选区域 -->
<script setup>
import { statusOptions, priorityOptions } from '@/utils/constants';
import { useTaskStore } from '@/stores/taskStore';
import { Search } from '@element-plus/icons-vue'
const taskStore = useTaskStore()
// 筛选搜索
const handleSearch = ()=>{
    taskStore.loadTask(taskStore.filters) 
}
</script>
<template>
    <div class="filter-panel">
        <!-- 标题关键字搜索 -->
        <el-input placeholder="搜索标题" v-model="taskStore.filters.keyword" clearable class="filter-item" @keyup.enter="handleSearch" :prefix-icon="Search"></el-input>
        <!-- 状态搜索 -->
        <el-select placeholder="请选择状态" v-model="taskStore.filters.status"  clearable class="filter-item">
            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <!-- 优先级搜索 -->
        <el-select placeholder="请选择优先级" v-model="taskStore.filters.priority"  clearable class="filter-item" >
            <el-option v-for="item in priorityOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <div class="btn">
            <el-button type="primary" plain style="width: 100px;" @click="handleSearch">搜索</el-button>
            <el-button style="width: 100px;" @click="taskStore.handleReset">重置</el-button>
        </div>
    </div>
</template>
<style scoped>
.filter-panel {
    margin-bottom: 12px;
    padding:12px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}
.filter-item {
    flex: 1;
    margin-right: 12px;
}
.filter-item :deep(.el-input__wrapper) {
    background-color: #f0f2f5;
    border-radius: 8px;
    box-shadow: none !important;
    transition: all 0.3s ease;
}
.btn {
    margin-left: auto;
    display: flex;
}
/* 响应式布局 */
@media (max-width:768px) {
    .filter-item {
        width: 100%;
        margin-bottom: 4px;
    }
    .btn {
        width: 100%;
        margin-left: 0;
        justify-content: space-around;
    }
    .btn button {
        flex: 1;
    }
}
@media (max-width:376px) {
    .filter-panel {
        flex-direction: row;
        flex-wrap: wrap;
        margin-bottom: 4px;
    }
    .filter-item:first-child {
        flex: 0 0 100%;
    }
    .filter-item:not(:first-child) {
        flex: 1;
        min-width: 0;
        margin: 0;
        margin-bottom: 6px;
    }
    .filter-item:nth-child(2) {
        margin-right: 12px;
    }
    .btn {
        width: 100%;
        margin-left: 0;
        justify-content: space-around;
    }
    .btn button {
        flex: 1;
    }
}
</style>
