package com.xxx.advisoryCore.Service.ServiceImpl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.xxx.advisoryCore.Dto.FundDTO;
import com.xxx.advisoryCore.Dto.FundQueryRequest;
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
    public Map<String, Object> selectFunds(FundQueryRequest request) {
        int page = request.getPage() == null ? 1 : request.getPage();
        int pageSize = request.getPageSize() == null ? 10 : request.getPageSize();
        PageHelper.startPage(page, pageSize);
        List<Fund> funds = fundMapper.selectByCondition(
                request.getEstablishedDate() == null ? null : request.getEstablishedDate().getFrom(),
                request.getEstablishedDate() == null ? null : request.getEstablishedDate().getTo(),
                request.getScale() == null ? null : request.getScale().getMin(),
                request.getScale() == null ? null : request.getScale().getMax(),
                request.getFeeRate() == null ? null : request.getFeeRate().getMin(),
                request.getFeeRate() == null ? null : request.getFeeRate().getMax(),
                request.getStyleTag(),
                request.getFundCode()

        );
        Double minTenure = null;
        Double maxTenure = null;

        if (request.getManagerTenure() != null) {
            minTenure = request.getManagerTenure().getMin();
            maxTenure = request.getManagerTenure().getMax();
        }

        List<FundManager> fundManagers = fundManagerMapper.selectByCondition1(minTenure, maxTenure);
        Double yieldThisYearMin = null;
        Double yieldThisYearMax = null;

        if (request.getYieldThisYear() != null) {
            yieldThisYearMin = request.getManagerTenure().getMin();
            yieldThisYearMax = request.getManagerTenure().getMax();
        }
        List<FundCoreMetric> fundCoreMetrics = fundCoreMetricMapper.selectByCondition(yieldThisYearMin,yieldThisYearMax);
        List<FundDTO> mergedList = mergeFundData(funds, fundManagers, fundCoreMetrics);
        PageInfo<Fund> pageInfo = new PageInfo<>(funds);
        Map<String, Object> result = new HashMap<>();
        result.put("list", mergedList);
        result.put("total", pageInfo.getTotal());
        return result;
    }
    public List<FundDTO> mergeFundData(List<Fund> funds, List<FundManager> managers, List<FundCoreMetric> coreMetrics) {
        // 将manager列表转成Map，key为fund_code，方便快速查找
        Map<String, FundManager> managerMap = managers.stream()
                .collect(Collectors.toMap(FundManager::getManagerName, Function.identity()));

        // 将coreMetrics列表转成Map，key为fund_code
        Map<String, FundCoreMetric> coreMetricMap = coreMetrics.stream()
                .collect(Collectors.toMap(FundCoreMetric::getFundCode, Function.identity()));

        List<FundDTO> resultList = new ArrayList<>();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        for (Fund fund : funds) {
            FundDTO dto = new FundDTO();
            dto.setCode(fund.getFundCode());
            dto.setName(fund.getFundName());

            // 格式化日期为字符串
            if (fund.getInceptionDate() != null) {
                dto.setEstablishedDate(sdf.format(fund.getInceptionDate()));
            }

            dto.setScale(fund.getFundSize() == null ? null : fund.getFundSize().longValue());
            dto.setFeeRate(fund.getFeeRate());
            dto.setStyle(fund.getFundType());

            FundManager manager = managerMap.get(fund.getFundCode());
            if (manager != null && manager.getTenureYears() != null) {
                dto.setManagerTenure(manager.getTenureYears().doubleValue());
            }

            FundCoreMetric coreMetric = coreMetricMap.get(fund.getFundCode());
            if (coreMetric != null) {
                dto.setYieldThisYear(coreMetric.getReturnYtd());
            }

            resultList.add(dto);
        }

        return resultList;
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
