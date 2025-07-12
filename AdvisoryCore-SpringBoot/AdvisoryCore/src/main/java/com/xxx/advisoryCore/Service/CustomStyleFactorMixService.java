package com.xxx.advisoryCore.Service;

import com.xxx.advisoryCore.Dto.AddCustomStyleFactorRequest;
import com.xxx.advisoryCore.Dto.AddCustomStyleFactorResponse;
import com.xxx.advisoryCore.Entity.CustomStyleFactorMix;

import java.util.List;

public interface CustomStyleFactorMixService {
    // 批量添加风格因子组合
    boolean addCustomStyleFactorMixes(List<CustomStyleFactorMix> mixes);
    
    // 添加风格因子（新接口）
    AddCustomStyleFactorResponse addCustomStyleFactor(AddCustomStyleFactorRequest request);
} 