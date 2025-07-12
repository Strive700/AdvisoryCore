package com.xxx.advisoryCore.Dto;

import lombok.Data;

@Data
public class FundCompanyQueryRequest {
    private Integer page = 1;
    private Integer pageSize = 10;
    private String companyName;
    private Double minEffectiveAssets;
    private Double maxEffectiveAssets;
    private Double minEquityReturn;
    private Double maxEquityReturn;
    private Double minBondReturn;
    private Double maxBondReturn;
}
