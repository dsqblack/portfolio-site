-- Portfolio Site schema
CREATE DATABASE IF NOT EXISTS portfolio
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_general_ci;

USE portfolio;

CREATE TABLE IF NOT EXISTS portfolio_project (
  id           BIGINT       NOT NULL AUTO_INCREMENT COMMENT '主键',
  title        VARCHAR(100) NOT NULL COMMENT '项目名',
  subtitle     VARCHAR(200) DEFAULT NULL COMMENT '一句话简介',
  description  TEXT         DEFAULT NULL COMMENT '详细描述',
  cover_url    VARCHAR(500) DEFAULT NULL COMMENT '封面图地址',
  tech_stack   VARCHAR(300) DEFAULT NULL COMMENT '技术栈，逗号分隔',
  demo_url     VARCHAR(300) DEFAULT NULL COMMENT '在线演示地址',
  repo_url     VARCHAR(300) DEFAULT NULL COMMENT '源码地址',
  sort_order   INT          NOT NULL DEFAULT 0 COMMENT '排序，越小越靠前',
  published    TINYINT      NOT NULL DEFAULT 1 COMMENT '是否发布 1是 0否',
  created_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  updated_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (id),
  KEY idx_published_sort (published, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='作品集项目';
