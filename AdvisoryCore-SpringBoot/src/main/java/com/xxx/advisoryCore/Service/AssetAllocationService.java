package com.xxx.advisoryCore.Service;

import com.xxx.advisoryCore.Entity.AssetAllocation;

public interface AssetAllocationService {
    /**
     * 插入策略组合
     * @param assetAllocation 策略组合对象
     * @return 影响行数
     */
    int insertAssetAllocation(AssetAllocation assetAllocation);
} 