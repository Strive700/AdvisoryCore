package com.xxx.advisoryCore.Dto;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
public class DeliveryOrderQueryRequest {
    
    // 分页参数
    private Integer page = 1;           // 页码，默认1
    private Integer pageSize = 10;      // 每页大小，默认10
    
    // 过滤条件
    private Integer customerId;         // 客户ID，根据trade_orders.customer_id过滤
    private Integer portfolioId;        // 组合ID，匹配settlement_orders.portfolio_id
    private String fundCode;            // 基金代码，模糊匹配settlement_orders.fund_code
    private String tradeType;           // 交易类型，匹配trade_orders.trade_type
    
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date tradeDateStart;        // 交易开始日期，匹配trade_orders.trade_time >= start
    
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date tradeDateEnd;          // 交易结束日期，匹配trade_orders.trade_time <= end
    
    // 参数验证和默认值设置
    public void validateAndSetDefaults() {
        if (page == null || page < 1) {
            page = 1;
        }
        if (pageSize == null || pageSize < 1 || pageSize > 100) {
            pageSize = 10;
        }
    }
} 