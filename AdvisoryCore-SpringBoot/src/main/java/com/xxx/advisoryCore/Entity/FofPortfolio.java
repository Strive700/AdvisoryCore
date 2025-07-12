package com.xxx.advisoryCore.Entity;

import lombok.Data;

@Data
public class FofPortfolio {
    private Integer fofid;                // 主键ID
    private String portfolioName;         // 组合名称
    private String benchmarkIndex;        // 比较基准
    private String portfolioFeature;      // 组合特色
    private String targetAudience;        // 适用人群
    private String allocationMethod;      // 配比方式
    private String weightingScheme;       // 权重配置类型
    private String representativeFundCode;// 基金代码
    private String riskRating;            // 风险等级
} 