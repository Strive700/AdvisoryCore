package com.xxx.advisoryCore.Entity;

import lombok.Data;

/**
 * 具体约束项实体类
 * 对应数据库表: constraint_items
 */
@Data
public class ConstraintItem {
    private Integer itemid;           // 主键ID
    private Integer groupId;          // 所属约束组ID
    private String type;              // 约束类型（申购/赎回）
    private String paramName;         // 参数名称
    private String operator;          // 操作符
    private Double threshold;         // 阈值
    private String conditionRelation; // 条件关系
} 