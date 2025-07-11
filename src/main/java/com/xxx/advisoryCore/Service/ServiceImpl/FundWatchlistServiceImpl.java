package com.xxx.advisoryCore.Service.ServiceImpl;


import com.xxx.advisoryCore.Mapper.FundWatchlistMapper;
import com.xxx.advisoryCore.Service.FundWatchlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
public class FundWatchlistServiceImpl implements FundWatchlistService {

    @Autowired
    private FundWatchlistMapper fundWatchlistMapper;

    @Override
    public List<Map<String, Object>> getAlertedFundWatchlistDetails() {
        try {
            List<Map<String, Object>> result = fundWatchlistMapper.selectFundWatchlistDetails();
            return result != null ? result : Collections.emptyList();
        } catch (Exception e) {
            return Collections.emptyList();
        }
    }
    @Override
    public boolean deleteById(Integer watchlistId) {
        if (watchlistId == null) {
            throw new IllegalArgumentException("watchlistId 不能为空");
        }
        int rows = fundWatchlistMapper.deleteById(watchlistId);
        return rows > 0;
    }
}
