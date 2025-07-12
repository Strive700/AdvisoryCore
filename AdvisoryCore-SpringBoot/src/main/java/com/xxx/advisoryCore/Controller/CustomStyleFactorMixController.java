package com.xxx.advisoryCore.Controller;

import com.xxx.advisoryCore.Dto.AddCustomStyleFactorRequest;
import com.xxx.advisoryCore.Dto.AddCustomStyleFactorResponse;
import com.xxx.advisoryCore.Dto.ApiResponse;
import com.xxx.advisoryCore.Entity.CustomStyleFactorMix;
import com.xxx.advisoryCore.Service.CustomStyleFactorMixService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/custom-style-factors")
public class CustomStyleFactorMixController {

    @Autowired
    private CustomStyleFactorMixService customStyleFactorMixService;

    @PostMapping("/batch-add")
    public ResponseEntity<?> batchAdd(@RequestBody List<CustomStyleFactorMix> mixes) {
        boolean success = customStyleFactorMixService.addCustomStyleFactorMixes(mixes);
        if (success) {
            return ResponseEntity.ok("批量添加成功");
        } else {
            return ResponseEntity.badRequest().body("参数错误或添加失败");
        }
    }
    
    /**
     * 添加风格因子接口
     * 接口名称：16Add_style_factor
     * 
     * @param request 添加风格因子请求
     * @return 添加结果
     */
    @PostMapping("/add")
    public ResponseEntity<ApiResponse<AddCustomStyleFactorResponse>> addCustomStyleFactor(
            @Valid @RequestBody AddCustomStyleFactorRequest request) {
        System.out.println(request);
        try {
            AddCustomStyleFactorResponse response = customStyleFactorMixService.addCustomStyleFactor(request);
            return ResponseEntity.ok(ApiResponse.success("添加成功", response));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(ApiResponse.error("服务器内部错误"));
        }
    }
} 