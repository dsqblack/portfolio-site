package com.example.portfolio.controller;

import com.example.portfolio.dto.ApiResult;
import com.example.portfolio.entity.Project;
import com.example.portfolio.service.ProjectService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 公开接口：作品列表与详情。
 */
@RestController
@RequestMapping("/api/project")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping("/list")
    public ApiResult<List<Project>> list() {
        return ApiResult.success(projectService.listPublished());
    }

    @GetMapping("/{id}")
    public ApiResult<Project> detail(@PathVariable("id") Long id) {
        Project project = projectService.findById(id);
        if (project == null || project.getPublished() == null || project.getPublished() != 1) {
            return ApiResult.error("项目不存在");
        }
        return ApiResult.success(project);
    }
}
