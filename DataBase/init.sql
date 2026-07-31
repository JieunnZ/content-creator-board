-- 1. 创建数据库（如果不存在）
CREATE DATABASE IF NOT EXISTS intern_task_board
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE intern_task_board;

-- 2. 创建 tasks 表
CREATE TABLE IF NOT EXISTS tasks (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(500) NOT NULL DEFAULT '',
    assignee VARCHAR(30) NOT NULL,
    priority ENUM('low','medium','high') NOT NULL DEFAULT 'medium',
    status ENUM('todo','doing','done') NOT NULL DEFAULT 'todo',
    due_date DATE DEFAULT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_tasks_status (status),
    KEY idx_tasks_priority (priority),
    KEY idx_tasks_due_date (due_date),
    KEY idx_tasks_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. 插入演示数据
INSERT INTO tasks (title, description, assignee, priority, status, due_date) VALUES
('Vue3.5新特性实战解读', '梳理Vue3.5的CompositionAPI改进、响应式优化，配合实战案例演示', '张三', 'high', 'todo', NULL),
('广州一日游Vlog | 永庆坊探店', '拍摄永庆坊的文艺小店、网红打卡点，记录一天的吃喝玩乐', '李四', 'medium', 'doing', NULL),
('周末烘焙日记｜新手也能做的提拉米苏', '记录第一次做提拉米苏的过程和翻车经验', '王五', 'low', 'doing', '2026-09-01'),
('2026年值得关注的5个技术趋势', '盘点AI编程、WebAssembly、边缘计算等前沿技术', '王五', 'medium', 'done', '2026-07-28'),
('我的书桌收纳分享｜好物推荐', '分享高效工作的桌面布置、数码配件和文具', '李四', 'low', 'done', NULL);