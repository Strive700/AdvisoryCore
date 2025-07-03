package com.xxx.advisoryCore.Dto;

import lombok.Data;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;

@Data
public class AddDerivedFactorRequest {
    
    @Valid
    @NotNull(message = "基础因子列表不能为空")
    @Size(min = 1, message = "至少需要包含一个基础因子")
    private List<BaseFactor> factors;
    
    @Data
    public static class BaseFactor {
        @NotNull(message = "基础因子ID不能为空")
        private Integer baseId;
        
        @NotNull(message = "权重不能为空")
        private Double weight;
    }
} 