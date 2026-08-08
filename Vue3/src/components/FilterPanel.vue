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
        <el-card body-style="padding:8px 16px">
            <div class="filter-row">
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
        </el-card>
    </div>
</template>
<style scoped>
.filter-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}
.filter-item {
    flex: 1;
    margin-right: 12px;
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
@media (max-width:375px) {
    .filter-row {
        flex-direction: column;
    }
    .filter-item {
        width: 100%;
        margin: 0 0 4px;
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
