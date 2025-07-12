package com.xxx.advisoryCore.Controller;

import com.xxx.advisoryCore.Dto.SettlementOrderRequest;
import com.xxx.advisoryCore.Service.SettlementOrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/settlement-orders")
public class SettlementOrdersController {

    @Autowired
    private SettlementOrdersService settlementOrdersService;

    @PostMapping("/save")
    public String saveSettlementOrder(@RequestBody SettlementOrderRequest request) {
        settlementOrdersService.saveSettlementOrder(request);
        return "success";
    }
}
