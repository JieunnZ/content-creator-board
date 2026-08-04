const {pool} = require('../config/db')// 引入数据库连接池

// 任务列表接口 GET /api/tasks
async function getTasks({keyword, status, priority}) {
    let sql = 'SELECT * FROM tasks WHERE 1=1'
    const params = []
    //按标题关键字模糊查询
    if (keyword && keyword.trim() !== '') {
        sql += ' AND title LIKE ?'
        params.push(`%${keyword.trim()}%`)
    }
    // 按状态精确查询
    if (status) {
        sql += ' AND status = ?'
        params.push(status)
    }
    // 按优先级精确查询
    if (priority) {
        sql += ' AND priority = ?'
        params.push(priority)
    }
    // 默认按创建时间倒序；创建时间相同时按 ID 倒序
    sql += ' ORDER BY created_at DESC, id DESC'

    // 执行查询
    const [rows] = await pool.query(sql, params)
    return rows
}

// 单个任务接口 GET /api/tasks/:id
async function getTaskById(id) {
    const sql = 'SELECT * FROM tasks WHERE id = ?'
    const [rows] = await pool.query(sql, [id])
    return rows[0] || null // 返回单个任务对象
}

// 新增任务接口 POST /api/tasks
async function createTask({title, description, assignee, priority, status, due_date}) {
    const sql = 'INSERT INTO tasks (title, description, assignee, priority, status, due_date) VALUES (?, ?, ?, ?, ?, ?)'
    const params = [
        title.trim(),
        description ? description.trim() : '',
        assignee.trim(),
        priority || 'medium', // 默认优先级为中
        status || 'todo',
        due_date || null
    ]
    const [result] = await pool.query(sql, params)
    return result.insertId // 返回新插入任务的ID
}

// 编辑任务接口 PUT /api/tasks/:id
async function updateTask(id, {title, description, assignee, priority, status, due_date}) {
    const sql = 'UPDATE tasks SET title = ?, description = ?, assignee = ?, priority = ?, status = ?, due_date = ? WHERE id = ?'
    const params = [
        title.trim(),
        description ? description.trim() : '',
        assignee.trim(),
        priority,
        status,
        due_date || null,
        id
    ]
    const [result] = await pool.query(sql, params)
    return result.affectedRows // 返回受影响的行数
}

// 状态修改接口 PATCH /api/tasks/:id/status
async function updateTaskStatus(id, status){
    const sql = 'UPDATE tasks SET status = ? WHERE id = ?'
    const [result] = await pool.query(sql, [status, id])
    return result.affectedRows // 返回受影响的行数
}

// 删除接口 DELETE /api/tasks/:id
async function deleteTask(id) {
    const sql = 'DELETE FROM tasks WHERE id = ?'
    const [result] = await pool.query(sql, [id])
    return result.affectedRows // 返回受影响的行数
}

// 统计接口 GET /api/stats
async function getStats(){
    const sql = `
    SELECT
        COUNT(*) AS \`all\`,
        SUM(CASE WHEN status = 'todo' THEN 1 ELSE 0 END) AS todo,
        SUM(CASE WHEN status = 'doing' THEN 1 ELSE 0 END) AS doing, 
        SUM(CASE WHEN status = 'done' THEN 1 ELSE 0 END) AS done
    FROM tasks
    `
    const [rows] = await pool.query(sql)
    const stats = rows[0] || {all: 0, todo: 0, doing: 0, done: 0}
    return {
        all: Number(stats.all) || 0,
        todo: Number(stats.todo) || 0,
        doing: Number(stats.doing) || 0,
        done: Number(stats.done) || 0
    }
}
module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
    getStats
}