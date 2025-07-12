package com.xxx.advisoryCore.Entity;

import lombok.Data;

@Data
public class FundWatchlist {
    private Integer watchlistId;   // 主键ID
    private String fundCode;       // 基金代码
    private String reason;         // 入库原因
    private Boolean alertFlag;     // 是否预警
}