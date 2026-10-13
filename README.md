# Portfolio Site

个人作品集网站。展示 UI / 前端作品，支持后台在线增删改。

## 技术栈

- 后端：Spring Boot 3.2 + MyBatis + MySQL
- 前端：原生 HTML / CSS / JavaScript（编辑风，大留白排版）
- Java 17 / Maven

## 本地运行

1. 建库建表：

   mysql -h127.0.0.1 -uroot -p < sql/schema.sql

2. 配置本地凭据（不提交）：

   复制 `src/main/resources/application-local.yml.example` 为
   `application-local.yml`，填入数据库密码和管理口令。

3. 启动（默认端口 8082，激活 local profile）：

   mvn spring-boot:run -Dspring-boot.run.profiles=local

4. 访问：

   - 作品列表：http://localhost:8082/
   - 管理后台：http://localhost:8082/admin

## 配置

`src/main/resources/application.yml` — 不含任何凭据，全部走环境变量占位：

| 配置项 | 环境变量 | 默认值 |
|--------|----------|--------|
| 数据库地址 | `DB_URL` | localhost:3306/portfolio |
| 数据库用户 | `DB_USERNAME` | root |
| 数据库密码 | `DB_PASSWORD` | (空) |
| 管理口令 | `PORTFOLIO_ADMIN_TOKEN` | change-me-please |

本地开发用 `application-local.yml`（已 gitignore）覆盖。
生产环境用环境变量或 systemd EnvironmentFile（见 `deploy/`）。

**切勿把真实密码 / 口令提交到仓库。**

## 打包部署

    mvn clean package -DskipTests

产物：`target/portfolio-site-1.0.0.jar`

部署到 ECS：jar 放 `/opt/portfolio-site/`，配 systemd 服务（见 `deploy/`）。

## 页面

| 路径 | 说明 |
|------|------|
| `/` | 作品列表 |
| `/project/{id}` | 作品详情 |
| `/about` | 关于我 |
| `/contact` | 联系方式 |
| `/admin` | 管理后台 |
