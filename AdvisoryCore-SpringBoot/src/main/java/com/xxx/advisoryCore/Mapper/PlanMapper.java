package com.xxx.advisoryCore.Mapper;

import com.xxx.advisoryCore.Entity.Plan;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * 方案表 Mapper
 */
@Mapper
public interface PlanMapper {
    /**
     * 查询所有方案
     * @return 方案列表
     */
    List<Plan> selectAllPlans();
    
    /**
     * 插入新方案
     * @param plan 方案对象
     * @return 影响行数
     */
    int insertPlan(Plan plan);

    /**
     * 根据方案名称更新方案信息
     * @param plan 方案对象（需包含 planName 及要更新的 indexList）
     * @return 影响行数
     */
    int updatePlanByName(Plan plan);

    /**
     * 根据方案名称删除方案
     * @param planName 方案名称
     * @return 影响行数
     */
    int deletePlanByName(String planName);
} 