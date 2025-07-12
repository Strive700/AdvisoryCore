package com.xxx.advisoryCore.Controller;
import com.xxx.advisoryCore.Dto.FundCompanyQueryRequest;
import com.xxx.advisoryCore.Dto.FundQueryRequest;
import com.xxx.advisoryCore.Dto.FundQueryResponse;
import com.xxx.advisoryCore.Service.FundService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/funds")
public class FundsController {
    @Autowired
    FundService fundService;
    
    /**
     * 原有的基金查询接口（保留兼容性）
     */
    
    /**
     * 新的连表查询基金接口
     * 使用LEFT JOIN优化查询性能，一次性获取所有相关数据
     */
    @PostMapping("/queryWithJoin")
    public ResponseEntity<FundQueryResponse> queryFundsWithJoin(@RequestBody FundQueryRequest request) {
        try {
            FundQueryResponse response = fundService.queryFundsWithJoin(request);
            System.out.println(request.getCode());
            System.out.println(response);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(FundQueryResponse.error("查询基金失败: " + e.getMessage()));
        }
    }
    
    /**
     * 基金图片查询接口
     */
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
