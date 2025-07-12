package com.xxx.advisoryCore.Dto;

import lombok.Data;

@Data
public class FundWithCoreMetricDTO {
    // 基金表字段
    private String fundCode;           // 基金代码
    private String fundName;           // 基金名称
    private String fundDescription;    // 基金简介
    private Integer managerId;         // 基金经理ID
    private Integer companyId;         // 基金管理公司ID
    private String fundType;           // 基金类型
    private String category;           // 基金所属大类
    private String operationCycle;     // 运行周期
    private Double fundSize;           // 资金规模（亿元）
    private String inceptionDate;      // 成立日期
    private Double feeRate;            // 费率（%）
    private Double stockAsset;         // 股票资产（亿元）
    private Double cashAsset;          // 现金资产（亿元）
    private Double bondAsset;          // 债券资产（亿元）
    private Double depositAsset;       // 银行存款资产（亿元）
    private Double proportion;         // 其他占比（%）

    // 核心指标表字段
    private Integer coreid;            // 主键ID
    private String statDate;           // 统计日期
    private Double return1m;           // 近一月收益率
    private Double returnYtd;          // 今年以来收益率
    private Double maxDrawdown1y;      // 近一年最大回撤
    private Double annualSharpe;       // 年化夏普率
    private String riskLevel;          // 风险等级
    private Double qualityScore;       // 优品基金评分
    private Double riskAdjScore;       // 风险调整收益评分
    private String rating;             // 基金评级
    private Double assetScore;         // 资产规模评分
    private Double researchScore;      // 机构研究支持评分
    private Double riskMgmtScore;      // 风险管理评分
    private Double tenureScore;        // 最近基金经理任职年限评分
} 