# Portfolio Site

个人作品集网站。展示 UI / 前端作品，支持后台在线增删改。

## 技术栈

- 后端：Spring Boot 3.2 + MyBatis + MySQL
- 前端：原生 HTML / CSS / JavaScript（编辑风，大留白排版）
- Java 17 / Maven

## 本地运行

1. 建库建表：

   mysql -uroot -p < sql/schema.sql

2. 启动（默认端口 8082）：

   mvn spring-boot:run

3. 访问：

   - 作品列表：http://localhost:8082/
   - 管理后台：http://localhost:8082/admin

## 配置

`src/main/resources/application.yml`

- 数据库连接、端口
- 管理口令：`portfolio.admin.token`（默认 `change-me-please`，务必修改）

生产环境请通过环境变量覆盖口令：`PORTFOLIO_ADMIN_TOKEN`

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
