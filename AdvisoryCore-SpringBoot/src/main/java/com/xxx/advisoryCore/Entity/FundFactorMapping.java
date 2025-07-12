package com.xxx.advisoryCore.Entity;

import lombok.Data;

@Data
public class FundFactorMapping {
    private Integer id;         // 主键ID
    private String fundId;      // 基金ID
    private String factorNames; // 大类因子名称列表(JSON数组字符串)
} 