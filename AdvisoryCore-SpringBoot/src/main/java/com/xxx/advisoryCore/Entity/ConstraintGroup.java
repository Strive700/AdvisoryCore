package com.xxx.advisoryCore.Entity;

import lombok.Data;

/**
 * 约束组定义实体类
 * 对应数据库表: constraint_groups
 */
@Data
public class ConstraintGroup {
    private Integer groupid;           // 主键ID
    private String indexName;          // 挑选指数名称
    private String referenceMetric;    // 参考指标
    private String maReference;        // 参考日均线
    private Integer buyLimit;          // 申购约束限制数量
    private Integer sellLimit;         // 赎回约束限制数量
    private Integer userId;            // 用户ID
} 