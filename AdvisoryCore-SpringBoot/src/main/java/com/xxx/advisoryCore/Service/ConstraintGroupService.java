package com.xxx.advisoryCore.Service;

import com.xxx.advisoryCore.Entity.ConstraintGroup;

public interface ConstraintGroupService {
    /**
     * 新增约束组定义
     * @param constraintGroup 约束组对象
     * @return 影响行数
     */
    int insertConstraintGroup(ConstraintGroup constraintGroup);
} 