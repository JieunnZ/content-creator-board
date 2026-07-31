-- 1. 创建数据库（如果不存在）
CREATE DATABASE IF NOT EXISTS intern_task_board
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE intern_task_board;

-- 2.创建 tasks 表
CREATE TABLE IF NOT EXISTS tasks (
     -- 主键： 自增 ID
     id INT UNSIGNED NOT NULL AUTO_INCREMENT,
     -- 任务（内容）标题： 视频或文章标题
	title VARCHAR(100) NOT NULL,
     -- 任务说明： 视频或文章文案
     description VARCHAR(500) NOT NULL DEFAULT '',
     -- 负责人： 作者或参与创作成员
     assignee VARCHAR(30) NOT NULL,
     -- 优先级： low=低优先级（常规内容），medium=中优先级（重点内容），high=高优先级（热点内容）
     priority ENUM('low','medium','high') NOT NULL DEFAULT 'medium',
     -- 状态： todo:待处理（策划中），doing：进行中（拍摄中），done：已完成（已发布）
     status ENUM('todo','doing','done') NOT NULL DEFAULT 'todo',
     -- 截止日期:目标发布日期或实际发布日期
     due_date DATE DEFAULT NULL,
     -- 创建时间：当前时间，数据库自动生成
     created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
     -- 更新时间：当前时间，数据库自动维护
     updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
     -- 主键
     PRIMARY KEY (id),
     -- 索引
     KEY idx_tasks_status (status),
     KEY idx_tasks_priority (priority),
     KEY idx_tasks_due_date (due_date),
     KEY idx_tasks_created_at (created_at)
     )ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

     -- 3. 插入演示数据

INSERT INTO tasks (title, description, assignee, priority, status, due_date) VALUES
-- 1. 策划中 + 高优先级（热点跟进）
('Vue3.5新特性实战解读', '梳理Vue3.5的CompositionAPI改进、响应式优化，配合实战案例演示', '张三', 'high', 'todo', NULL),

-- 2. 拍摄中 + 中优先级
('广州一日游Vlog | 永庆坊探店', '拍摄永庆坊的文艺小店、网红打卡点，记录一天的吃喝玩乐', '李四', 'medium', 'doing', NULL),

-- 3. 拍摄中 + 低优先级（日常内容）
('周末烘焙日记｜新手也能做的提拉米苏', '记录第一次做提拉米苏的过程和翻车经验', '王五', 'low', 'doing', '2026-09-01'),

-- 4. 已发布 + 中优先级（有发布日期）
('2026年值得关注的5个技术趋势', '盘点AI编程、WebAssembly、边缘计算等前沿技术', '王五', 'medium', 'done', '2026-07-28'),

-- 5. 已发布 + 低优先级（无截止日期）
('我的书桌收纳分享｜好物推荐', '分享高效工作的桌面布置、数码配件和文具', '李四', 'low', 'done', NULL);

SELECT * FROM tasks;