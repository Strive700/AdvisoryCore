package com.xxx.advisoryCore.Controller;

import com.xxx.advisoryCore.Dto.SetFundAlertRequest;
import com.xxx.advisoryCore.Service.FundAlertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/fund-alerts")
public class FundAlertController {

    @Autowired
    private FundAlertService fundAlertService;

    @PostMapping("/set")
    public ResponseEntity<?> setWarning(@RequestBody SetFundAlertRequest request) {
        try {
            Map<String, Object> result = fundAlertService.setWarning(request);
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", "服务器内部错误"));
        }
    }
}

