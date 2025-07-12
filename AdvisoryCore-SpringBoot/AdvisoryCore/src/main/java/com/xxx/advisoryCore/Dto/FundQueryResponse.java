package com.xxx.advisoryCore.Dto;

import lombok.Data;
import java.util.List;

@Data
public class FundQueryResponse {
    private Integer code = 200;
    private String message = "success";
    private FundData data;

    @Data
    public static class FundData {
        private Integer total;
        private List<FundRecord> records;

        public FundData(Integer total, List<FundRecord> records) {
            this.total = total;
            this.records = records;
        }
    }

    @Data
    public static class FundRecord {
        private String fundCode;           // 基金代码
        private String fundName;           // 基金简称
        private String managerName;        // 基金经理
        private String fundType;           // 基金类型
        private Double unitNav;            // 最新净值
        private String navDate;            // 最新净值日期
        private Double return1m;           // 近一月收益率
        private Double returnYtd;          // 今年以来收益率
        private Double maxDrawdown1y;      // 近一年最大回撤
        private String operationCycle;     // 运行周期
        private Double fundSize;           // 资金规模(亿元)
        private String inceptionDate;      // 成立日期
        private Double qualityScore;       // 优品基金评分
    }

    public static FundQueryResponse success(Integer total, List<FundRecord> records) {
        FundQueryResponse response = new FundQueryResponse();
        response.setData(new FundData(total, records));
        return response;
    }

    public static FundQueryResponse error(String message) {
        FundQueryResponse response = new FundQueryResponse();
        response.setCode(500);
        response.setMessage(message);
        return response;
    }
} 