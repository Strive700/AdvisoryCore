package com.xxx.advisoryCore.Service;

import com.xxx.advisoryCore.Dto.FundQueryRequest;
import com.xxx.advisoryCore.Dto.FundQueryResponse;

import java.util.Map;

public interface FundService {

    FundQueryResponse queryFundsWithJoin(FundQueryRequest request);

    Map<String, Object> selectFund_image(Map<String, Object> request);
}
