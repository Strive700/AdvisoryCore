package com.xxx.advisoryCore.Entity;

import lombok.Data;

/**
 * 组合实体类
 * 对应数据库表: portfolios
 */
@Data
public class Portfolio {
    private Integer id;            // 组合ID
    private String name;           // 组合名称
    private String riskLevel;      // 风险等级
    private String strategyType;   // 策略类型
    private Integer strategyId;    // 对应组合ID（外键）
    private Boolean listed;        // 是否上架
} 