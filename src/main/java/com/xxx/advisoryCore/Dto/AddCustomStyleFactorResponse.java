package com.xxx.advisoryCore.Dto;

import lombok.Data;

@Data
public class AddCustomStyleFactorResponse {
    private Integer styleFactorId;
    private Integer insertedCount;
    
    public AddCustomStyleFactorResponse(Integer styleFactorId, Integer insertedCount) {
        this.styleFactorId = styleFactorId;
        this.insertedCount = insertedCount;
    }
} 