package com.xxx.advisoryCore.Dto;

import lombok.Data;

@Data
public class AddDerivedFactorResponse {
    private Integer derivedId;
    private Integer insertedCount;
    
    public AddDerivedFactorResponse(Integer derivedId, Integer insertedCount) {
        this.derivedId = derivedId;
        this.insertedCount = insertedCount;
    }
} 