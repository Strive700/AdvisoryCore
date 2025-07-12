package com.xxx.advisoryCore.Entity;

import lombok.Data;

/**
 * 择时基金组合实体类
 * 对应数据库表: timing_portfolios
 */
@Data
public class TimingPortfolio {
    private Integer timingid;         // 主键ID
    private String name;              // 组合名称
    private String benchmark;         // 比较基准
    private String feature;           // 组合特色
    private String audience;          // 适用人群
    private Double scale;             // 资产规模
    private Double feeRate;           // 申购费率
    private String allocationMethod;  // 配比方式
    private String fundAllocation;    // 组合基金名称和权重列表(JSON格式)
} 