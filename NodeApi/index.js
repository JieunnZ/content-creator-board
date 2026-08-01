/* 
应用入口
*/

require('dotenv').config(); //加载环境变量
const express = require('express');
const cors = require('cors');
const healthRoutes = require('./routes/healthRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173', // 允许的前端地址
}));
app.use(express.json()); // 解析JSON请求体

// 路由
app.use('/api', healthRoutes);
// app.use('/api', taskRoutes);

// 404处理
app.use((req,res) => {
    res.status(404).json({ message: '接口不存在' });
})

// 500 全局错误处理
app.use((err, req, res, next) => {
    console.error('服务端错误：', err.message);
    res.status(500).json({ message: '服务端内部错误' });
})

// 启动服务
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});