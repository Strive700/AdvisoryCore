package com.xxx.advisoryCore.Service.ServiceImpl;

import com.xxx.advisoryCore.Dto.SettlementOrderRequest;
import com.xxx.advisoryCore.Mapper.SettlementOrdersMapper;
import com.xxx.advisoryCore.Service.SettlementOrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SettlementOrdersServiceImpl implements SettlementOrdersService {

    @Autowired
    private SettlementOrdersMapper settlementOrdersMapper;

    @Override
    public void saveSettlementOrder(SettlementOrderRequest request) {
        settlementOrdersMapper.insertSettlementOrder(request);
    }
} 