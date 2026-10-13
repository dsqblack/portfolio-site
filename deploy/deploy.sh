#!/usr/bin/env bash
# 部署到 ECS。用法：bash deploy/deploy.sh
# 前提：本地已 mvn clean package -DskipTests
set -e

ECS_HOST="root@47.116.57.142"
APP_DIR="/opt/portfolio-site"
JAR="target/portfolio-site-1.0.0.jar"
SERVICE="portfolio-site"

echo "==> 检查产物"
[ -f "$JAR" ] || { echo "找不到 $JAR，请先执行 mvn clean package -DskipTests"; exit 1; }

echo "==> 上传 jar"
ssh "$ECS_HOST" "mkdir -p $APP_DIR"
scp "$JAR" "$ECS_HOST:$APP_DIR/"

echo "==> 首次部署需确认 env 与 service 已就位"
ssh "$ECS_HOST" "test -f $APP_DIR/env || echo '警告：$APP_DIR/env 不存在，需要手动创建（内容见 deploy/env.example）'"

echo "==> 重启服务"
ssh "$ECS_HOST" "systemctl restart $SERVICE && sleep 2 && systemctl status $SERVICE --no-pager | head -8"

echo "==> 完成。访问 http://47.116.57.142:8082/"
