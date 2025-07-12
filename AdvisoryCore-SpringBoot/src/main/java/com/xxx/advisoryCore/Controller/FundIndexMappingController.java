package com.xxx.advisoryCore.Controller;

import com.xxx.advisoryCore.Dto.FundWithCoreMetricDTO;
import com.xxx.advisoryCore.Service.FundIndexMappingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class FundIndexMappingController {

    @Autowired
    private FundIndexMappingService fundIndexMappingService;

    /**
     * 根据指数名称查询所有包含该指数的基金详细信息（含核心指标）
     * @param indexName 指数名称
     * @return 基金+核心指标信息列表
     */
    @GetMapping("/fundIndexMapping/fundIdsByIndexName")
    public List<FundWithCoreMetricDTO> getFundsByIndexName(@RequestParam String indexName) {
        System.out.println("调用接口: getFundsByIndexName(), indexName=" + indexName);
        return fundIndexMappingService.findFundsByIndexName(indexName);
    }
} 