package com.xxx.advisoryCore.Entity;

import lombok.Data;

@Data
public class FactorDefinition {
    private Integer definitionid;    // 主键ID
    private String name;             // 因子名称
    private String displayName;      // 展示名称
    private String factorType;       // 因子类型（如风险、收益等）
    private String dataType;         // 数据类型（数值型、类别型等）
    private String calcMethod;       // 计算方法描述（自然语言、SQL、Python等）
    private String updateFrequency;  // 更新频率（如每日、每月）
    private Boolean enabled;         // 是否启用
}
