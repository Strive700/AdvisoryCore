package com.xxx.advisoryCore.Dto;

import lombok.Data;
import java.math.BigDecimal;
import java.util.Date;

@Data
public class DeliveryOrderResponse {
    
    private String deliveryId;          // settlement_orders.batch_no
    private Integer tradeid;            // trade_orders.tradeid
    private Integer customerId;         // trade_orders.customer_id
    private Integer portfolioId;        // settlement_orders.portfolio_id
    private String fundCode;            // settlement_orders.fund_code
    private String fundName;            // settlement_orders.fund_name
    private String tradeType;           // trade_orders.trade_type
    private BigDecimal executedShares;  // trade_orders.executed_shares
    private BigDecimal executedAmount;  // trade_orders.executed_amount
    private BigDecimal executedPrice;   // trade_orders.executed_price
    private BigDecimal commission;      // trade_orders.commission
    private BigDecimal tax;             // trade_orders.tax
    private Date executionTime;         // trade_orders.execution_time
    private String status;              // trade_orders.status
    private String sourceSystem;        // trade_orders.source_system
} 