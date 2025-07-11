package com.xxx.advisoryCore.Service.ServiceImpl;

import com.xxx.advisoryCore.Dto.AddDerivedFactorRequest;
import com.xxx.advisoryCore.Dto.AddDerivedFactorResponse;
import com.xxx.advisoryCore.Entity.DerivedFactor;
import com.xxx.advisoryCore.Mapper.DerivedFactorMapper;
import com.xxx.advisoryCore.Service.DerivedFactorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class DerivedFactorServiceImpl implements DerivedFactorService {

    @Autowired
    private DerivedFactorMapper derivedFactorMapper;

    @Override
    public boolean addDerivedFactors(List<DerivedFactor> factors) {
        if (factors == null || factors.isEmpty()) {
            return false;
        }
        return derivedFactorMapper.insertDerivedFactors(factors) > 0;
    }
    
    @Override
    @Transactional
    public AddDerivedFactorResponse addDerivedFactor(AddDerivedFactorRequest request) {
        // 1. 参数验证
        if (request == null || request.getDerivedId() == null || 
            request.getFactors() == null || request.getFactors().isEmpty()) {
            throw new IllegalArgumentException("请求参数不能为空");
        }
        
        // 2. 删除已存在的相同衍生因子记录（可选，根据业务需求决定）
        derivedFactorMapper.deleteByDerivedId(request.getDerivedId());
        
        // 3. 构建DerivedFactor实体列表
        List<DerivedFactor> factors = new ArrayList<>();
        for (AddDerivedFactorRequest.BaseFactor baseFactor : request.getFactors()) {
            DerivedFactor factor = new DerivedFactor();
            factor.setDerivedId(request.getDerivedId());
            factor.setBaseId(baseFactor.getBaseId());
            factor.setWeight(baseFactor.getWeight());
            factors.add(factor);
        }
        
        // 4. 批量插入
        int insertedCount = derivedFactorMapper.insertDerivedFactors(factors);
        
        // 5. 返回结果
        return new AddDerivedFactorResponse(request.getDerivedId(), insertedCount);
    }
}