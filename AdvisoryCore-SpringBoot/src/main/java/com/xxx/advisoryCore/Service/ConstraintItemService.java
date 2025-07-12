package com.xxx.advisoryCore.Service;

import com.xxx.advisoryCore.Entity.ConstraintItem;

public interface ConstraintItemService {
    /**
     * 新增具体约束项
     * @param constraintItem 约束项对象
     * @return 影响行数
     */
    int insertConstraintItem(ConstraintItem constraintItem);
} 