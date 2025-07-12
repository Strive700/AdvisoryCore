package com.xxx.advisoryCore.Service.ServiceImpl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.xxx.advisoryCore.Dto.FundDTO;
import com.xxx.advisoryCore.Dto.FundQueryRequest;
import com.xxx.advisoryCore.Dto.FundQueryResponse;
import com.xxx.advisoryCore.Entity.Fund;
import com.xxx.advisoryCore.Entity.FundCoreMetric;
import com.xxx.advisoryCore.Entity.FundManager;
import com.xxx.advisoryCore.Mapper.FundCoreMetricMapper;
import com.xxx.advisoryCore.Mapper.FundManagerMapper;
import com.xxx.advisoryCore.Mapper.FundMapper;
import com.xxx.advisoryCore.Service.FundService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class FundServiceImpl implements FundService {
    @Autowired
    private FundMapper fundMapper;
    @Autowired
    private FundManagerMapper fundManagerMapper;
    @Autowired
    private FundCoreMetricMapper fundCoreMetricMapper;


    @Override
    public FundQueryResponse queryFundsWithJoin(FundQueryRequest request) {
        try {
            // 参数验证和默认值设置
            request.validateAndSetDefaults();
            
            // 计算偏移量
            int offset = (request.getPage() - 1) * request.getPageSize();
            
            // 查询总数
            Long total = fundMapper.countFundsWithJoin(request);
            
            // 查询数据列表
            List<FundQueryResponse.FundRecord> records = fundMapper.selectFundsWithJoin(
                    request, offset, request.getPageSize()
            );
            
            // 返回结果
            return FundQueryResponse.success(total.intValue(), records);
            
        } catch (Exception e) {
            return FundQueryResponse.error("查询基金失败: " + e.getMessage());
        }
    }

    
    @Override
    public Map<String, Object> selectFund_image(Map<String, Object> request) {
        if (request == null || !request.containsKey("fund_code")) {
            return null; // 交由 Controller 判断 null 做处理
        }

        String fundCode = String.valueOf(request.get("fund_code")).trim();
        if (fundCode.isEmpty()) {
            return null; // 同样交由 Controller 处理
        }

        return fundMapper.selectFundImageByCode(fundCode); // 可以返回 null
    }
}
