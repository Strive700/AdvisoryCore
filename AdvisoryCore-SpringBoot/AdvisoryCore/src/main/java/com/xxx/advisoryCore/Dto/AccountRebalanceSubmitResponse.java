package com.xxx.advisoryCore.Dto;

import lombok.Data;

@Data
public class AccountRebalanceSubmitResponse {
    private Integer task_id;
    
    public AccountRebalanceSubmitResponse(Integer taskId) {
        this.task_id = taskId;
    }
} 