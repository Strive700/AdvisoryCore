package com.xxx.advisoryCore.Dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.DecimalMin;
import java.math.BigDecimal;

@Data
public class ReplaceTradeOrderRequest {
    
    @NotBlank(message = "新基金代码不能为空")
    private String new_fund_code;
    
    @DecimalMin(value = "0.0", message = "新金额不能为负数")
    private BigDecimal new_amount;
    
    @DecimalMin(value = "0.0", message = "新份额不能为负数")
    private BigDecimal new_shares;
    
    private String reason;
} 