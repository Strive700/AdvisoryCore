package com.xxx.advisoryCore.Mapper;

import com.xxx.advisoryCore.Entity.AssetAllocation;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AssetAllocationMapper {
    /**
     * 插入策略组合
     * @param assetAllocation 策略组合对象
     * @return 影响行数
     */
    int insertAssetAllocation(AssetAllocation assetAllocation);
} 