package com.xxx.advisoryCore.Mapper;

import com.xxx.advisoryCore.Entity.TimingPortfolio;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TimingPortfolioMapper {
    /**
     * 新增择时基金组合
     * @param timingPortfolio 组合对象
     * @return 影响行数
     */
    int insertTimingPortfolio(TimingPortfolio timingPortfolio);

    /**
     * 查询所有择时基金组合
     * @return 择时基金组合列表
     */
    java.util.List<TimingPortfolio> selectAllTimingPortfolios();
} 