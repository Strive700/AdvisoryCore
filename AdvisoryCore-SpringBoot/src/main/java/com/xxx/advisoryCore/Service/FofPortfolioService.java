package com.xxx.advisoryCore.Service;

import com.xxx.advisoryCore.Entity.FofPortfolio;

import java.util.List;

public interface FofPortfolioService {
    /**
     * 插入FOF组合
     * @param fofPortfolio FOF组合对象
     * @return 影响行数
     */
    int insertFofPortfolio(FofPortfolio fofPortfolio);
    /**
     * 获取所有FOF组合
     * @return FOF组合列表
     */
    List<FofPortfolio> getAllFofPortfolios();
} 