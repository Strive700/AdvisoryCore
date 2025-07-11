package com.xxx.advisoryCore.Entity;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CustomStyleFactor {
    private Integer styleId;          // 主键ID
    private String name;              // 因子名称
    private String displayName;       // 展示名
    private String description;       // 因子说明
    private String calcMethod;        // 计算方法（自然语言、SQL、Python、脚本ID）
    private LocalDateTime createTime; // 创建时间
    private String updateFrequency;   // 更新频率
    private Boolean enabled;          // 是否启用
    private String styleTag;          // 风格标签
}