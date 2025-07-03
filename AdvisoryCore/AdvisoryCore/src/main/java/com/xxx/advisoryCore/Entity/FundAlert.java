package com.xxx.advisoryCore.Entity;

import lombok.Data;

import java.util.Date;

@Data
public class FundAlert {
    private Integer alertId;         // 主键ID
    private String fundCode;         // 基金代码
    private String alertParam;       // 预警参数
    private Date triggerDate;        // 预警触发日期
    private Double actualValue;      // 实际触发数值
    private Double threshold;        // 阈值
    private String description;      // 预警说明内容
    private Integer status;          // 状态（0=未处理，1=处理中，2=已处理）
    private Date createTime;         // 创建时间
}
