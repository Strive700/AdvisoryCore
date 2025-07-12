package com.xxx.advisoryCore.Entity;

import lombok.Data;

@Data
public class CategoryFactor {
    private Integer categoryId;    // 主键ID
    private String name;           // 大类因子名称
    private String description;    // 描述
    private String factorList;     // 因子ID列表(JSON数组字符串)
} 