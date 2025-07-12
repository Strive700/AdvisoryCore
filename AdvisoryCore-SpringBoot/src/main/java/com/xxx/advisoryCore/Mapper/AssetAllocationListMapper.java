package com.xxx.advisoryCore.Mapper;

import com.xxx.advisoryCore.Entity.AssetAllocationList;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AssetAllocationListMapper {
    /**
     * 插入大类资产配比列表
     * @param allocationList 配比对象
     * @return 影响行数
     */
    int insertAssetAllocationList(AssetAllocationList allocationList);
} 