package com.xxx.advisoryCore.Dto;

import lombok.Data;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank; // 用于非空且非空白字符串的校验
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;

@Data
public class AddDerivedFactorRequest {

    @Valid // 启用对List中每个BaseFactor对象的校验
    @Size(min = 1, message = "至少需要包含一个基础因子")
    private List<BaseFactor> factors;

    private String name; // 对应前端 payload 中的 name

    private String displayName; // 对应前端 payload 中的 displayName

    private String factorType; // 对应前端 payload 中的 factorType

    private String dataType; // 对应前端 payload 中的 dataType

    private String calcMethod; // 对应前端 payload 中的 calcMethod

    private String updateFrequency; // 对应前端 payload 中的 updateFrequency

    private String factorName;

    @Data
    public static class BaseFactor {
        @NotNull(message = "基础因子ID不能为空")
        private Integer baseId;

        @NotNull(message = "权重不能为空")
        private Double weight;
    }
}