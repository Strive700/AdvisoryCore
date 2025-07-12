package com.xxx.advisoryCore.Entity;

import lombok.Data;

import java.time.LocalDate;

/**
 * 方案表实体类
 * 对应数据库表: plans
 */
@Data
public class Plan {
    private Integer planId;    // 方案ID
    private String planName;   // 方案名称
    private String indexList;  // 指数名称列表(JSON数组格式，存储为字符串)
    private LocalDate startDate; // 开始日期
    private LocalDate endDate;   // 结束日期
}