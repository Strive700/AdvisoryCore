package com.xxx.advisoryCore.Mapper;

import com.xxx.advisoryCore.Entity.Portfolio;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PortfolioMapper {
    /**
     * 新增组合
     * @param portfolio 组合对象
     * @return 影响行数
     */
    int insertPortfolio(Portfolio portfolio);

    /**
     * 查询所有组合
     * @return 组合列表
     */
    java.util.List<Portfolio> selectAllPortfolios();
} 