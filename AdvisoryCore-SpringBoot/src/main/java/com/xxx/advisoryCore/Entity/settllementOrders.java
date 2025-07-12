package com.xxx.advisoryCore.Entity;

import lombok.Data;

@Data
public class settllementOrders {
    private Long id;                 // 主键 ID
    private String fundCode;         // 基金代码
    private String fundName;         // 基金名称
    private Integer portfolioId;     // 组合 ID
    private String portfolioName;    // 组合名称
    private String batchNo;          // 批次号
    private Integer tradeOrderId;
}
