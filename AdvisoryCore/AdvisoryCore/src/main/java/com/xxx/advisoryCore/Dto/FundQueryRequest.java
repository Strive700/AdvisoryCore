package com.xxx.advisoryCore.Dto;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
public class FundQueryRequest {

    private Integer page = 1;
    private Integer pageSize = 10;

    private DateRange establishedDate;
    private LongRange scale;
    private DoubleRange managerTenure;
    private DoubleRange yieldThisYear;
    private DoubleRange feeRate;

    private String style;     // 风格归因，模糊匹配
    private String code;      // 基金代码，精确匹配

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

    // 参数验证和默认值设置
    public void validateAndSetDefaults() {
        if (page == null || page < 1) {
            page = 1;
        }
        if (pageSize == null || pageSize < 1 || pageSize > 100) {
            pageSize = 10;
        }
    }
}

