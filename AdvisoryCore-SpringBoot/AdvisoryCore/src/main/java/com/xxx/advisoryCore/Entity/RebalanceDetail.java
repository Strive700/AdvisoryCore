package com.xxx.advisoryCore.Entity;
import lombok.Data;

@Data
public class RebalanceDetail {
    private Integer rebalanceId;   // 主键ID
    private Integer taskId;        // 调仓任务ID（外键，对应 RebalanceTask.id）
    private String fundCode;       // 基金代码
    private Double oldWeight;      // 原配置权重
    private Double newWeight;      // 新配置权重
    private Double diff;           // 权重差值（newWeight - oldWeight）
}
