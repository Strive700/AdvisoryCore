package com.xxx.advisoryCore.Controller;
import com.xxx.advisoryCore.Dto.FundCompanyQueryRequest;
import com.xxx.advisoryCore.Dto.FundQueryRequest;
import com.xxx.advisoryCore.Service.FundService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
@RestController
@RequestMapping("/api/funds")
public class FundsController {
    @Autowired
    FundService fundService;
    @PostMapping("/query")
    public ResponseEntity<?> searchFunds(@RequestBody FundQueryRequest request) {
        Map<String,Object> response = new HashMap<>();
        response=fundService.selectFunds(request);
        return ResponseEntity.ok(response);
    }
    @PostMapping("/Fund_Image")
    public ResponseEntity<?> Fund_Image(@RequestBody Map<String,Object> request) {
        try {
            if (request == null) {
                return ResponseEntity.badRequest().body("请求体不能为空");
            }

            Map<String, Object> data = (Map<String, Object>)fundService.selectFund_image(request);

            if (data == null || data.isEmpty()) {
                return ResponseEntity.ok(Collections.emptyMap());
            }

            return ResponseEntity.ok(data);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("服务器内部错误，请联系管理员");
        }
    }
}
