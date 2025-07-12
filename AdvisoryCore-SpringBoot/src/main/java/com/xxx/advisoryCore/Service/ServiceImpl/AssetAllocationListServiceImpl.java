package com.xxx.advisoryCore.Service.ServiceImpl;

import com.xxx.advisoryCore.Entity.AssetAllocationList;
import com.xxx.advisoryCore.Mapper.AssetAllocationListMapper;
import com.xxx.advisoryCore.Service.AssetAllocationListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AssetAllocationListServiceImpl implements AssetAllocationListService {

    @Autowired
    private AssetAllocationListMapper assetAllocationListMapper;

    @Override
    public int insertAssetAllocationList(AssetAllocationList allocationList) {
        return assetAllocationListMapper.insertAssetAllocationList(allocationList);
    }
} 