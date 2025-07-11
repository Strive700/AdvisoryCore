package com.xxx.advisoryCore.until;
import com.xxx.advisoryCore.Dto.FundDTO;
import com.xxx.advisoryCore.Entity.Fund;
import com.xxx.advisoryCore.Entity.FundCoreMetric;
import com.xxx.advisoryCore.Entity.FundManager;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;
public class FundDataMerger {

    /**
     * 多表查询后，将基金、基金经理和核心指标数据合并成前端需要的DTO列表
     *
     * @param funds       基金列表（主表数据）
     * @param managers    基金经理列表
     * @param coreMetrics 核心指标列表
     * @return 合并后的基金DTO列表
     */
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
}
