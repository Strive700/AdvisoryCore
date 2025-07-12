package com.xxx.advisoryCore.Entity;

import lombok.Data;

import java.math.BigDecimal;

/**
 * 大类指数定义实体类
 * 对应数据库表: index_definitions
 */
@Data
public class IndexDefinition {
    private Integer definitionid;   // 主键ID
    private String name;            // 指数名称
    private String code;            // 指数代码
    private String category;        // 分类
    private String index_type;      // 指数类型（基础/自创）
    private Boolean enabled;        // 是否启用
    private String description;     // 描述
    private BigDecimal expectedReturn;    // 预期收益(%)
    private BigDecimal expectedStdDev;   // 预期标准差(%)
    private BigDecimal assetWeight;       // 资产权重(%)
    private String constituentFunds; // 成份基金列表(JSON格式)
}