package com.xxx.advisoryCore.Mapper;

import com.xxx.advisoryCore.Dto.SettlementOrderRequest;
import com.xxx.advisoryCore.Entity.ConstraintGroup;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface ConstraintGroupMapper {
    /**
     * 新增约束组定义
     * @param constraintGroup 约束组对象
     * @return 影响行数
     */
    int insertConstraintGroup(ConstraintGroup constraintGroup);

    @Mapper
    interface SettlementOrdersMapper {
        int insertSettlementOrder(@Param("request") SettlementOrderRequest request);
    }
}