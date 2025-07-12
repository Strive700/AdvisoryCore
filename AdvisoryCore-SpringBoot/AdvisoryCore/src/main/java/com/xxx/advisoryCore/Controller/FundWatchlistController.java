package com.xxx.advisoryCore.Controller;

import com.xxx.advisoryCore.Service.FundWatchlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/fund-watchlist")
public class FundWatchlistController {

    @Autowired
    private FundWatchlistService fundWatchlistService;

    /**
     * 查询所有 alert_flag = true 的基金备选库数据（含预警提示、收益、净值等信息）
     */
    @GetMapping("/alerts")
    public ResponseEntity<?> getAlertedFundWatchlist() {
        Map<String , Object> result = new HashMap<>();
        try {
            List<Map<String, Object>> data = fundWatchlistService.getAlertedFundWatchlistDetails();
            result.put("data", data);
            result.put("status", "success");
            result.put("Code", "200");
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("获取基金预警列表失败：" + e.getMessage());
        }
    }
    @DeleteMapping("/{watchlistId}")
    public ResponseEntity<?> deleteWatchlistEntry(@PathVariable Integer watchlistId) {
        try {
            boolean success = fundWatchlistService.deleteById(watchlistId);
            if (success) {
                return ResponseEntity.ok("删除成功");
            } else {
                return ResponseEntity.status(404).body("未找到对应记录");
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("删除失败：" + e.getMessage());
        }
    }
}
