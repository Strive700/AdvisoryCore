package com.xxx.advisoryCore.Service;

import com.xxx.advisoryCore.Entity.CategoryFactor;

import java.util.List;

public interface FundFactorMappingService {
    /**
     * 通过基金ID查询大类因子信息
     * @param fundId 基金ID
     * @return 大类因子列表
     */
    List<CategoryFactor> findCategoryFactorsByFundId(String fundId);
} 