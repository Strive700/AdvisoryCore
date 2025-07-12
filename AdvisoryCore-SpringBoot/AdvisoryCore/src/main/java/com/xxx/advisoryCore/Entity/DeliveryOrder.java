package com.xxx.advisoryCore.Entity;

import lombok.Data;
import java.math.BigDecimal;
import java.util.Date;

@Data
public class DeliveryOrder {

    // settlement_orders 表字段
    private Integer id;                  // 主键 ID
    private String batchNo;             // 批次编号
    private String portfolioName;       // 组合名称
    private Integer portfolioId;        // 组合 ID
    private String fundName;            // 基金名称
    private String fundCode;            // 基金代码
    private Integer tradeOrderId;       // 交易指令 ID（外键）

    // trade_orders 关联字段
    private Integer tradeid;            // trade_orders.tradeid
    private Integer customerId;         // 客户 ID
    private String tradeType;           // 交易类型 BUY/SELL 等
    private BigDecimal executedShares;  // 成交份额
    private BigDecimal executedAmount;  // 成交金额
    private BigDecimal executedPrice;   // 成交价格
    private BigDecimal commission;      // 佣金
    private BigDecimal tax;             // 税费
    private Date executionTime;         // 实际成交时间
    private String status;              // COMPLETED, PARTIAL_FILLED
    private String sourceSystem;        // 来源系统
}
