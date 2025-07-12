package com.xxx.advisoryCore.Controller;
import com.xxx.advisoryCore.Service.FactorService;
import com.xxx.advisoryCore.Entity.FactorTreeNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/factors")
public class FactorController {

    @Autowired
    private FactorService factorService;

    /**
     * 获取全部因子树节点，用于前端构建树结构
     */
    @GetMapping("/tree")
    public ResponseEntity<?> getFactorTree() {
        try {
            List<FactorTreeNode> factorTreeNodes = factorService.getAllFactorTreeNodes();
            if (factorTreeNodes == null) {
                factorTreeNodes = Collections.emptyList();
            }
            return ResponseEntity.ok(factorTreeNodes);
        } catch (Exception e) {

            // 返回 500 错误及简洁错误消息
            Map<String, Object> errorBody = new HashMap<>();
            errorBody.put("error", "Failed to get factor tree");
            errorBody.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorBody);
        }
    }
}

