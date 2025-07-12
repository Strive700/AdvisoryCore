package com.xxx.advisoryCore.Entity;

import lombok.Data;

import java.util.Date;

@Data
public class FundCompany {
    private String companyName;
    private Date establishmentDate;
    private Double registeredCapital;
    private Date firstFundDate;
    private Integer managerCount;
    private Integer fundCount;
    private Double equityCapital;
    private Double effectiveAssets;
    private Double equityReturn;
    private Double bondReturn;
}