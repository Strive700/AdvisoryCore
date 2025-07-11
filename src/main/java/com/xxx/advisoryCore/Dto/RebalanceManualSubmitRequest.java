package com.xxx.advisoryCore.Dto;

import lombok.Data;
import jakarta.validation.constraints.*;
import java.util.List;

@Data
public class RebalanceManualSubmitRequest {
    @NotNull(message = "组合ID不能为空")
    private Integer portfolioId;

    private Integer strategy_id;

    @NotBlank(message = "调仓原因不能为空")
    private String reason;

    @NotBlank(message = "操作人不能为空")
    private String operator;

    @NotNull(message = "调仓明细不能为空")
    @Size(min = 1, message = "调仓明细不能为空")
    private List<Detail> details;

    @Data
    public static class Detail {
        @NotBlank(message = "基金代码不能为空")
        private String fund_code;

        @NotNull(message = "原权重不能为空")
        @DecimalMin(value = "0.0", inclusive = true, message = "原权重必须在0-1之间")
        @DecimalMax(value = "1.0", inclusive = true, message = "原权重必须在0-1之间")
        private Double old_weight;

        @NotNull(message = "新权重不能为空")
        @DecimalMin(value = "0.0", inclusive = true, message = "新权重必须在0-1之间")
        @DecimalMax(value = "1.0", inclusive = true, message = "新权重必须在0-1之间")
        private Double new_weight;
    }
}
