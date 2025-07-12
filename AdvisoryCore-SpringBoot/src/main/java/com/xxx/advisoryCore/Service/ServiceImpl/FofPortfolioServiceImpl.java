package com.xxx.advisoryCore.Service.ServiceImpl;

import com.xxx.advisoryCore.Entity.FofPortfolio;
import com.xxx.advisoryCore.Mapper.FofPortfolioMapper;
import com.xxx.advisoryCore.Service.FofPortfolioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FofPortfolioServiceImpl implements FofPortfolioService {

    @Autowired
    private FofPortfolioMapper fofPortfolioMapper;

    @Override
    public int insertFofPortfolio(FofPortfolio fofPortfolio) {
        return fofPortfolioMapper.insertFofPortfolio(fofPortfolio);
    }

    @Override
    public java.util.List<FofPortfolio> getAllFofPortfolios() {
        try {
            return fofPortfolioMapper.selectAllFofPortfolios();
        } catch (Exception e) {
            return java.util.Collections.emptyList();
        }
    }
} 