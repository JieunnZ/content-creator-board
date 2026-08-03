const express = require('express')
const router = express.Router()
const taskController = require('../controllers/taskController')

// 任务列表接口 GET /api/tasks
router.get('/tasks', taskController.getTasksController)

// 单个任务接口 GET /api/tasks/:id
router.get('/tasks/:id',taskController.getTaskByIdController)

// 新增任务接口 POST /api/tasks
router.post('/tasks',taskController.createTaskController)

// 编辑任务接口 PUT /api/tasks/:id
router.put('/tasks/:id',taskController.updateTaskController)

// 状态修改接口 PATCH /api/tasks/:id/status
router.patch('/tasks/:id/status',taskController.updateTaskStatusController)

// 删除接口 DELETE /api/tasks/:id
router.delete('/tasks/:id',taskController.deleteTaskController)

// 统计接口 GET /api/stats
router.get('/stats',taskController.getStatsController)

module.exports = router