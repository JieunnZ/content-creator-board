<!-- 筛选区域 -->
<script setup>
import { statusOptions, priorityOptions } from '@/utils/constants';
</script>
<template>
    <div class="filter-panel">
        <el-card body-style="padding:8px 16px">
            <div class="filter-row">
            <!-- 标题关键字搜索 -->
            <el-input placeholder="请输入标题关键字" clearable class="filter-item" ></el-input>
            <!-- 状态搜索 -->
            <el-select placeholder="请选择状态" class="filter-item">
                <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <!-- 优先级搜索 -->
            <el-select placeholder="请选择优先级" class="filter-item" >
                <el-option v-for="item in priorityOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <div class="btn">
                <el-button type="primary" plain style="width: 100px;">搜索</el-button>
                <el-button style="width: 100px;">重置</el-button>
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
</style>
