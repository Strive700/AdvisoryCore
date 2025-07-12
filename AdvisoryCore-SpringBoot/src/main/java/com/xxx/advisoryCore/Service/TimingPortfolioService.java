package com.xxx.advisoryCore.Service;

import com.xxx.advisoryCore.Entity.TimingPortfolio;

public interface TimingPortfolioService {
    /**
     * 新增择时基金组合
     * @param timingPortfolio 组合对象
     * @return 影响行数
     */
    int insertTimingPortfolio(TimingPortfolio timingPortfolio);

    /**
     * 获取所有择时基金组合
     * @return 择时基金组合列表
     */
    java.util.List<TimingPortfolio> getAllTimingPortfolios();
} 