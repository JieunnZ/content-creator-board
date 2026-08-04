<script setup>
import { Plus } from '@element-plus/icons-vue'
// import FilterPanel from '@/components/FilterPanel.vue'
// import StatsPanel from '@/components/StatsPanel.vue'
// import TaskForm from '@/components/TaskForm.vue'
// import TaskTable from '@/components/TaskTable.vue'
</script>
<template>
    <div class="board">
        <!-- 页面头部 -->
        <header class="board-header">
            <div class="header-left">
                <h1>创作日历 · 内容工坊</h1>
                <span class="subtitle">从想法到发布，一站式管理你的创作旅程</span>
            </div>
            <el-button type="primary">
                <el-icon><Plus /></el-icon>
                新增内容</el-button>
        </header>
    </div>
    <!-- 数据概览 -->
    <!-- <StatsPanel></StatsPanel> -->
</template>
<style scoped></style>