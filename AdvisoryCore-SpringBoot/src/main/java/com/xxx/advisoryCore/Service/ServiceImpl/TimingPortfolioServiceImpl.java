package com.xxx.advisoryCore.Service.ServiceImpl;

import com.xxx.advisoryCore.Entity.TimingPortfolio;
import com.xxx.advisoryCore.Mapper.TimingPortfolioMapper;
import com.xxx.advisoryCore.Service.TimingPortfolioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TimingPortfolioServiceImpl implements TimingPortfolioService {

    @Autowired
    private TimingPortfolioMapper timingPortfolioMapper;

    @Override
    public int insertTimingPortfolio(TimingPortfolio timingPortfolio) {
        try {
            return timingPortfolioMapper.insertTimingPortfolio(timingPortfolio);
        } catch (Exception e) {
            // 可记录日志
            return 0;
        }
    }

    @Override
    public java.util.List<TimingPortfolio> getAllTimingPortfolios() {
        try {
            return timingPortfolioMapper.selectAllTimingPortfolios();
        } catch (Exception e) {
            return java.util.Collections.emptyList();
        }
    }
} 