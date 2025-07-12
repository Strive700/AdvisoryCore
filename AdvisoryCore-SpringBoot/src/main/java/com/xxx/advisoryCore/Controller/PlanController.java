package com.xxx.advisoryCore.Controller;

import com.xxx.advisoryCore.Entity.Plan;
import com.xxx.advisoryCore.Service.PlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 方案表 Controller
 */
@RestController
@RequestMapping("/api/plans")
public class PlanController {

    @Autowired
    private PlanService planService;

    /**
     * 获取所有方案
     * @return 方案列表
     */
    @GetMapping("")
    public ResponseEntity<?> getAllPlans() {
        try {
            List<Plan> plans = planService.getAllPlans();
            if (plans == null) {
                plans = Collections.emptyList();
            }
            return ResponseEntity.ok(plans);
        } catch (Exception e) {
            Map<String, Object> errorBody = new HashMap<>();
            errorBody.put("error", "Failed to get plans");
            errorBody.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorBody);
        }
    }

    /**
     * 新增方案
     * @param plan 方案对象（JSON）
     * @return 插入结果
     */
    @PostMapping("")
    public ResponseEntity<?> addPlan(@RequestBody Plan plan) {
        System.out.println(plan);
        try {
            int result = planService.insertPlan(plan);
            if (result > 0) {
                return ResponseEntity.status(HttpStatus.CREATED).body("插入成功");
            } else {
                System.out.println("<UNK>");
                Map<String, Object> errorBody = new HashMap<>();
                errorBody.put("error", "Insert failed");
                errorBody.put("message", "未插入任何数据");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorBody);
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            Map<String, Object> errorBody = new HashMap<>();
            errorBody.put("error", "Failed to insert plan");
            errorBody.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorBody);
        }
    }

    /**
     * 根据方案名称更新方案信息
     * @param planName 路径参数，方案名称
     * @param plan 方案对象（JSON，需包含 indexList）
     * @return 更新结果
     */
    @PutMapping("/{planName}")
    public ResponseEntity<?> updatePlanByName(@PathVariable String planName, @RequestBody Plan plan) {
        System.out.println("planName: " + planName);
        try {
            plan.setPlanName(planName); // 确保用路径参数覆盖
            int result = planService.updatePlanByName(plan);
            if (result > 0) {
                return ResponseEntity.ok("更新成功");
            } else {
                Map<String, Object> errorBody = new HashMap<>();
                errorBody.put("error", "Update failed");
                errorBody.put("message", "未更新任何数据");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorBody);
            }
        } catch (Exception e) {
            Map<String, Object> errorBody = new HashMap<>();
            errorBody.put("error", "Failed to update plan");
            errorBody.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorBody);
        }
    }

    /**
     * 根据方案名称删除方案
     * @param planName 路径参数，方案名称
     * @return 删除结果
     */
    @DeleteMapping("/{planName}")
    public ResponseEntity<?> deletePlanByName(@PathVariable String planName) {
        try {
            int result = planService.deletePlanByName(planName);
            if (result > 0) {
                return ResponseEntity.ok("删除成功");
            } else {
                Map<String, Object> errorBody = new HashMap<>();
                errorBody.put("error", "Delete failed");
                errorBody.put("message", "未删除任何数据");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorBody);
            }
        } catch (Exception e) {
            Map<String, Object> errorBody = new HashMap<>();
            errorBody.put("error", "Failed to delete plan");
            errorBody.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorBody);
        }
    }
} 