package com.xxx.advisoryCore.Dto;

import lombok.Data;

@Data
public class FundManagerQueryRequest {
    private Integer page = 1;
    private Integer pageSize = 10;

    private String managerName;
    private String companyName;
    private Integer tenureYearsMin;
    private Integer tenureYearsMax;
}
