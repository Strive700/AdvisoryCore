package com.xxx.advisoryCore.Entity;

import lombok.Data;

/**
 * 基金-指数关联表实体类
 * 对应数据库表: fund_index_mapping
 */
@Data
public class FundIndexMapping {
    private String fundId;     // 基金ID
    private String indexNames; // 指数名称列表(JSON数组格式，存储为字符串)//实际上是单个的
}