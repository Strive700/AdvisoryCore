package com.xxx.advisoryCore.Service.ServiceImpl;

import com.xxx.advisoryCore.Dto.SetFundAlertRequest;
import com.xxx.advisoryCore.Entity.FundAlert;
import com.xxx.advisoryCore.Mapper.FundAlertMapper;
import com.xxx.advisoryCore.Service.FundAlertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class FundAlertServiceImpl implements FundAlertService {

    @Autowired
    private FundAlertMapper fundAlertMapper;

    @Override
    public Map<String, Object> setWarning(SetFundAlertRequest request) {
        if (request.getFundCode() == null || request.getAlertParam() == null || request.getThreshold() == null) {
            throw new IllegalArgumentException("fundCode, alertParam 和 threshold 均为必填项");
        }

        FundAlert alert = new FundAlert();
        alert.setFundCode(request.getFundCode());
        alert.setAlertParam(request.getAlertParam());
        alert.setThreshold(request.getThreshold());
        alert.setDescription(request.getDescription());
        alert.setStatus(0);
        alert.setCreateTime(new Date());

        int rows = fundAlertMapper.insertAlert(alert);
        Map<String, Object> result = new HashMap<>();
        result.put("message", "预警参数已成功设置");
        result.put("alertId", alert.getAlertId());
        return result;
    }
}

