package com.xxx.advisoryCore.Dto;

import lombok.Data;

@Data
public class FailedTradeOrderQueryRequest {
    private Integer page = 1;           // 页码，默认1
    private Integer pageSize = 10;      // 分页大小，默认10
    private Integer portfolioId;        // 组合ID（可选）
    private Integer customerId;         // 客户ID（可选）
    private String tradeType;           // 交易类型（可选）
    private String failReason;          // 失败原因（可选，模糊匹配）
} 