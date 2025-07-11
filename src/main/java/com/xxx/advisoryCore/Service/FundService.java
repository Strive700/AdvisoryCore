package com.xxx.advisoryCore.Service;


import com.xxx.advisoryCore.Dto.FundQueryRequest;

import java.util.Map;

public interface FundService {
    Map<String, Object> selectFunds(FundQueryRequest request) ;

    Map<String, Object> selectFund_image(Map<String, Object> request);
}
