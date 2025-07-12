package com.xxx.advisoryCore.Controller;

import com.xxx.advisoryCore.Dto.LoginRequest;
import com.xxx.advisoryCore.Dto.LoginResponse;
import com.xxx.advisoryCore.Entity.IndexDefinition;
import com.xxx.advisoryCore.Entity.IndexTreeNode;
import com.xxx.advisoryCore.Service.IndexService;
import lombok.Data;
import org.apache.coyote.Request;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class Login {

    @Autowired
    private IndexService indexService;

    /**
     * 获取全部大类资产指数（返回全部信息）
     */
    @PostMapping("/api/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();

        // 模拟验证逻辑
        if ("admin".equals(username) && "123456".equals(password)) {
            LoginResponse resp = new LoginResponse(true, "登录成功",  "200");
            return ResponseEntity.ok(resp);
        } else {
            LoginResponse resp = new LoginResponse(false, "用户名或密码错误", "401");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(resp);
        }
    }
    // LoginRequest.java
}