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
    public boolean deleteById(Integer watchlistId) {
        if (watchlistId == null) {
            throw new IllegalArgumentException("watchlistId 不能为空");
        }
        int rows = fundWatchlistMapper.deleteById(watchlistId);
        return rows > 0;
    }

    @Override
    public Map<String, Object> getAlertedFundWatchlistDetails(int pageNum, int pageSize) {
        int offset = (pageNum - 1) * pageSize;
        List<Map<String, Object>> list = fundWatchlistMapper.selectFundWatchlistDetailsPaged(offset, pageSize);
        int total = fundWatchlistMapper.countFundWatchlistDetails();
        Map<String, Object> result = new java.util.HashMap<>();
        result.put("list", list);
        result.put("total", total);
        return result;
    }
}
