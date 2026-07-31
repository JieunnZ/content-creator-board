/* 
数据库连接池
*/
const mysql = require('mysql2/promise');
require('dotenv').config();// 读取环境变量
// 创建连接池
const pool = mysql.createPool({
  host: process.env.DB_HOST,// 数据库服务器地址
  port: Number(process.env.DB_PORT),// 数据库端口号
  user: process.env.DB_USER,// 数据库用户名
  password: process.env.DB_PASSWORD,// 数据库密码
  database: process.env.DB_NAME,// 数据库名称
  waitForConnections: true,// 连接满时是否等待
  connectionLimit: 10,// 最大连接数
  queueLimit: 0// 队列限制，0表示无限制
});

// 测试连接
async function testConnection() {
    try {
        const connection = await pool.getConnection();// 获取连接
        await connection.ping();// 测试连接是否可用
        connection.release();// 释放连接
        return true;// 返回true表示连接成功
    }catch (error) {
        return false;// 返回false表示连接失败
    }
}

module.exports = {
    pool,
    testConnection
}