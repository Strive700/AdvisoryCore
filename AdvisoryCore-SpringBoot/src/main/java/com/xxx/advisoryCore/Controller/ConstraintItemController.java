package com.xxx.advisoryCore.Controller;

import com.xxx.advisoryCore.Entity.ConstraintItem;
import com.xxx.advisoryCore.Service.ConstraintItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/constraint-item")
public class ConstraintItemController {

    @Autowired
    private ConstraintItemService constraintItemService;

    /**
     * 新增具体约束项
     */
    @PostMapping("")
    public ResponseEntity<?> createConstraintItem(@RequestBody ConstraintItem constraintItem) {
        try {
            int result = constraintItemService.insertConstraintItem(constraintItem);
            if (result > 0) {
                return ResponseEntity.status(HttpStatus.CREATED).body("创建成功");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("创建失败");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("创建异常: " + e.getMessage());
        }
    }
} 