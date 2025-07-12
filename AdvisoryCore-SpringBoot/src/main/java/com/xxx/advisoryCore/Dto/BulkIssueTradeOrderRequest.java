package com.xxx.advisoryCore.Dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import java.util.List;

@Data
public class BulkIssueTradeOrderRequest {
    
    @NotEmpty(message = "交易指令ID列表不能为空")
    @Size(min = 1, message = "至少需要包含一个交易指令ID")
    private List<Integer> trade_ids;
    
    @NotBlank(message = "操作员不能为空")
    private String operator;
} 