package com.xxx.advisoryCore.Dto;

import lombok.Data;

@Data
public class ReplaceTradeOrderResponse {
    private Integer original_trade_id;
    private Integer new_trade_id;
    
    public ReplaceTradeOrderResponse(Integer originalTradeId, Integer newTradeId) {
        this.original_trade_id = originalTradeId;
        this.new_trade_id = newTradeId;
    }
} 