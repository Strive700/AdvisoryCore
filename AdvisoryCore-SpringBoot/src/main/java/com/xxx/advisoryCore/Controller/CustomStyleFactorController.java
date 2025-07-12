package com.xxx.advisoryCore.Controller;

import com.xxx.advisoryCore.Entity.CustomStyleFactor;
import com.xxx.advisoryCore.Service.CustomStyleFactorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/custom-style-factor")
public class CustomStyleFactorController {
    @Autowired
    private CustomStyleFactorService customStyleFactorService;

    @PostMapping("/add")
    public ResponseEntity<?> addCustomStyleFactor(@RequestBody CustomStyleFactor factor) {
        Integer id = customStyleFactorService.addCustomStyleFactor(factor);
        Map<String, Object> result = new HashMap<>();
        result.put("styleId", id);
        return ResponseEntity.ok(result);
    }
} 