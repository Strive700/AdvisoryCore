package com.xxx.advisoryCore.Mapper;

import com.xxx.advisoryCore.Entity.FofPortfolio;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FofPortfolioMapper {
    /**
     * 插入FOF组合
     * @param fofPortfolio FOF组合对象
     * @return 影响行数
     */
    int insertFofPortfolio(FofPortfolio fofPortfolio);

    /**
     * 查询所有FOF组合
     * @return FOF组合列表
     */
    java.util.List<FofPortfolio> selectAllFofPortfolios();
} 