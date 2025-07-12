package com.xxx.advisoryCore.Controller;

import com.xxx.advisoryCore.Entity.Portfolio;
import com.xxx.advisoryCore.Service.PortfolioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/portfolio")
public class PortfolioController {

    @Autowired
    private PortfolioService portfolioService;
    @Autowired
    private com.xxx.advisoryCore.Service.FofPortfolioService fofPortfolioService;
    @Autowired
    private com.xxx.advisoryCore.Service.TimingPortfolioService timingPortfolioService;

    /**
     * 新增组合
     */
    @PostMapping("")
    public ResponseEntity<?> createPortfolio(@RequestBody Portfolio portfolio) {
        try {
            int result = portfolioService.insertPortfolio(portfolio);
            if (result > 0) {
                return ResponseEntity.status(HttpStatus.CREATED).body("创建成功");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("创建失败");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("创建异常: " + e.getMessage());
        }
    }

    /**
     * 获取所有策略组合、FOF组合和择时基金组合
     */
    @GetMapping("/all")
    public ResponseEntity<?> getAllPortfolios() {
        try {
            java.util.Map<String, Object> result = new java.util.HashMap<>();
            result.put("portfolios", portfolioService.getAllPortfolios());
            result.put("fofPortfolios", fofPortfolioService.getAllFofPortfolios());
            result.put("timingPortfolios", timingPortfolioService.getAllTimingPortfolios());
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("查询异常: " + e.getMessage());
        }
    }
} 