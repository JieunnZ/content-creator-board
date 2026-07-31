/* 
字段转换：数据库字段使用下划线，API 字段使用驼峰
 */
function taskToCamel(row) {
    if (!row) return null;
    return {
        id: row.id,
        title: row.title,
        description: row.description,
        assignee: row.assignee,
        priority: row.priority,
        status: row.status,
        dueDate: row.due_date,
        createdAt: row.created_at,
        updatedAt: row.updated_at
    }
}
// 批量转换
function tasksToCamel(rows) {
    if (!Array.isArray(rows)) return [];// 如果不是数组，返回空数组
    return rows.map(row => taskToCamel(row));// 遍历数组，逐个转换
}
module.exports = {
    taskToCamel,
    tasksToCamel
}