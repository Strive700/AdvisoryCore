package com.xxx.advisoryCore.Service;

import com.xxx.advisoryCore.Dto.SetFundAlertRequest;

import java.util.Map;

public interface FundAlertService {
    Map<String, Object> setWarning(SetFundAlertRequest request);

}