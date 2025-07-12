package com.xxx.advisoryCore.Service.ServiceImpl;

import com.xxx.advisoryCore.Entity.CategoryFactor;
import com.xxx.advisoryCore.Mapper.FundFactorMappingMapper;
import com.xxx.advisoryCore.Service.FundFactorMappingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FundFactorMappingServiceImpl implements FundFactorMappingService {
    @Autowired
    private FundFactorMappingMapper fundFactorMappingMapper;

    @Override
    public List<CategoryFactor> findCategoryFactorsByFundId(String fundId) {
        return fundFactorMappingMapper.findCategoryFactorsByFundId(fundId);
    }
} 