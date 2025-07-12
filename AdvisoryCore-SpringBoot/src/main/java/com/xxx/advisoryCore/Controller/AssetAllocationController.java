package com.xxx.advisoryCore.Controller;

import com.xxx.advisoryCore.Entity.AssetAllocation;
import com.xxx.advisoryCore.Service.AssetAllocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/asset-allocation")
public class AssetAllocationController {

    @Autowired
    private AssetAllocationService assetAllocationService;

    /**
     * 添加策略组合
     * @param assetAllocation 策略组合对象（JSON）
     * @return 插入结果
     */
    @PostMapping("")
    public ResponseEntity<?> addAssetAllocation(@RequestBody AssetAllocation assetAllocation) {
        System.out.println("调用接口: addAssetAllocation(), body=" + assetAllocation);
        int result = assetAllocationService.insertAssetAllocation(assetAllocation);
        if (result > 0) {
            return ResponseEntity.status(HttpStatus.CREATED).body("插入成功");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("插入失败");
        }
    }
} 