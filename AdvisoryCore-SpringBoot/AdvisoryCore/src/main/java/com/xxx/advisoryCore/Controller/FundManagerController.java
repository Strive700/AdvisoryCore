package com.xxx.advisoryCore.Controller;

import com.xxx.advisoryCore.Dto.FundManagerQueryRequest;
import com.xxx.advisoryCore.Service.FundManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/fund-managers")
public class FundManagerController {

    @Autowired
    private FundManagerService fundManagerService;

    @PostMapping("/query")
    public ResponseEntity<?> query(@RequestBody FundManagerQueryRequest request) {
        try {
            // 参数容错：页码或页大小为负或为 null 时设置默认值
            if (request.getPage() == null || request.getPage() <= 0) {
                request.setPage(1);
            }
            if (request.getPageSize() == null || request.getPageSize() <= 0) {
                request.setPageSize(10);
            }

            // 执行业务查询
            Map<String, Object> result = fundManagerService.queryByCondition(request);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            // 捕获运行异常，避免返回 500 错误
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", "查询失败：" + e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }
}
