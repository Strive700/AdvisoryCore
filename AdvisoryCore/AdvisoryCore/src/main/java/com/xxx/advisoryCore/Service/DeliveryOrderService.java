package com.xxx.advisoryCore.Service;

import com.xxx.advisoryCore.Dto.DeliveryOrderQueryRequest;
import com.xxx.advisoryCore.Dto.PageResponse;
import com.xxx.advisoryCore.Dto.DeliveryOrderResponse;

public interface DeliveryOrderService {
    
    /**
     * 分页查询交割单列表
     * @param request 查询请求参数
     * @return 分页结果
     */
    PageResponse<DeliveryOrderResponse> queryDeliveryOrders(DeliveryOrderQueryRequest request);
} 