# AGENTS.md

## Project
Portfolio Site — 个人作品集网站
- GitHub: `dsqblack/portfolio-site`
- 技术栈: Spring Boot 3.2 + MyBatis + MySQL + 原生 HTML/CSS/JS
- Port: 8082
- DB: `portfolio` (MySQL localhost:3306)
- 工作目录与 hermes-study 平级

## 结构
- `sql/schema.sql` — 建库建表脚本
- `src/main/java/com/example/portfolio/`
  - `controller/ProjectController.java` — 公开接口 `/api/project/*`
  - `controller/AdminController.java` — 管理接口 `/api/admin/project/*`
  - `service/ProjectService.java` — 业务逻辑
  - `mapper/ProjectMapper.java` + `resources/mapper/ProjectMapper.xml` — MyBatis SQL
  - `entity/Project.java` — 项目实体
  - `dto/ApiResult.java` — 统一返回
  - `config/WebConfig.java` — 干净 URL 路由
- `src/main/resources/static/` — 前端页面
  - `index.html` 作品列表 / `project.html` 详情 / `about.html` 关于 / `contact.html` 联系 / `admin.html` 后台
  - `css/style.css` — 全局样式（编辑风）

## 页面路由
- `/` 作品列表
- `/project/{id}` 详情
- `/about` / `/contact`
- `/admin` 管理后台（口令鉴权）

## API
公开：
- GET `/api/project/list` 已发布列表
- GET `/api/project/{id}` 详情

管理（请求头 `X-Admin-Token`）：
- POST `/api/admin/project/login` 校验口令
- GET `/api/admin/project/list` 全部列表
- POST `/api/admin/project` 新增
- PUT `/api/admin/project/{id}` 修改
- DELETE `/api/admin/project/{id}` 删除

## Rules
- 只做本地修改，不自动编译或启动服务
- 修改包含 SQL 时必须保留原 WHERE 条件
- 管理口令配置项：`portfolio.admin.token`，生产用环境变量 `PORTFOLIO_ADMIN_TOKEN` 覆盖
