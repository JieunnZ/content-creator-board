import request from "./request"

// 任务列表接口 GET /api/tasks
export function getTasks(params = {}) {
    return request.get('tasks', {params})
}

// 单个任务接口 GET /api/tasks/:id
export function getTaskById(id) {
    return request.get(`/tasks/${id}`)
}

// 新增任务接口 POST /api/tasks
export function createTask(data) {
    return request.post('/tasks',data)
}

// 编辑任务接口 PUT /api/tasks/:id
export function updateTask(id,data) {
    return request.put(`/tasks/${id}`, data)
}

// 状态修改接口 PATCH /api/tasks/:id/status
export function updateTaskStatus(id, status) {
    return request.patch(`/tasks/${id}/status`, {status})
}

// 删除接口 DELETE /api/tasks/:id
export function deleteTask(id) {
    return request.delete(`/tasks/${id}`)
}

// 统计接口 GET /api/stats
export function getStats() {
    return request.get('/stats')
}