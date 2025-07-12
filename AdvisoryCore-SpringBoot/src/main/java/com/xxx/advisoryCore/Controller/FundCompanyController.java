package com.xxx.advisoryCore.Controller;
import com.xxx.advisoryCore.Dto.FundCompanyQueryRequest;
import com.xxx.advisoryCore.Entity.FundCompany;
import com.xxx.advisoryCore.Service.FundCompanyService;
import org.mybatis.logging.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.github.pagehelper.PageInfo;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/fund-companies")
public class FundCompanyController {

    @Autowired
    private FundCompanyService fundCompanyService;

    @PostMapping("/query")
    public ResponseEntity<?> query(@RequestBody FundCompanyQueryRequest request) {
        try {
            // 直接查全部，不分页
            Object data = fundCompanyService.queryByCondition(request);
            if (data == null) {
                return ResponseEntity.ok(Collections.emptyList());
            }
            return ResponseEntity.ok(data);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("服务器内部错误，请联系管理员");
        }
    }

}

