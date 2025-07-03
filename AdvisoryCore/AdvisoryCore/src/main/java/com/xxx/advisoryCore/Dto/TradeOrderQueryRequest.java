package com.xxx.advisoryCore.Dto;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Data
public class TradeOrderQueryRequest {
    
    private Integer page = 1;           // 页码，默认1
    private Integer pageSize = 10;      // 每页条数，默认10
    private String orderType;           // 交易类型
    private String status;              // 指令状态
    private Integer portfolioId;        // 组合ID
    private Integer customerId;         // 客户ID
    
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;        // 交易时间起始
    
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate endDate;          // 交易时间结束
} 