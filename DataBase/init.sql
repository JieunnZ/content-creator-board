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
     -- 优先级： low=低优先级，medium=中优先级，high=高优先级
     priority ENUM('low','medium','high') NOT NULL DEFAULT 'medium',
     -- 状态： todo:待处理，doing：进行中，done：已完成
     status ENUM('todo','doing','done') NOT NULL DEFAULT 'todo',
     -- 截止日期
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
     KEY idx_tasks_due_date (due_date)
     )ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

     -- 3. 插入演示数据
INSERT IGNORE INTO tasks (id,title, description, assignee, priority, status, due_date) VALUES

(1,'新综艺后台花絮 | 和小汽水一起完成挑战', '刚录完新一期综艺，后台和小汽水们一起完成了一个即兴挑战！(^///^)', 'SuperHero周棋洛', 'high', 'done', NULL),  -- 1. 已完成 + 高优先级

(2,'立花直拍！！神迹来的kisa大人我要永远追随你！', '冬公去尤尼维尔特别幸运抽到了离舞台很近的座位TT立花大人简直是神……以及期待mtk前辈和kisa二搭呀。两人冬公相性太好了，最后一首合唱听得我一直哭', '重金求kisa直拍', 'medium', 'doing', NULL),  -- 2. 进行中 + 中优先级

(3,'沉浸式观察《发现奇迹》幕后', '记录第一次参与节目幕后，作为节目多年老粉真的很感动！！《发现奇迹》真的超级无敌好看！制作人小姐姐很专业！时不时还能看到超级高人气特邀嘉宾周棋洛，听说节目顾问还是生科院的许墨教授，看节目的同时还能科普，而且还是华锐投资的，超高质！！', '恋语市一般市民', 'low', 'todo', '2026-09-01'),  -- 3. 待处理 + 低优先级

(4,'异议あり！｜法庭逆转名场面TOP10盘点', '从DL6号事件到最新的庭审记录，我亲手整理了自己律师生涯中最惊心动魄的十大逆转瞬间！看完记得在评论区告诉我，你心中最经典的是哪一次逆转？对了，御剑检察官说我应该好好整理案件档案而不是做视频，但我觉得这个也很重要！异议あり！', '成步堂龙一', 'medium', 'done', '2026-07-28'),  -- 4. 已完成 + 中优先级d（有截止日期）

(5,'校园七大不可思议全揭秘｜深夜探校实录', '大家好，我是红华。成海之滨高中的七大不可思议之一，传闻中的“框啷框啷先生”……虽然传闻听起来很可怕，但我想说那都是误会。今天带大家逛逛夜晚的校园，顺便讲讲七大不可思议背后的真实故事。对了，视频里不会有突然惊吓的画面，因为我自己也怕被吓到。', '红华', 'low', 'doing', NULL),  -- 5. 进行中 + 低优先级（无截止日期）

(6,'检察官的职责｜如何构建无懈可击的证据链', '我是御剑怜侍。作为检察官，证据链的完整性决定了案件的走向。本期从证据收集、保存到法庭呈示，系统讲解构建无懈可击证据链的方法论。不适合律师观看，尤其是那个刺猬头。如果你在看，请关掉视频去做你的本职工作。另外，成步堂，我不会承认这条简介是为你写的。', '御剑怜侍', 'high', 'todo', '2026-09-15');  -- 6. 待处理 + 高优先级（有截止日期）

SELECT * FROM tasks;