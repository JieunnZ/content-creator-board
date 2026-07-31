/* 
参数校验
*/

// ID转换后为正整数
function isValidId(id) {
    const num = Number(id);// 将id转换为数字
    return Number.isInteger(num) && num > 0;// 判断是否为正整数
}

// 校验优先级枚举
const validPriorities = ['low', 'medium', 'high'];// 定义有效的优先级枚举
function isValidPriority(priority) {
    return validPriorities.includes(priority);// 判断是否在有效枚举中
}

// 校验状态枚举
const validStatuses = ['todo', 'doing', 'done'];// 定义有效的状态枚举
function isValidStatus(status) {
    return validStatuses.includes(status);// 判断是否在有效枚举中
}

// 校验截止日期只能为空或符合YYYY-MM-DD格式
function isValidDate(date) {
    if (date === null || date === undefined || date === '') return true;// 允许为空
    const regex = /^\d{4}-\d{2}-\d{2}$/;// 定义正则表达式，匹配YYYY-MM-DD格式
    if (!regex.test(date)) return false;// 如果不匹配，返回false
    const d = new Date(date);// 创建日期对象
    return !isNaN(d.getTime());// 判断日期是否有效
}

module.exports = {
    validStatuses,
    validPriorities,
    isValidId,
    isValidPriority,
    isValidStatus,
    isValidDate
}