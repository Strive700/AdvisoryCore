package com.xxx.advisoryCore.Service;

import java.util.List;
import java.util.Map;

public interface FundWatchlistService {
   List<Map<String, Object>> getAlertedFundWatchlistDetails();
    boolean deleteById(Integer watchlistId);
}
