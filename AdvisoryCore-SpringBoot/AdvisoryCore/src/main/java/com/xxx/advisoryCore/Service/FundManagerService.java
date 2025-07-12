package com.xxx.advisoryCore.Service;

import com.xxx.advisoryCore.Dto.FundManagerQueryRequest;

import java.util.Map;

public interface FundManagerService {

    Map<String, Object> queryByCondition(FundManagerQueryRequest request);
}
