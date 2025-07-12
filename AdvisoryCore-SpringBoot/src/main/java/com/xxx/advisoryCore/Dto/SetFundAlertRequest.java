package com.xxx.advisoryCore.Dto;

import lombok.Data;

@Data
public class SetFundAlertRequest {
    private String fundCode;        // 基金代码
    private String alertParam;      // 预警参数名
    private Double threshold;       // 阈值
    private String alertAction;     // 预警操作（非存储字段，可用于描述或扩展）
    private String description;     // 说明信息
}
