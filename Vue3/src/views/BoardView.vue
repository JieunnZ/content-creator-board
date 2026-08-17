<script setup>
import { Plus, VideoCamera} from '@element-plus/icons-vue'
import FilterPanel from '@/components/FilterPanel.vue'
import StatsPanel from '@/components/StatsPanel.vue'
import TaskForm from '@/components/TaskForm.vue'
import TaskTable from '@/components/TaskTable.vue'
import { useTaskStore } from '@/stores/taskStore'
import { onMounted } from 'vue'
const taskStore = useTaskStore()
// 加载数据
onMounted(() => {
taskStore.loadTask(taskStore.filters)
})
</script>
<template>
    <div class="board">
        <!-- 页面头部 -->
        <header class="board-header" >
            <div class="header-left">
                <h1 class="title">
                    <el-icon><VideoCamera /></el-icon> 创作日历 · 内容工坊
                </h1>
                <span class="subtitle">从想法到发布，一站式管理你的创作旅程</span>
            </div>
            <el-button type="info" dark plain @click="taskStore.openAddForm">
                <el-icon><Plus /></el-icon>
                新增内容
            </el-button>
        </header>
        <div class="body">
            <!-- 数据概览 -->
            <StatsPanel></StatsPanel>
            <div class="table">
                <!-- 筛选区域 -->
                <FilterPanel></FilterPanel>
                <!-- 任务列表 -->
                <TaskTable class="task-table"></TaskTable>
            </div>
            <!-- 任务表单 -->
            <TaskForm ></TaskForm>
        </div>
    </div>
</template>
<style scoped>
.board {
    height: 100vh;
    display: flex;      
    flex-direction: column;  
    background-color:#EEF1F5;
}
.body {
    flex: 1;
    display: flex;
    flex-direction: column;
}
.table {
    margin: 0 12px;
    padding: 10px 4px;
    flex: 1;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
    display: flex;
    flex-direction: column;
}
.board-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: 10px 10px; 
    flex-shrink: 0;
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
    padding: 2px 12px;
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