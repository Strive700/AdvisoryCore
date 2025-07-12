package com.xxx.advisoryCore.Entity;

import lombok.Data;

@Data
public class AssetAllocation {
    private Integer assetId;      // 主键ID
    private String name;          // 组合名称
    private String benchmark;     // 比较基准
    private String feature;       // 组合特色
    private String audience;      // 适用人群
    private String method;        // 配比方式
    private String weightType;    // 权重配置类型
    private String fundCode;      // 基金代码
    private String riskLevel;     // 风险等级
} 