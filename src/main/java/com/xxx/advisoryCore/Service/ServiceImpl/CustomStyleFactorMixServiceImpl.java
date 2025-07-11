package com.xxx.advisoryCore.Service.ServiceImpl;

import com.xxx.advisoryCore.Dto.AddCustomStyleFactorRequest;
import com.xxx.advisoryCore.Dto.AddCustomStyleFactorResponse;
import com.xxx.advisoryCore.Entity.CustomStyleFactorMix;
import com.xxx.advisoryCore.Mapper.CustomStyleFactorMixMapper;
import com.xxx.advisoryCore.Service.CustomStyleFactorMixService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class CustomStyleFactorMixServiceImpl implements CustomStyleFactorMixService {

    @Autowired
    private CustomStyleFactorMixMapper customStyleFactorMixMapper;

    @Override
    public boolean addCustomStyleFactorMixes(List<CustomStyleFactorMix> mixes) {
        if (mixes == null || mixes.isEmpty()) {
            return false;
        }
        return customStyleFactorMixMapper.insertCustomStyleFactorMixes(mixes) > 0;
    }
    
    @Override
    @Transactional
    public AddCustomStyleFactorResponse addCustomStyleFactor(AddCustomStyleFactorRequest request) {
        // 1. 参数验证
        if (request == null || request.getStyleFactorId() == null || 
            request.getFactors() == null || request.getFactors().isEmpty()) {
            throw new IllegalArgumentException("请求参数不能为空");
        }
        
        // 2. 删除已存在的相同风格因子记录（可选，根据业务需求决定）
        customStyleFactorMixMapper.deleteByStyleFactorId(request.getStyleFactorId());
        
        // 3. 构建CustomStyleFactorMix实体列表
        List<CustomStyleFactorMix> mixes = new ArrayList<>();
        for (AddCustomStyleFactorRequest.DerivedFactor derivedFactor : request.getFactors()) {
            CustomStyleFactorMix mix = new CustomStyleFactorMix();
            mix.setStyleFactorId(request.getStyleFactorId());
            mix.setFactorId(derivedFactor.getFactorId());
            mix.setWeight(derivedFactor.getWeight());
            mix.setNormalized(derivedFactor.getNormalized());
            mixes.add(mix);
        }
        
        // 4. 批量插入
        int insertedCount = customStyleFactorMixMapper.insertCustomStyleFactorMixes(mixes);
        
        // 5. 返回结果
        return new AddCustomStyleFactorResponse(request.getStyleFactorId(), insertedCount);
    }
} 