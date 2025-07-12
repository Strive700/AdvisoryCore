package com.xxx.advisoryCore.Service;

import com.xxx.advisoryCore.Dto.AddDerivedFactorRequest;
import com.xxx.advisoryCore.Dto.AddDerivedFactorResponse;
import com.xxx.advisoryCore.Entity.DerivedFactor;

import java.util.List;
import java.util.Map;

public interface DerivedFactorService {
    boolean addDerivedFactors(List<DerivedFactor> factors);
    
    // 添加衍生因子（新接口）
    AddDerivedFactorResponse addDerivedFactor(AddDerivedFactorRequest request);

    Map<String,Map<String,Object>> getDerivedFactorDataTypes();
}
