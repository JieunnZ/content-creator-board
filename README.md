# content-creator-board

## 一、数据库（DataBase）
### 数据库设计
数据库名称: intern_task_board 

表结构: tasks
| 字段 | 推荐类型 | 空值 | 默认值 | 说明 |
| :--- | :--- | :---: | :--- | :--- |
| id	| INT | UNSIGNED	| 否	| 自增	| 主键 | 
| title	| VARCHAR(100)	| 否	| 无	| 任务标题| 
| description	| VARCHAR(500)	| 否	| 空字符串	| 任务说明| 
| assignee	| VARCHAR(30)	| 否	| 无	| 负责人| 
| priority	| ENUM 或等效字符串字段	| 否	| medium	| 优先级| 
| status	| ENUM 或等效字符串字段	| 否	| todo	| 状态| 
| due_date	| DATE	| 是	| NULL	| 截止日期| 
| created_at	| DATETIME	| 否	| 当前时间	| 创建时间
| updated_at	| DATETIME	| 否	| 当前时间	| 更新时间| 

###  索引设计
| 索引名	| 字段 |	类型 |	服务查询 |
| :--- | :--- | :---: | :--- |
| PRIMARY |	id |	主键索引 |	按 ID 查询、更新、删除单条任务 |
| idx_tasks_status |	status |	普通索引 |	WHERE status = ? 按状态筛选列表 |
| idx_tasks_priority |	priority |	普通索引 |	WHERE priority = ? 按优先级筛选列表 |
| idx_tasks_due_date |	due_date |	普通索引 |	预留日期范围查询 |

### 初始化步骤
``` bash
    # 1. 进入数据库脚本目录
    cd DataBase
    # 2. 执行初始化脚本
    mysql -u root -p < init.sql
    # 3. 验证数据
    mysql -u root -p -e "USE intern_task_board; SELECT COUNT(*) FROM tasks;"
```

## 二、Node.js 后端（NodeApi）

### 启动步骤
``` bash
    # 1. 进入后端目录
    cd NodeApi
    # 2. 安装依赖
    npm install
    # 3. 配置环境变量
    cp .env.example .env
    # 编辑 .env 填入真实数据库密码

    # Node 服务配置
    PORT=3000
    CLIENT_ORIGIN=http://localhost:5173
    # MySQL 数据库配置
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_USER=root
    DB_PASSWORD=your_password_here
    DB_NAME=intern_task_board

    # 4. 启动服务（开发模式）
    npm run dev
    # 或生产模式
    npm start
```

### 一次请求从路由到数据库再到响应的完整过程
客户端发起请求 ->  Vite 代理转发 -> Express 中间件处理 -> 路由匹配 -> 控制器 - 参数校验 -> 数据访问层 - 执行 SQL -> MySQL 数据库执行 -> 查询完整任务 -> 字段转换 -> 统一响应

### API 接口清单

| 方法 | 地址 | 说明 | 成功状态码 | 
| :--- | :--- | :---: | :--- | 
| GET	| /api/health	| 服务健康检查 | 200| 
| GET	| /api/health/db | 数据库健康检查 | 200| 
| GET	| /api/tasks | 获取任务列表 | 200 | 
| GET	| /api/tasks/:id | 获取单个任务 | 200 | 
| POST | /api/tasks	| 新增任务 | 201 | 
| PUT	| /api/tasks/:id | 编辑任务 | 200 | 
| PATCH	| /api/tasks/:id/status	| 修改任务状态 | 200 | 
| DELETE | /api/tasks/:id	| 删除任务 | 200 | 
| GET	| /api/stats | 获取任务统计 | 200 | 

## Vue 3 前端（Vue3）

### 启动步骤
``` bash
    # 1. 进入前端目录
    cd Vue3
    # 2. 安装依赖
    npm install
    # 3. 启动开发服务器
    npm run dev
    # 4. 构建生产版本
    npm run build
```

### 请求处理位置
Axios 实例封装   文件位置：src/api/request.js

API 函数定义   文件位置：src/api/taskApi.js

### 组件之间的数据流
数据流方向：Store → 组件（数据向下），组件 → Store（事件向上）