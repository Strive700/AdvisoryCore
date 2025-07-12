package com.xxx.advisoryCore.Controller;

import com.xxx.advisoryCore.Entity.AssetAllocationList;
import com.xxx.advisoryCore.Service.AssetAllocationListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/asset-allocation-list")
public class AssetAllocationListController {

    @Autowired
    private AssetAllocationListService assetAllocationListService;

    /**
     * 添加大类资产配比列表
     * @param allocationList 配比对象（JSON）
     * @return 插入结果
     */
    @PostMapping("")
    public ResponseEntity<?> addAssetAllocationList(@RequestBody AssetAllocationList allocationList) {
        System.out.println("调用接口: addAssetAllocationList(), body=" + allocationList);
        int result = assetAllocationListService.insertAssetAllocationList(allocationList);
        if (result > 0) {
            return ResponseEntity.status(HttpStatus.CREATED).body("插入成功");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("插入失败");
        }
    }
} 