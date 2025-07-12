package com.xxx.advisoryCore.Service;

import com.xxx.advisoryCore.Dto.FundWithCoreMetricDTO;

import java.util.List;

public interface FundIndexMappingService {
    /**
     * 根据指数名称查询所有包含该指数的基金详细信息（含核心指标）
     * @param indexName 指数名称
     * @return 基金+核心指标信息列表
     */
    List<FundWithCoreMetricDTO> findFundsByIndexName(String indexName);
} 