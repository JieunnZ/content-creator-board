const taskModel = require('../models/taskModel')
const { success, error } = require('../utils/response')
const { taskToCamel, tasksToCamel } = require('../utils/transform')
const { validStatuses,
    validPriorities,
    isValidId,
    isValidPriority,
    isValidStatus,
    isValidDate } = require('../utils/validate')

// 校验任务字段
function validateTaskFields(body) {
    // 校验title
    if (!body.title || body.title.trim() === '') {
        return { valid: false, message: '标题不能为空' }
    }
    if (body.title.trim().length > 100) {
        return { valid: false, message: '标题长度不能超过100个字符' }
    }
    // 校验description
    if (body.description && body.description.trim().length > 500) {
        return { valid: false, message: '文案长度不能超过500个字符' }
    }
    // 校验assignee
    if (!body.assignee || body.assignee.trim() === '') {
        return { valid: false, message: '作者不能为空' }
    }
    if (body.assignee.trim().length > 30) {
        return { valid: false, message: '作者长度不能超过30个字符' }
    }
    // 校验priority
    if (body.priority && !isValidPriority(body.priority)) {
        return { valid: false, message: '优先级只能是low、medium或high' }
    }
    // 校验status
    if (body.status && !isValidStatus(body.status)) {
        return { valid: false, message: '状态只能是todo、doing或done' }
    }
    // 校验dueDate
    if (body.dueDate && !isValidDate(body.dueDate)) {
        return { valid: false, message: '日期格式不正确，必须为YYYY-MM-DD' }
    }
    return { valid: true, message: '任务字段校验通过' }
}

// 任务列表接口 GET /api/tasks
async function getTasksController(req, res) {
    try {
        const { keyword, status, priority } = req.query
        // 校验status和priority参数
        if (status && !isValidStatus(status)) {
            return error(res, '非法状态')
        }
        if (priority && !isValidPriority(priority)) {
            return error(res, '非法优先级')
        }
        // 查询数据库获取任务列表
        const rows = await taskModel.getTasks({ keyword, status, priority })
        // 将数据库字段转换为驼峰命名
        const tasks = tasksToCamel(rows)
        success(res, {
            items: tasks,
            total: tasks.length
        })
    } catch (err) {
        // 捕获数据库查询异常，返回503
        error(res, '数据库暂时不可用', 503)
    }
}

// 单个任务接口 GET /api/tasks/:id
async function getTaskByIdController(req, res) {
    try {
        const { id } = req.params
        // 校验id参数
        if (!isValidId(id)) {
            return error(res, '非法ID')
        }
        const task = await taskModel.getTaskById(Number(id))
        // 如果任务不存在，返回404
        if (!task) {
            return error(res, '任务不存在', 404)
        }
        // 返回完整任务对象并将数据库字段转换为驼峰命名
        success(res, taskToCamel(task))
    } catch (err) {
        //
        error(res, '数据库暂时不可用', 503)
    }
}

// 新增任务接口 POST /api/tasks
async function createTaskController(req, res) {
    try {
        // 请求体不是对象
        if (!req.body || typeof req.body !== 'object') {
            return error(res, '请求格式错误')
        }
        // 校验任务字段
        const validation = validateTaskFields(req.body)
        if (!validation.valid) {
            return error(res, validation.message)
        }
        // 忽略或拒绝客户端传入的 ID 和时间字段
        const { title, description, assignee, priority, status, dueDate } = req.body
        // 写入数据库
        const newId = await taskModel.createTask({
            title,
            description: description || '',
            assignee,
            priority: priority || 'medium', // 默认优先级为中
            status: status || 'todo',
            due_date: dueDate || null
        })
        // 创建成功后查询并返回完整任务
        const newTask = await taskModel.getTaskById(newId)
        success(res, taskToCamel(newTask), 201)
    } catch (err) {
        error(res, '数据库暂时不可用', 503)
    }
}

// 编辑任务接口 PUT /api/tasks/:id
async function updateTaskController(req, res) {
    try {
        const { id } = req.params
        // 校验id参数
        if (!isValidId(id)) {
            return error(res, '非法ID')
        }
        // ID 不存在
        const existingTask = await taskModel.getTaskById(Number(id))
        if (!existingTask) {
            return error(res, '任务不存在', 404)
        }
        // 请求体不是对象
        if (!req.body || typeof req.body !== 'object') {
            return error(res, '请求格式错误')
        }
        // 校验任务字段
        const validation = validateTaskFields(req.body)
        if (!validation.valid) {
            return error(res, validation.message)
        }
        const { title, description, assignee, priority, status, dueDate } = req.body
        // 更新数据库
        const affectedRows = await taskModel.updateTask(Number(id), {
            title,
            description: description || '',
            assignee,
            priority: priority || 'medium', // 默认优先级为medium
            status: status || 'todo',
            due_date: dueDate || null
        })
        // 如果没有受影响的行，说明更新失败
        if (affectedRows === 0) {
            return error(res, '更新失败', 404)
        }
        // 更新成功后返回完整任务
        const updatedTask = await taskModel.getTaskById(Number(id))
        success(res, taskToCamel(updatedTask))
    } catch (err) {
        error(res, '数据库暂时不可用', 503)
    }
}

// 状态修改接口 PATCH /api/tasks/:id/status
async function updateTaskStatusController(req, res) {
    try {
        const { id } = req.params
        // 校验id参数
        if (!isValidId(id)) {
            return error(res, '非法ID')
        }
        // 任务不存在
        const existingTask = await taskModel.getTaskById(Number(id))
        if (!existingTask) {
            return error(res, '任务不存在', 404)
        }
        const { status } = req.body
        // 校验status是否存在且为字符串
        if (!status || typeof status !== 'string') {
            return error(res, '请提供状态字段')
        }
        // 校验status是否合法
        if (!isValidStatus(status)) {
            return error(res, '状态只能是todo、doing或done')
        }
        const affectedRows = await taskModel.updateTaskStatus(Number(id), status)
        // 检查是否有受影响的行
        if (affectedRows === 0) {
            return error(res, '任务不存在', 404)
        }
        // 返回更新后的完整任务对象
        const updatedTask = await taskModel.getTaskById(Number(id))
        success(res, taskToCamel(updatedTask))
    } catch (err) {
        error(res, '数据库暂时不可用', 503)
    }
}

// 删除接口 DELETE /api/tasks/:id
async function deleteTaskController(req, res) {
    try {
        const { id } = req.params
        // 校验id参数
        if (!isValidId(id)) {
            return error(res, '非法ID')
        }
        // 校验任务是否存在
        const existingTask = await taskModel.getTaskById(Number(id))
        if (!existingTask) {
            return error(res, '任务不存在', 404)
        }
        const affectedRows = await taskModel.deleteTask(Number(id))
        // 检查是否有受影响的行
        if (affectedRows === 0) {
            return error(res, '任务不存在', 404)
        }
        // 删除成功后 data.id 返回被删除的任务 ID。
        success(res, { id: Number(id) })
    } catch (err) {
        error(res, '数据库暂时不可用', 503)
    }
}

// 统计接口 GET /api/stats
async function getStatsController(req, res) {
    try {
        const stats = await taskModel.getStats()
        success(res, stats)
    } catch (err) {
        error(res, '数据库暂时不可用', 503)
    }
}

module.exports = {
    getTasksController,
    getTaskByIdController,
    createTaskController,
    updateTaskController,
    updateTaskStatusController,
    deleteTaskController,
    getStatsController
}