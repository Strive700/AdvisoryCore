package com.xxx.advisoryCore.Service.ServiceImpl;

import com.xxx.advisoryCore.Entity.Plan;
import com.xxx.advisoryCore.Mapper.PlanMapper;
import com.xxx.advisoryCore.Service.PlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

/**
 * 方案表 Service 实现类
 */
@Service
public class PlanServiceImpl implements PlanService {

    @Autowired
    private PlanMapper planMapper;

    /**
     * 查询所有方案
     * @return 方案列表
     */
    @Override
    public List<Plan> getAllPlans() {
        try {
            List<Plan> plans = planMapper.selectAllPlans();
            return plans != null ? plans : Collections.emptyList();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return Collections.emptyList();
        }
    }

    /**
     * 插入新方案
     * @param plan 方案对象
     * @return 影响行数
     */
    @Override
    public int insertPlan(Plan plan) {
        try {
            return planMapper.insertPlan(plan);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return 0;
        }
    }

    /**
     * 根据方案名称更新方案信息
     * @param plan 方案对象（需包含 planName 及要更新的 indexList）
     * @return 影响行数
     */
    @Override
    public int updatePlanByName(Plan plan) {
        try {
            return planMapper.updatePlanByName(plan);
        } catch (Exception e) {
            // 可记录日志
            return 0;
        }
    }

    @Override
    public int deletePlanByName(String planName) {
        try {
            return planMapper.deletePlanByName(planName);
        } catch (Exception e) {
            // 可记录日志
            return 0;
        }
    }
} 