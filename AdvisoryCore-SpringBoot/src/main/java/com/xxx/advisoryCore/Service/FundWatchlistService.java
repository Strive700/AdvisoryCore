package com.xxx.advisoryCore.Service;

import java.util.List;
import java.util.Map;

public interface FundWatchlistService {
   Map<String, Object> getAlertedFundWatchlistDetails(int pageNum, int pageSize);
    boolean deleteById(Integer watchlistId);
}
