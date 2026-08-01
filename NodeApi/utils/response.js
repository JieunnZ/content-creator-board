/* 
 * 统一响应格式
*/
// 成功响应
function success(res, data, statusCode=200) {
    res.status(statusCode).json({data});
}
// 失败响应
function error(res, message, statusCode=400) {
    res.status(statusCode).json({message});
}
// 导出模块
module.exports = {
    success,
    error
}
