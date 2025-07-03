package com.xxx.advisoryCore.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.xxx.advisoryCore.Dto.BulkRejectTradeOrderRequest;
import com.xxx.advisoryCore.Dto.BulkRejectTradeOrderResponse;
import com.xxx.advisoryCore.Service.TradeOrderService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(TradeOrderController.class)
public class TradeOrderControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TradeOrderService tradeOrderService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testBulkRejectTradeOrders_Success() throws Exception {
        // 准备测试数据
        BulkRejectTradeOrderRequest request = new BulkRejectTradeOrderRequest();
        request.setTrade_ids(Arrays.asList(1004, 1005));
        request.setReject_reason("当前市场波动较大，不宜执行此交易");
        request.setOperator("交易员赵六");

        BulkRejectTradeOrderResponse response = new BulkRejectTradeOrderResponse(2, Collections.emptyList());

        when(tradeOrderService.bulkRejectTradeOrders(any(BulkRejectTradeOrderRequest.class)))
                .thenReturn(response);

        // 执行测试
        mockMvc.perform(post("/api/trade/orders/bulk_reject")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(0))
                .andExpect(jsonPath("$.msg").value("批量交易指令已驳回"))
                .andExpect(jsonPath("$.data.rejected_count").value(2))
                .andExpect(jsonPath("$.data.failed_ids").isArray())
                .andExpect(jsonPath("$.data.failed_ids").isEmpty());
    }

    @Test
    public void testBulkRejectTradeOrders_EmptyTradeIds() throws Exception {
        // 准备测试数据
        BulkRejectTradeOrderRequest request = new BulkRejectTradeOrderRequest();
        request.setTrade_ids(Collections.emptyList());
        request.setReject_reason("当前市场波动较大，不宜执行此交易");
        request.setOperator("交易员赵六");

        // 执行测试
        mockMvc.perform(post("/api/trade/orders/bulk_reject")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(400))
                .andExpect(jsonPath("$.msg").value("交易指令ID列表不能为空"));
    }

    @Test
    public void testBulkRejectTradeOrders_EmptyRejectReason() throws Exception {
        // 准备测试数据
        BulkRejectTradeOrderRequest request = new BulkRejectTradeOrderRequest();
        request.setTrade_ids(Arrays.asList(1004, 1005));
        request.setReject_reason("");
        request.setOperator("交易员赵六");

        // 执行测试
        mockMvc.perform(post("/api/trade/orders/bulk_reject")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(400))
                .andExpect(jsonPath("$.msg").value("驳回原因不能为空"));
    }

    @Test
    public void testBulkRejectTradeOrders_WithFailedIds() throws Exception {
        // 准备测试数据
        BulkRejectTradeOrderRequest request = new BulkRejectTradeOrderRequest();
        request.setTrade_ids(Arrays.asList(1004, 1005, 1006));
        request.setReject_reason("当前市场波动较大，不宜执行此交易");
        request.setOperator("交易员赵六");

        BulkRejectTradeOrderResponse response = new BulkRejectTradeOrderResponse(2, Arrays.asList(1006));

        when(tradeOrderService.bulkRejectTradeOrders(any(BulkRejectTradeOrderRequest.class)))
                .thenReturn(response);

        // 执行测试
        mockMvc.perform(post("/api/trade/orders/bulk_reject")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(0))
                .andExpect(jsonPath("$.data.rejected_count").value(2))
                .andExpect(jsonPath("$.data.failed_ids").isArray())
                .andExpect(jsonPath("$.data.failed_ids[0]").value(1006));
    }
} 