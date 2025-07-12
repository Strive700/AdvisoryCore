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
import java.util.Map;

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
        definition.setName(request.getName()); // 可根据业务生成名称
        definition.setDisplayName(request.getDisplayName());
        definition.setFactorType(request.getFactorType());
        definition.setDataType(request.getDataType()); // 可根据业务传参
        definition.setCalcMethod(request.getCalcMethod()); // 可根据业务传参
        definition.setUpdateFrequency(request.getUpdateFrequency()); // 可根据业务传参
        definition.setEnabled(true);

        // 2. 插入定义，获取自增ID
        derivedFactorMapper.insertDerivedFactorDefinition(definition);
        int derivedId = definition.getDefinitionid();
        System.out.println("<UNK>" + derivedId);
        // 3. 构建明细
        List<DerivedFactor> factors = new ArrayList<>();
        for (AddDerivedFactorRequest.BaseFactor baseFactor : request.getFactors()) {
            DerivedFactor factor = new DerivedFactor();
            factor.setDerivedId(derivedId);
            factor.setBaseId(baseFactor.getBaseId());
            factor.setWeight(baseFactor.getWeight());
            factors.add(factor);
        }
        System.out.println("<UNK>" + factors.size());
        // 4. 批量插入明细
        int insertedCount = derivedFactorMapper.insertDerivedFactors(factors);

        // 5. 返回
        return new AddDerivedFactorResponse(derivedId, insertedCount);
    }

    @Override
    public Map<String,Map<String,Object>> getDerivedFactorDataTypes() {
        System.out.println("===== getDerivedFactorDataTypes 调用 =====");
        System.out.println("调用时间: " + java.time.LocalDateTime.now());

        Map<String, Map<String, Object>> resultMap = null;
        try {
            resultMap = factorMapper.selectDerivedFactorDataTypes();

            if (resultMap == null) {
                System.out.println("查询结果为 null");
                return null;
            }

            System.out.println("结果总数: " + resultMap.size());
            System.out.println("Key 列表: " + resultMap.keySet());



        } catch (Exception e) {
            System.out.println("查询派生因子数据类型时发生异常！");
            System.out.println("异常类型: " + e.getClass().getName());
            System.out.println("异常信息: " + e.getMessage());
            e.printStackTrace(); // 打印完整堆栈信息
        }

        System.out.println("===== getDerivedFactorDataTypes 结束 =====");
        return resultMap;
    }

}