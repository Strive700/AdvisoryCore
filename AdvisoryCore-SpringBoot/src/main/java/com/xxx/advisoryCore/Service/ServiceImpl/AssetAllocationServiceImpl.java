package com.xxx.advisoryCore.Service.ServiceImpl;

import com.xxx.advisoryCore.Entity.AssetAllocation;
import com.xxx.advisoryCore.Mapper.AssetAllocationMapper;
import com.xxx.advisoryCore.Service.AssetAllocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AssetAllocationServiceImpl implements AssetAllocationService {

    @Autowired
    private AssetAllocationMapper assetAllocationMapper;

    @Override
    public int insertAssetAllocation(AssetAllocation assetAllocation) {
        return assetAllocationMapper.insertAssetAllocation(assetAllocation);
    }
} 