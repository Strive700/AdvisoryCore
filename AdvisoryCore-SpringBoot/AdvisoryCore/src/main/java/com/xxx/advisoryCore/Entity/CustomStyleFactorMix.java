package com.xxx.advisoryCore.Entity;

import lombok.Data;

@Data
public class CustomStyleFactorMix {
    private Integer mixId;           // 主键ID
    private Integer styleFactorId;   // 自定义因子ID（外键）
    private Integer factorId;        // 组合中的因子ID（外键）
    private Double weight;           // 权重
    private Boolean normalized;      // 是否归一化
}