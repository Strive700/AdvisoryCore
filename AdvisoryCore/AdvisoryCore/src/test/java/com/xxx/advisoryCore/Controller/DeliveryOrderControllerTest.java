package com.xxx.advisoryCore.Controller;

import com.xxx.advisoryCore.Dto.DeliveryOrderQueryRequest;
import com.xxx.advisoryCore.Dto.DeliveryOrderResponse;
import com.xxx.advisoryCore.Dto.PageResponse;
import com.xxx.advisoryCore.Service.DeliveryOrderService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Date;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(DeliveryOrderController.class)
public class DeliveryOrderControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private DeliveryOrderService deliveryOrderService;

    @Test
    public void testQueryDeliveryOrders() throws Exception {
        // 准备测试数据
        DeliveryOrderResponse response = new DeliveryOrderResponse();
        response.setDeliveryId("DELIVERY20250629001");
        response.setTradeid(1007);
        response.setCustomerId(10001);
        response.setPortfolioId(101);
        response.setFundCode("FUND_X");
        response.setFundName("基金X");
        response.setTradeType("BUY");
        response.setExecutedShares(new BigDecimal("100.00"));
        response.setExecutedAmount(new BigDecimal("10000.00"));
        response.setExecutedPrice(new BigDecimal("100.00"));
        response.setCommission(new BigDecimal("10.00"));
        response.setTax(new BigDecimal("0.50"));
        response.setExecutionTime(new Date());
        response.setStatus("COMPLETED");
        response.setSourceSystem("投顾后台系统");

        PageResponse<DeliveryOrderResponse> pageResponse = new PageResponse<>(
                150L, 1, 10, Arrays.asList(response)
        );

        when(deliveryOrderService.queryDeliveryOrders(any(DeliveryOrderQueryRequest.class)))
                .thenReturn(pageResponse);

        // 执行测试
        mockMvc.perform(get("/api/delivery_orders")
                        .param("page", "1")
                        .param("pageSize", "10")
                        .param("customerId", "10001")
                        .param("portfolioId", "101")
                        .param("fundCode", "FUND_X")
                        .param("tradeType", "BUY"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(0))
                .andExpect(jsonPath("$.msg").value("成功"))
                .andExpect(jsonPath("$.data.total").value(150))
                .andExpect(jsonPath("$.data.page").value(1))
                .andExpect(jsonPath("$.data.pageSize").value(10))
                .andExpect(jsonPath("$.data.list[0].deliveryId").value("DELIVERY20250629001"))
                .andExpect(jsonPath("$.data.list[0].tradeid").value(1007))
                .andExpect(jsonPath("$.data.list[0].customerId").value(10001));
    }

    @Test
    public void testQueryDeliveryOrdersWithInvalidParams() throws Exception {
        // 测试无效参数时的默认值处理
        PageResponse<DeliveryOrderResponse> pageResponse = new PageResponse<>(
                0L, 1, 10, Arrays.asList()
        );

        when(deliveryOrderService.queryDeliveryOrders(any(DeliveryOrderQueryRequest.class)))
                .thenReturn(pageResponse);

        // 执行测试 - 传入无效的分页参数
        mockMvc.perform(get("/api/delivery_orders")
                        .param("page", "-1")
                        .param("pageSize", "1000"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(0));
    }
} 