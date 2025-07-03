package com.xxx.advisoryCore.Mapper;

import com.xxx.advisoryCore.Dto.DeliveryOrderQueryRequest;
import com.xxx.advisoryCore.Dto.DeliveryOrderResponse;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface DeliveryOrderMapper {
    
    /**
     * 分页查询交割单列表
     * @param request 查询请求参数
     * @param offset 偏移量
     * @param limit 限制数量
     * @return 交割单列表
     */
    List<DeliveryOrderResponse> selectDeliveryOrders(
            @Param("request") DeliveryOrderQueryRequest request,
            @Param("offset") int offset,
            @Param("limit") int limit
    );
    
    /**
     * 查询交割单总数
     * @param request 查询请求参数
     * @return 总记录数
     */
    Long countDeliveryOrders(@Param("request") DeliveryOrderQueryRequest request);
} 