package com.xxx.advisoryCore.Service.ServiceImpl;

import com.xxx.advisoryCore.Dto.AddDerivedFactorRequest;
import com.xxx.advisoryCore.Dto.AddDerivedFactorResponse;
import com.xxx.advisoryCore.Entity.DerivedFactor;
import com.xxx.advisoryCore.Entity.FactorDefinition;
import com.xxx.advisoryCore.Mapper.DerivedFactorMapper;
import com.xxx.advisoryCore.Mapper.FactorMapper;
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

    @Autowired
    private FactorMapper factorMapper;

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
        // 1. 构造衍生因子定义
        FactorDefinition definition = new FactorDefinition();
        definition.setName("新衍生因子"); // 可根据业务生成名称
        definition.setDisplayName("新衍生因子");
        definition.setFactorType("衍生因子");
        definition.setDataType("double"); // 可根据业务传参
        definition.setCalcMethod("组合加权"); // 可根据业务传参
        definition.setUpdateFrequency("每日"); // 可根据业务传参
        definition.setEnabled(true);

        // 2. 插入定义，获取自增ID
        derivedFactorMapper.insertDerivedFactorDefinition(definition);
        int derivedId = definition.getDefinitionid();

        // 3. 构建明细
        List<DerivedFactor> factors = new ArrayList<>();
        for (AddDerivedFactorRequest.BaseFactor baseFactor : request.getFactors()) {
            DerivedFactor factor = new DerivedFactor();
            factor.setDerivedId(derivedId);
            factor.setBaseId(baseFactor.getBaseId());
            factor.setWeight(baseFactor.getWeight());
            factors.add(factor);
        }

        // 4. 批量插入明细
        int insertedCount = derivedFactorMapper.insertDerivedFactors(factors);

        // 5. 返回
        return new AddDerivedFactorResponse(derivedId, insertedCount);
    }

    @Override
    public List<String> getDerivedFactorDataTypes() {
        return factorMapper.selectDerivedFactorDataTypes();
    }
}