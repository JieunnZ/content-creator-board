<script setup>
import { Plus, VideoCamera} from '@element-plus/icons-vue'
import {reactive} from 'vue'
import FilterPanel from '@/components/FilterPanel.vue'
import StatsPanel from '@/components/StatsPanel.vue'
import TaskForm from '@/components/TaskForm.vue'
import TaskTable from '@/components/TaskTable.vue'
import { useTaskStore } from '@/stores/taskStore'
import { onMounted } from 'vue'
const taskStore = useTaskStore()
const filters = reactive({
    keyword: '',
    status: '',
    priority: '',
})
// 加载数据
onMounted(() => {
taskStore.loadTask(filters)
})
</script>
<template>
    <div class="board" v-loading.fullscreen.lock="taskStore.loading" element-loading-background="rgba(122, 122, 122, 0.8)" element-loading-text="加载中，请稍候...">
        <!-- 页面头部 -->
        <header class="board-header" >
            <div class="header-left">
                <h1 class="title">
                    <el-icon><VideoCamera /></el-icon> 创作日历 · 内容工坊</h1>
                <span class="subtitle">从想法到发布，一站式管理你的创作旅程</span>
            </div>
            <el-button type="info" dark plain>
                <el-icon><Plus /></el-icon>
                新增内容
            </el-button>
        </header>
        <!-- 数据概览 -->
        <StatsPanel></StatsPanel>
        <!-- 筛选区域 -->
        <FilterPanel></FilterPanel>
        <!-- 任务列表 -->
        <TaskTable></TaskTable>
        <!-- 任务表单 -->
        <TaskForm></TaskForm>
    </div>
</template>
<style scoped>
.board {
min-height: 400px;
}
.board-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin: 0 auto;
    padding: 10px 20px; 
    background: #DCDCDC;
}
.header-left {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
.header-left .title {
     font-family: "仓耳渔阳体 W04", "PingFang SC", "Microsoft YaHei", sans-serif;
     font-variation-settings: normal;
     font-size: 24px;
     line-height: 24px;
     font-weight: 600;
     color: #1a1a2e;
     margin:10px 24px;
     
}
.header-left .subtitle {
    font-size: 14px;
    color: #888;
    background: #f0f0f0;
    padding: 2px 12px;
    border-radius: 8px;
    margin:0 20px;
}
.board-header button {
    height: 32px;
    line-height: 32px;
    margin-right: 20px;
}
@media(max-width: 768px) {
    .board-header {
        flex-direction: column;
        align-items: center;
    }
    .board-header button {
        margin: 10px auto 0;
    }
}
</style>