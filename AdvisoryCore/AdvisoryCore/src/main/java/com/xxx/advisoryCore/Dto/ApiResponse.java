package com.xxx.advisoryCore.Dto;

import lombok.Data;

@Data
public class ApiResponse<T> {
    private Integer code;
    private String msg;
    private T data;
    
    // 默认构造函数
    public ApiResponse() {}
    
    // 带参数的构造函数
    public ApiResponse(Integer code, String msg, T data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }
    
    public static <T> ApiResponse<T> success(T data) {
        ApiResponse<T> response = new ApiResponse<>();
        response.setCode(0);
        response.setMsg("成功");
        response.setData(data);
        return response;
    }
    
    public static <T> ApiResponse<T> success(String msg, T data) {
        ApiResponse<T> response = new ApiResponse<>();
        response.setCode(0);
        response.setMsg(msg);
        response.setData(data);
        return response;
    }
    
    public static <T> ApiResponse<T> error(String msg) {
        ApiResponse<T> response = new ApiResponse<>();
        response.setCode(400);
        response.setMsg(msg);
        return response;
    }
    
    public static <T> ApiResponse<T> error(Integer code, String msg) {
        ApiResponse<T> response = new ApiResponse<>();
        response.setCode(code);
        response.setMsg(msg);
        return response;
    }
} 