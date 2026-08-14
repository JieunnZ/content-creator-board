<!-- 数据概览 -->
<script setup>
import { useTaskStore } from '@/stores/taskStore'
const taskStore = useTaskStore()
</script>
<template>
    <div class="stats-panel">
        <el-row>
            <el-col  :xs="12" :sm="6" :md="6">
                <el-card class="stats-card" shadow="hover" body-style="padding:4px 16px">
                    <div class="stat-number">{{taskStore.stats.all}}</div>
                    <div class="stat-label">全部任务</div>
                </el-card>
            </el-col>
            <el-col  :xs="12" :sm="6" :md="6">
                <el-card class="stats-card stat-todo" shadow="hover" body-style="padding:4px 16px">
                    <div class="stat-number">{{taskStore.stats.todo}}</div>
                    <div class="stat-label">待处理</div>
                </el-card>
            </el-col>
            <el-col  :xs="12" :sm="6" :md="6">
                <el-card class="stats-card stat-doing" shadow="hover" body-style="padding:4px 16px">
                    <div class="stat-number">{{taskStore.stats.doing}}</div>
                    <div class="stat-label">进行中</div>
                </el-card>
            </el-col>
            <el-col  :xs="12" :sm="6" :md="6">
                <el-card class="stats-card stat-done" shadow="hover" body-style="padding:4px 16px">            
                    <div class="stat-number">{{taskStore.stats.done}}</div>
                    <div class="stat-label">已完成</div>
                </el-card>
            </el-col>
        </el-row>    
    </div>
</template>
<style scoped>
.stats-panel {
    margin: 0 8px 8px;
    padding: 0 5px;
}
.stats-card {
    min-height: 80px;
    text-align: center;
    border-radius: 8px;
    background: #fff;
}
.stat-number {
    font-size: 24px;
    font-weight: 600;
    color: #1a1a2e;
}
.stat-label {
    font-size: 14px;
    color: #888;
}
.stat-todo .stat-number { color: #409eff; }
.stat-doing .stat-number { color: #e6a23c; }
.stat-done .stat-number { color: #67c23a; }
</style>
