package com.xxx.advisoryCore.Service.ServiceImpl;

import com.xxx.advisoryCore.Entity.Portfolio;
import com.xxx.advisoryCore.Mapper.PortfolioMapper;
import com.xxx.advisoryCore.Service.PortfolioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PortfolioServiceImpl implements PortfolioService {

    @Autowired
    private PortfolioMapper portfolioMapper;

    @Override
    public int insertPortfolio(Portfolio portfolio) {
        try {
            return portfolioMapper.insertPortfolio(portfolio);
        } catch (Exception e) {
            // 可记录日志
            return 0;
        }
    }

    @Override
    public java.util.List<Portfolio> getAllPortfolios() {
        try {
            return portfolioMapper.selectAllPortfolios();
        } catch (Exception e) {
            return java.util.Collections.emptyList();
        }
    }
} 