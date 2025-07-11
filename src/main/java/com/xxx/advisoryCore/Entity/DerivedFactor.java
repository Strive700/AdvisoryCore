package com.xxx.advisoryCore.Entity;

import lombok.Data;

@Data
public class DerivedFactor {
    private Integer factorId;    // 主键ID（自增）
    private Integer derivedId;   // 衍生因子ID
    private Integer baseId;      // 基础因子ID
    private Double weight;       // 因子权重
}