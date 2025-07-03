package com.xxx.advisoryCore.Dto;

import lombok.Data;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.DecimalMax;
import java.util.List;

@Data
public class AccountRebalanceSubmitRequest {
    
    @NotNull(message = "组合ID不能为空")
    private String portfolioId;
    
    @NotNull(message = "客户ID不能为空")
    private Integer customerId;
    
    @NotBlank(message = "调仓原因不能为空")
    private String reason;
    
    @NotBlank(message = "操作人不能为空")
    private String operator;
    
    @Valid
    @NotNull(message = "调仓明细不能为空")
    @Size(min = 1, message = "至少需要包含一个调仓明细")
    private List<RebalanceDetail> details;
    
    @Data
    public static class RebalanceDetail {
        @NotBlank(message = "基金代码不能为空")
        private String fund_code;
        
        @NotNull(message = "原权重不能为空")
        @DecimalMin(value = "0.0", inclusive = true, message = "原权重必须在0-1之间")
        @DecimalMax(value = "1.0", inclusive = true, message = "原权重必须在0-1之间")
        private Double old_weight;
        
        @NotNull(message = "新权重不能为空")
        @DecimalMin(value = "0.0", inclusive = true, message = "新权重必须在0-1之间")
        @DecimalMax(value = "1.0", inclusive = true, message = "新权重必须在0-1之间")
        private Double new_weight;
        
        @NotNull(message = "权重差值不能为空")
        private Double diff;
    }
} 