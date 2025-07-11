package com.xxx.advisoryCore.Dto;

import lombok.Data;
import java.util.List;

@Data
public class BulkRejectTradeOrderResponse {
    private Integer rejected_count;
    private List<Integer> failed_ids;
    
    public BulkRejectTradeOrderResponse(Integer rejectedCount, List<Integer> failedIds) {
        this.rejected_count = rejectedCount;
        this.failed_ids = failedIds;
    }
} 