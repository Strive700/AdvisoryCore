package com.xxx.advisoryCore.Controller;

import com.xxx.advisoryCore.Dto.AddDerivedFactorRequest;
import com.xxx.advisoryCore.Dto.AddDerivedFactorResponse;
import com.xxx.advisoryCore.Dto.ApiResponse;
import com.xxx.advisoryCore.Entity.DerivedFactor;
import com.xxx.advisoryCore.Service.DerivedFactorService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/derived-factors")
public class DerivedFactorController {

    @Autowired
    private DerivedFactorService derivedFactorService;

    @PostMapping("/batch-add")
    public ResponseEntity<?> batchAdd(@RequestBody List<DerivedFactor> factors) {
        boolean success = derivedFactorService.addDerivedFactors(factors);
        if (success) {
            return ResponseEntity.ok("批量添加成功");
        } else {
            return ResponseEntity.badRequest().body("参数错误或添加失败");
        }
    }
    
    /**
     * 添加衍生因子接口
     * 接口名称：15Add_derivative_factor
     * 
     * @param request 添加衍生因子请求
     * @return 添加结果
     */
    @PostMapping("/add")
    public ResponseEntity<ApiResponse<AddDerivedFactorResponse>> addDerivedFactor(
            @Valid @RequestBody AddDerivedFactorRequest request) {
        try {
            AddDerivedFactorResponse response = derivedFactorService.addDerivedFactor(request);
            return ResponseEntity.ok(ApiResponse.success("添加成功", response));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(ApiResponse.error("服务器内部错误"));
        }
    }

    @GetMapping("/data-types")
    public ResponseEntity<ApiResponse<List<String>>> getDerivedFactorDataTypes() {
        try {
            List<String> dataTypes = derivedFactorService.getDerivedFactorDataTypes();
            return ResponseEntity.ok(ApiResponse.success(dataTypes));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(ApiResponse.error("查询失败"));
        }
    }
}
