package com.xxx.advisoryCore.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.xxx.advisoryCore.Dto.FundQueryRequest;
import com.xxx.advisoryCore.Dto.FundQueryResponse;
import com.xxx.advisoryCore.Service.FundService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Date;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(FundsController.class)
public class FundsControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private FundService fundService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testQueryFundsWithJoin() throws Exception {
        // 准备测试数据
        FundQueryResponse.FundRecord record = new FundQueryResponse.FundRecord();
        record.setId(1);
        record.setCode("000001");
        record.setName("中证500ETF");
        record.setEstablishedDate("2017-05-15");
        record.setScale(1200000000L);
        record.setManagerTenure(3.5);
        record.setYieldThisYear(0.123);
        record.setFeeRate(0.015);
        record.setStyle("价值型");

        FundQueryResponse response = FundQueryResponse.success(132, Arrays.asList(record));

        when(fundService.queryFundsWithJoin(any(FundQueryRequest.class)))
                .thenReturn(response);

        // 构建请求数据
        FundQueryRequest request = new FundQueryRequest();
        request.setPage(1);
        request.setPageSize(10);
        
        FundQueryRequest.DateRange establishedDate = new FundQueryRequest.DateRange();
        establishedDate.setFrom(new Date());
        establishedDate.setTo(new Date());
        request.setEstablishedDate(establishedDate);
        
        FundQueryRequest.LongRange scale = new FundQueryRequest.LongRange();
        scale.setMin(100000000L);
        scale.setMax(1000000000L);
        request.setScale(scale);
        
        FundQueryRequest.DoubleRange managerTenure = new FundQueryRequest.DoubleRange();
        managerTenure.setMin(1.0);
        managerTenure.setMax(5.0);
        request.setManagerTenure(managerTenure);
        
        FundQueryRequest.DoubleRange yieldThisYear = new FundQueryRequest.DoubleRange();
        yieldThisYear.setMin(0.05);
        yieldThisYear.setMax(0.2);
        request.setYieldThisYear(yieldThisYear);
        
        FundQueryRequest.DoubleRange feeRate = new FundQueryRequest.DoubleRange();
        feeRate.setMin(0.005);
        feeRate.setMax(0.02);
        request.setFeeRate(feeRate);
        
        request.setStyle("价值型");
        request.setCode("000001");

        // 执行测试
        mockMvc.perform(post("/api/funds/queryWithJoin")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(200))
                .andExpect(jsonPath("$.message").value("success"))
                .andExpect(jsonPath("$.data.total").value(132))
                .andExpect(jsonPath("$.data.records[0].id").value(1))
                .andExpect(jsonPath("$.data.records[0].code").value("000001"))
                .andExpect(jsonPath("$.data.records[0].name").value("中证500ETF"))
                .andExpect(jsonPath("$.data.records[0].establishedDate").value("2017-05-15"))
                .andExpect(jsonPath("$.data.records[0].scale").value(1200000000))
                .andExpect(jsonPath("$.data.records[0].managerTenure").value(3.5))
                .andExpect(jsonPath("$.data.records[0].yieldThisYear").value(0.123))
                .andExpect(jsonPath("$.data.records[0].feeRate").value(0.015))
                .andExpect(jsonPath("$.data.records[0].style").value("价值型"));
    }

    @Test
    public void testQueryFundsWithJoinWithInvalidParams() throws Exception {
        // 测试无效参数时的默认值处理
        FundQueryResponse response = FundQueryResponse.success(0, Arrays.asList());

        when(fundService.queryFundsWithJoin(any(FundQueryRequest.class)))
                .thenReturn(response);

        // 构建请求数据 - 传入无效的分页参数
        FundQueryRequest request = new FundQueryRequest();
        request.setPage(-1);
        request.setPageSize(1000);

        // 执行测试
        mockMvc.perform(post("/api/funds/queryWithJoin")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(200));
    }

    @Test
    public void testQueryFundsWithJoinError() throws Exception {
        // 测试异常情况
        when(fundService.queryFundsWithJoin(any(FundQueryRequest.class)))
                .thenThrow(new RuntimeException("数据库连接失败"));

        FundQueryRequest request = new FundQueryRequest();
        request.setPage(1);
        request.setPageSize(10);

        // 执行测试
        mockMvc.perform(post("/api/funds/queryWithJoin")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isInternalServerError())
                .andExpect(jsonPath("$.code").value(500))
                .andExpect(jsonPath("$.message").value("查询基金失败: 数据库连接失败"));
    }
} 