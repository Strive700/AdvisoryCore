package com.xxx.advisoryCore.Mapper;

import com.xxx.advisoryCore.Entity.CategoryFactor;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface FundFactorMappingMapper {
    /**
     * 通过基金ID查询大类因子信息（factorNames为JSON数组）
     * @param fundId 基金ID
     * @return 大类因子列表
     */
    List<CategoryFactor> findCategoryFactorsByFundId(@Param("fundId") String fundId);
} 