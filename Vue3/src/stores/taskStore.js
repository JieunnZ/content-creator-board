import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import { getTasks, getTaskById, createTask, updateTask, updateTaskStatus, deleteTask, getStats } from '@/api/taskApi'
export const useTaskStore = defineStore('task', () => {
  const loading = ref(false)
  //任务列表
  const tasksData = ref([])
  // 状态统计
  const stats = ref({ all: 0, todo: 0, doing: 0, done: 0 })
  // 筛选条件
  const filters = reactive({
    keyword: '',
    status: '',
    priority: '',
  })
  // 是否无匹配数据
  const isEmpty = ref(false)
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
      // 无匹配数据 数据长度为0 且 有筛选条件（排除数据库本身无数据）
      isEmpty.value = tasksData.value.length === 0 && (filter.keyword?.trim() || filter.status || filter.priority)
    } catch (err) {
      ElMessage.error(err.message || '加载数据失败')
    } finally {
      loading.value = false
    }
  }
  // 重置筛选
  const handleReset = () => {
    filters.keyword = ''
    filters.status = ''
    filters.priority = ''
    isEmpty.value = false
    loadTask(filters)
  }
  //是否显示弹窗
  const isVisible = ref(false)
  // 是否编辑状态
  const isEdit = ref(false)
  // 当前编辑任务数据
  const editData = ref(null)
  // 打开新增弹窗
  const openAddForm = () => {
    isVisible.value = true
    isEdit.value = false
    editData.value = null
  }
  // 新增任务
  const addTask = async (data) => {
    await createTask(data)
    await loadTask(filters)
  }
  // 获取任务详情
  const getTask = async (id) => {
    try {
      const res = await getTaskById(id)
      return res.data.data
    } catch (err) {
      ElMessage.error(err.message) || '获取任务详情失败'
    }
  }
  // 编辑任务
  const editTask = async (id, data) => {
    await updateTask(id, data)
    await loadTask(filters)
  }
  // 状态修改
  const changeStatus = async ({ id, status }) => {
    try {
      await updateTaskStatus(id, status)
      ElMessage.success('状态已更新')
      await loadTask(filters)
    } catch (err) {
      ElMessage.error(err.message || '状态更新失败')
    }
  }
  // 删除任务
  const deleteTaskById = async (id) => {
    await deleteTask(id)
    await loadTask(filters)
  }
  return { editData, isVisible, isEdit, isEmpty, filters, loading, stats, tasksData, loadTask, handleReset, addTask, editTask, changeStatus, getTask, deleteTaskById, openAddForm }
})
