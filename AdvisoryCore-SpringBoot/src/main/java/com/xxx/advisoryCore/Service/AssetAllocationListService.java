package com.xxx.advisoryCore.Service;

import com.xxx.advisoryCore.Entity.AssetAllocationList;

public interface AssetAllocationListService {
    /**
     * 插入大类资产配比列表
     * @param allocationList 配比对象
     * @return 影响行数
     */
    int insertAssetAllocationList(AssetAllocationList allocationList);
} 