package com.xxx.advisoryCore.Entity;

import lombok.Data;

@Data
public class FundManager {

    private String managerName;         // 基金经理名字，主键

    private String companyName;         // 所属基金公司

    private Double managedAssets;       // 在管基金规模

    private Integer managedCount;       // 在管基金数量

    private String highestEducation;    // 最高学历

    private Integer tenureYears;        // 任职年限

    private Double effectiveAssets;     // 有效资产规模

    private Double equityReturn;        // 权益类基金历史收益率

    private Double bondReturn;          // 债券类基金历史收益率

    private Double annualizedReturn;    // 任职年化收益率

    private Double winRate;             // 管理胜率
}