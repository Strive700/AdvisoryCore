package com.xxx.advisoryCore.Dto;

import lombok.Data;
import java.util.List;

@Data
public class BulkRejectTradeOrderRequest {
    
    private List<Integer> trade_ids;
    
    private String reject_reason;
    
    private String operator;
} 