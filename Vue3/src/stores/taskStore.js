import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import { getTasks, getTaskById, createTask, updateTask, updateTaskStatus, deleteTask, getStats } from '@/api/taskApi'
export const useTaskStore = defineStore('task', () => {
  // 加载状态
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
  // 错误状态信息
  const error = ref(null)
  // 加载数据+统计
  const loadTask = async (filter) => {
    loading.value = true
    error.value = null
    try {
      const params = {}
      // 判断是否有搜索条件
      if (filter?.keyword.trim()) params.keyword = filter.keyword.trim()
      if (filter?.status) params.status = filter.status
      if (filter?.priority) params.priority = filter.priority
      const tasksRes = await getTasks(params)
      const statsRes = await getStats()
      // 任务列表
      tasksData.value = tasksRes.data.data.items
      const { all = 0, todo = 0, doing = 0, done = 0 } = statsRes.data.data || {}
      // 数据概览
      stats.value = { all, todo, doing, done }
      // 无匹配数据： 数据长度为0 且 有筛选条件（排除数据库本身无数据）
      isEmpty.value = tasksData.value.length === 0 && (filter.keyword?.trim() || filter.status || filter.priority)
    } catch (err) {
      error.value = err.message?.includes('502')
        ? '后端服务未启动，请检查服务器'
        : err?.message || '加载数据失败'
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
      return null
    }
  }
  // 编辑任务
  const editTask = async (id, data) => {
    await updateTask(id, data)
    await loadTask(filters)
  }
  // 状态是否在修改
  const isStatusChange = ref(false)
  // 状态修改
  const changeStatus = async (row, newStatus, oldStatus) => {
    if (isStatusChange.value) {
      // 正在修改状态
      ElMessage.warning('正在更新中，请勿重复操作')
      return
    }
    isStatusChange.value = true
    try {
      await updateTaskStatus(row.id, newStatus)
      ElMessage.success('状态已更新')
      await loadTask(filters)
    } catch (err) {
      row.status = oldStatus
    } finally {
      isStatusChange.value = false
    }
  }
  // 是否正在删除
  const isDeleting = ref(false)
  // 正在删除的id
  const deletingId = ref(null)
  // 删除任务
  const deleteTaskById = async (id) => {
    isDeleting.value = true
    deletingId.value = id
    try {
      await deleteTask(id)
      ElMessage.success('删除成功')
      await loadTask(filters)
    } catch (err) {
    } finally {
      isDeleting.value = false
      deletingId.value = null
    }
  }
  return { isDeleting, deletingId, isStatusChange, error, editData, isVisible, isEdit, isEmpty, filters, loading, stats, tasksData, loadTask, handleReset, addTask, editTask, changeStatus, getTask, deleteTaskById, openAddForm }
})
