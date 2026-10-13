package com.example.portfolio.controller;

import com.example.portfolio.dto.ApiResult;
import com.example.portfolio.entity.Project;
import com.example.portfolio.service.ProjectService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 管理接口：项目的增删改查。
 * 通过请求头 X-Admin-Token 校验口令，口令配置项 portfolio.admin.token。
 */
@RestController
@RequestMapping("/api/admin/project")
public class AdminController {

    private final ProjectService projectService;

    @Value("${portfolio.admin.token}")
    private String adminToken;

    public AdminController(ProjectService projectService) {
        this.projectService = projectService;
    }

    private boolean authorized(String token) {
        return adminToken != null && adminToken.equals(token);
    }

    /** 校验口令，供前端登录使用 */
    @PostMapping("/login")
    public ApiResult<Void> login(@RequestHeader(value = "X-Admin-Token", required = false) String token) {
        if (!authorized(token)) {
            return ApiResult.error("口令错误");
        }
        return ApiResult.success();
    }

    @GetMapping("/list")
    public ApiResult<List<Project>> list(
            @RequestHeader(value = "X-Admin-Token", required = false) String token) {
        if (!authorized(token)) {
            return ApiResult.error("未授权");
        }
        return ApiResult.success(projectService.listAll());
    }

    @PostMapping
    public ApiResult<Project> create(@RequestHeader(value = "X-Admin-Token", required = false) String token,
                                     @RequestBody Project project) {
        if (!authorized(token)) {
            return ApiResult.error("未授权");
        }
        if (project.getTitle() == null || project.getTitle().isBlank()) {
            return ApiResult.error("项目名称不能为空");
        }
        return ApiResult.success(projectService.create(project));
    }

    @PutMapping("/{id}")
    public ApiResult<Project> update(@RequestHeader(value = "X-Admin-Token", required = false) String token,
                                     @PathVariable("id") Long id,
                                     @RequestBody Project project) {
        if (!authorized(token)) {
            return ApiResult.error("未授权");
        }
        if (project.getTitle() == null || project.getTitle().isBlank()) {
            return ApiResult.error("项目名称不能为空");
        }
        return ApiResult.success(projectService.update(id, project));
    }

    @DeleteMapping("/{id}")
    public ApiResult<Void> delete(@RequestHeader(value = "X-Admin-Token", required = false) String token,
                                  @PathVariable("id") Long id) {
        if (!authorized(token)) {
            return ApiResult.error("未授权");
        }
        if (!projectService.delete(id)) {
            return ApiResult.error("删除失败，记录不存在");
        }
        return ApiResult.success();
    }
}
