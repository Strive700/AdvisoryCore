package com.xxx.advisoryCore.Entity;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class TradeOrder {
    private Integer tradeId;           // 主键
    private Integer customerId;        // 客户ID
    private String fundCode;           // 基金代码
    private Integer portfolioId;       // 组合ID
    private Integer rebalanceId;       // 调仓ID
    private BigDecimal amount;         // 金额
    private BigDecimal shares;         // 份额
    private BigDecimal tradeAmount;    // 交易金额
    private BigDecimal tradeQuantity;  // 交易数量
    private BigDecimal tradePrice;     // 交易价格
    private String tradeType;          // 交易类型
    private String reason;             // 交易原因
    private LocalDateTime tradeTime;   // 交易时间
    private String status;             // 状态
    private String failReason;         // 失败原因
    private Integer replaceOrderId;    // 替换订单ID
    private String operator;           // 操作员
    private LocalDateTime createTime;  // 创建时间
    private LocalDateTime updateTime;  // 更新时间
} 