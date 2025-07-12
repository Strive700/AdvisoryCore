package com.xxx.advisoryCore.Dto;

import lombok.Data;
import java.util.List;

@Data
public class BulkIssueTradeOrderResponse {
    private Integer issued_count;
    private List<Integer> failed_ids;
    
    public BulkIssueTradeOrderResponse(Integer issuedCount, List<Integer> failedIds) {
        this.issued_count = issuedCount;
        this.failed_ids = failedIds;
    }
} 