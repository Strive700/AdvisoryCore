package com.xxx.advisoryCore.Service.ServiceImpl;

import com.xxx.advisoryCore.Dto.DeliveryOrderQueryRequest;
import com.xxx.advisoryCore.Dto.DeliveryOrderResponse;
import com.xxx.advisoryCore.Dto.PageResponse;
import com.xxx.advisoryCore.Mapper.DeliveryOrderMapper;
import com.xxx.advisoryCore.Service.DeliveryOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeliveryOrderServiceImpl implements DeliveryOrderService {
    
    @Autowired
    private DeliveryOrderMapper deliveryOrderMapper;
    
    @Override
    public PageResponse<DeliveryOrderResponse> queryDeliveryOrders(DeliveryOrderQueryRequest request) {
        // 参数验证和默认值设置
        request.validateAndSetDefaults();
        
        // 计算偏移量
        int offset = (request.getPage() - 1) * request.getPageSize();
        
        // 查询总数
        Long total = deliveryOrderMapper.countDeliveryOrders(request);
        
        // 查询数据列表
        List<DeliveryOrderResponse> list = deliveryOrderMapper.selectDeliveryOrders(
                request, offset, request.getPageSize()
        );
        
        // 返回分页结果
        return new PageResponse<>(total, request.getPage(), request.getPageSize(), list);
    }
} 