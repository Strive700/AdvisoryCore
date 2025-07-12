package com.xxx.advisoryCore.Service;

import com.xxx.advisoryCore.Entity.Portfolio;

public interface PortfolioService {
    /**
     * 新增组合
     * @param portfolio 组合对象
     * @return 影响行数
     */
    int insertPortfolio(Portfolio portfolio);

    /**
     * 获取所有组合
     * @return 组合列表
     */
    java.util.List<Portfolio> getAllPortfolios();
} 