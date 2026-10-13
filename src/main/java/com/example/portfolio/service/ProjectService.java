package com.example.portfolio.service;

import com.example.portfolio.entity.Project;
import com.example.portfolio.mapper.ProjectMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectMapper projectMapper;

    public ProjectService(ProjectMapper projectMapper) {
        this.projectMapper = projectMapper;
    }

    public List<Project> listPublished() {
        return projectMapper.listPublished();
    }

    public List<Project> listAll() {
        return projectMapper.listAll();
    }

    public Project findById(Long id) {
        return projectMapper.findById(id);
    }

    public Project create(Project project) {
        if (project.getSortOrder() == null) {
            project.setSortOrder(0);
        }
        if (project.getPublished() == null) {
            project.setPublished(1);
        }
        projectMapper.insert(project);
        return project;
    }

    public Project update(Long id, Project project) {
        project.setId(id);
        projectMapper.update(project);
        return projectMapper.findById(id);
    }

    public boolean delete(Long id) {
        return projectMapper.deleteById(id) > 0;
    }
}
