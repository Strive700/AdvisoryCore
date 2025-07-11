package com.xxx.advisoryCore.Dto;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
public class FundQueryRequest {

    private Integer page = 1;
    private Integer pageSize = 10;

    private DateRange establishedDate;
    private DoubleRange scale;
    private DoubleRange managerTenure;
    private DoubleRange yieldThisYear;
    private DoubleRange feeRate;

    private String styleTag;     // 风格归因
    private String fundCode;     // 基金代码
    private String fundName;     // 可选增加名称模糊匹配

    @Data
    public static class DateRange {
        @DateTimeFormat(pattern = "yyyy-MM-dd")
        private Date from;

        @DateTimeFormat(pattern = "yyyy-MM-dd")
        private Date to;
    }

    @Data
    public static class LongRange {
        private Long min;
        private Long max;
    }

    @Data
    public static class DoubleRange {
        private Double min;
        private Double max;
    }
}

