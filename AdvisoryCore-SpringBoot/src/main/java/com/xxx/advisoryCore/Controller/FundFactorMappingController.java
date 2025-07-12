package com.xxx.advisoryCore.Controller;

import com.xxx.advisoryCore.Entity.CategoryFactor;
import com.xxx.advisoryCore.Service.FundFactorMappingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class FundFactorMappingController {
    @Autowired
    private FundFactorMappingService fundFactorMappingService;

    /**
     * 通过基金ID查询大类因子信息
     * @param fundId 基金ID
     * @return 大类因子列表
     */
    @GetMapping("/category-factors/by-fund-id")
    public List<CategoryFactor> getCategoryFactorsByFundId(@RequestParam String fundId) {
        System.out.println("调用接口: getCategoryFactorsByFundId(), fundId=" + fundId);
        return fundFactorMappingService.findCategoryFactorsByFundId(fundId);
    }
} 