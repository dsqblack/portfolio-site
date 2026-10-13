package com.example.portfolio.mapper;

import com.example.portfolio.entity.Project;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ProjectMapper {

    /** 查询已发布项目，按 sort_order 升序 */
    List<Project> listPublished();

    /** 查询全部项目（含未发布），供后台使用 */
    List<Project> listAll();

    /** 按 id 查询 */
    Project findById(@Param("id") Long id);

    /** 新增，返回影响行数；自增主键回填到实体 */
    int insert(Project project);

    /** 更新 */
    int update(Project project);

    /** 删除 */
    int deleteById(@Param("id") Long id);
}
