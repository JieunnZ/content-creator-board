/* 
健康检查路由
*/
const express = require('express');
const { success, error } = require('../utils/response');// 引入响应工具函数
const { testConnection } = require('../config/db');// 引入数据库连接测试函数
const router = express.Router();

/* 
GET /api/health:
不访问数据库；
用于确认 Node 进程和路由正常；
成功响应的 data.service 为 ok。
*/
router.get('/health', (req, res) => {
    success(res, {service: 'ok'});
});

/* 
GET /api/health/db:
执行最小数据库查询检查连接池。
连接成功时，data.database 为 ok。
连接失败时返回 503 和可理解的 message。
数据库连接失败不能导致整个服务停止。
 */
router.get('/health/db', async(req, res) => {
    try {
        const isConnected = await testConnection();// 测试数据库连接
        if (isConnected) {
            success(res, {database: 'ok'});
        }else {
            error(res, '数据库暂时不可用', 503);
        }
    } catch (err) {
        error(res, '数据库暂时不可用', 503);
    }
})
module.exports = router;