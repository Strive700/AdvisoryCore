package com.xxx.advisoryCore.Entity;


import lombok.Data;

import java.time.LocalDateTime;

@Data
public class RebalanceTask {
    private Integer id;                // 主键ID
    private Integer strategyId;        // 所属策略
    private LocalDateTime triggerTime; // 触发时间
    private String taskType;           // 调仓类型
    private LocalDateTime executeTime; // 实际执行时间
    private String reason;             // 调仓原因
    private String operator;           // 操作人或系统标识
}
