package com.xxx.advisoryCore.Dto;

import lombok.Data;

@Data
public class LoginResponse {
    private boolean success;
    private String message;
    private String code;

    public LoginResponse(boolean success, String message,String code) {
        this.success = success;
        this.message = message;
        this.code = code;
    }
}
