package com.xxx.advisoryCore.Dto;

import lombok.Data;

@Data
public class FundDTO {
    private Integer id;               // 基金ID
    private String code;             // 基金代码
    private String name;             // 基金名称
    private String establishedDate;  // 成立日期 yyyy-MM-dd
    private Long scale;              // 基金规模（单位元）
    private Double managerTenure;    // 基金经理任职年限（年）
    private Double yieldThisYear;    // 今年以来收益率（小数）
    private Double feeRate;          // 管理费率（小数）
    private String style;            // 风格归因
}