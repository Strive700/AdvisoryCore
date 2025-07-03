package com.xxx.advisoryCore.Controller;

import com.xxx.advisoryCore.Dto.ApiResponse;
import com.xxx.advisoryCore.Dto.DeliveryOrderQueryRequest;
import com.xxx.advisoryCore.Dto.PageResponse;
import com.xxx.advisoryCore.Dto.DeliveryOrderResponse;
import com.xxx.advisoryCore.Service.DeliveryOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api")
public class DeliveryOrderController {
    
    private static final Logger logger = Logger.getLogger(DeliveryOrderController.class.getName());
    
    @Autowired
    private DeliveryOrderService deliveryOrderService;
    
    /**
     * 查询交割单列表
     * GET /api/delivery_orders
     * 
     * @param page 页码，默认1
     * @param pageSize 每页大小，默认10
     * @param customerId 客户ID，可选
     * @param portfolioId 组合ID，可选
     * @param fundCode 基金代码，可选，模糊匹配
     * @param tradeType 交易类型，可选
     * @param tradeDateStart 交易开始日期，可选，格式：yyyy-MM-dd
     * @param tradeDateEnd 交易结束日期，可选，格式：yyyy-MM-dd
     * @return 分页交割单列表
     */
    @GetMapping("/delivery_orders")
    public ApiResponse<PageResponse<DeliveryOrderResponse>> queryDeliveryOrders(
            @RequestParam(value = "page", required = false) Integer page,
            @RequestParam(value = "pageSize", required = false) Integer pageSize,
            @RequestParam(value = "customerId", required = false) Integer customerId,
            @RequestParam(value = "portfolioId", required = false) Integer portfolioId,
            @RequestParam(value = "fundCode", required = false) String fundCode,
            @RequestParam(value = "tradeType", required = false) String tradeType,
            @RequestParam(value = "tradeDateStart", required = false) 
            @DateTimeFormat(pattern = "yyyy-MM-dd") Date tradeDateStart,
            @RequestParam(value = "tradeDateEnd", required = false) 
            @DateTimeFormat(pattern = "yyyy-MM-dd") Date tradeDateEnd
    ) {
        try {
            // 构建查询请求
            DeliveryOrderQueryRequest request = new DeliveryOrderQueryRequest();
            request.setPage(page);
            request.setPageSize(pageSize);
            request.setCustomerId(customerId);
            request.setPortfolioId(portfolioId);
            request.setFundCode(fundCode);
            request.setTradeType(tradeType);
            request.setTradeDateStart(tradeDateStart);
            request.setTradeDateEnd(tradeDateEnd);
            
            // 调用Service查询
            PageResponse<DeliveryOrderResponse> result = deliveryOrderService.queryDeliveryOrders(request);
            
            return ApiResponse.success(result);
            
        } catch (Exception e) {
            logger.severe("查询交割单失败: " + e.getMessage());
            return ApiResponse.error(500, "查询交割单失败: " + e.getMessage());
        }
    }
} 