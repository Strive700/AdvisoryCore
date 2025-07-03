package com.xxx.advisoryCore.Entity;

import lombok.Data;

@Data
public class DerivedFactor {
    private Integer factorid;    // 主键
    private Integer derivedId;   // 衍生因子ID（指向 factor_definitions.definitionid）
    private Integer baseId;      // 基础因子ID（指向 factor_definitions.definitionid）
    private Double weight;       // 权重
}