package com.xxx.advisoryCore.Mapper;

import com.xxx.advisoryCore.Dto.SettlementOrderRequest;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface SettlementOrdersMapper {
    int insertSettlementOrder(@Param("request") SettlementOrderRequest request);
} 