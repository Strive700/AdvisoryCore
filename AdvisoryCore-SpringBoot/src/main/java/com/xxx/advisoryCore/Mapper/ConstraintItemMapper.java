package com.xxx.advisoryCore.Mapper;

import com.xxx.advisoryCore.Entity.ConstraintItem;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ConstraintItemMapper {
    /**
     * 新增具体约束项
     * @param constraintItem 约束项对象
     * @return 影响行数
     */
    int insertConstraintItem(ConstraintItem constraintItem);
} 