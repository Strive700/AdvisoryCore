package com.xxx.advisoryCore.Dto;

import lombok.Data;

@Data
public class FundDTO {
    private String fundCode;           // 基金代码
    private String fundName;           // 基金简称
    private String managerName;        // 基金经理
    private String fundType;           // 基金类型
    private Double unitNav;            // 最新净值
    private String navDate;            // 最新净值日期
    private Double return1m;           // 近一月收益率
    private Double returnYtd;          // 今年以来收益率
    private Double maxDrawdown1y;      // 近一年最大回撤
    private String operationCycle;     // 运行周期
    private Double fundSize;           // 资金规模(亿元)
    private String inceptionDate;      // 成立日期
    private Double qualityScore;       // 优品基金评分
}