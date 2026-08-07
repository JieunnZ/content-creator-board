import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import { getTasks, getTaskById, createTask, updateTask, updateTaskStatus, deleteTask, getStats } from '@/api/taskApi'
export const useTaskStore = defineStore('task', () => {
  const loading = ref(false)
  //任务数据
  const tasksData = ref([])
  // 统计
  const stats = ref({ all: 0, todo: 0, doing: 0, done: 0 })
  // 加载数据
  const loadTask = async (filter) => {
    loading.value = true
    try {
      const params = {}
      // 判断是否有搜索条件
      if (filter.keyword.trim()) params.keyword = filter.keyword.trim()
      if (filter.status) params.status = filter.status
      if (filter.priority) params.priority = filter.priority
      const tasksRes = await getTasks(params)
      const statsRes = await getStats()
      tasksData.value = tasksRes.data.data.tasks
      // 任务列表
      const { all = 0, todo = 0, doing = 0, done = 0 } = statsRes.data.data || {}
      // 数据概览
      stats.value = { all, todo, doing, done }
    } catch (err) {
      ElMessage.error(err.message || '加载数据失败')
    } finally {
      loading.value = false
    }
  }
  return { loading, stats, tasksData, loadTask }
})
