package com.xxx.advisoryCore.Dto;

import lombok.Data;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;

@Data
public class AddCustomStyleFactorRequest {
    @Valid
    @NotNull(message = "衍生因子列表不能为空")
    @Size(min = 1, message = "至少需要包含一个衍生因子")
    private List<DerivedFactor> factors;
    
    @Data
    public static class DerivedFactor {
        @NotNull(message = "衍生因子ID不能为空")
        private Integer factorId;
        
        @NotNull(message = "权重不能为空")
        private Double weight;
        
        @NotNull(message = "是否归一化不能为空")
        private Boolean normalized;
    }
} 