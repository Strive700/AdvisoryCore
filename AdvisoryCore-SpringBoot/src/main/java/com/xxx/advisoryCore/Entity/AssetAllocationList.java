package com.xxx.advisoryCore.Entity;

import lombok.Data;

@Data
public class AssetAllocationList {
    private Integer listid;        // 主键ID
    private Integer allocationId;  // 组合ID（外键）
    private String fundCode;       // 基金代码（外键）
    private Double weight;         // 配置权重
} 