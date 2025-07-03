package com.xxx.advisoryCore.Entity;

import java.util.Date;

public class Fund {
    /** 基金代码，主键 */
    private String fundCode;

    /** 基金名称 */
    private String fundName;

    /** 基金简介 */
    private String fundDescription;

    /** 基金经理ID */
    private Integer managerId;

    /** 基金管理公司ID */
    private Integer companyId;

    /** 基金类型，如股票型、债券型、混合型 */
    private String fundType;

    /** 基金所属大类，如主动管理、被动指数 */
    private String category;

    /** 运行周期，如开放式、封闭式 */
    private String operationCycle;

    /** 资金规模（单位：亿元） */
    private Double fundSize;

    /** 成立日期 */
    private Date inceptionDate;

    /** 费率（%） */
    private Double feeRate;

    /** 股票资产（亿元） */
    private Double stockAsset;

    /** 现金资产（亿元） */
    private Double cashAsset;

    /** 债券资产（亿元） */
    private Double bondAsset;

    /** 银行存款资产（亿元） */
    private Double depositAsset;

    /** 其他占比（%） */
    private Double proportion;

    public String getFundCode() {
        return fundCode;
    }

    public void setFundCode(String fundCode) {
        this.fundCode = fundCode;
    }

    public String getFundName() {
        return fundName;
    }

    public void setFundName(String fundName) {
        this.fundName = fundName;
    }

    public String getFundDescription() {
        return fundDescription;
    }

    public void setFundDescription(String fundDescription) {
        this.fundDescription = fundDescription;
    }

    public Integer getManagerId() {
        return managerId;
    }

    public void setManagerId(Integer managerId) {
        this.managerId = managerId;
    }

    public Integer getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }

    public String getFundType() {
        return fundType;
    }

    public void setFundType(String fundType) {
        this.fundType = fundType;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getOperationCycle() {
        return operationCycle;
    }

    public void setOperationCycle(String operationCycle) {
        this.operationCycle = operationCycle;
    }

    public Double getFundSize() {
        return fundSize;
    }

    public void setFundSize(Double fundSize) {
        this.fundSize = fundSize;
    }

    public Date getInceptionDate() {
        return inceptionDate;
    }

    public void setInceptionDate(Date inceptionDate) {
        this.inceptionDate = inceptionDate;
    }

    public Double getFeeRate() {
        return feeRate;
    }

    public void setFeeRate(Double feeRate) {
        this.feeRate = feeRate;
    }

    public Double getCashAsset() {
        return cashAsset;
    }

    public void setCashAsset(Double cashAsset) {
        this.cashAsset = cashAsset;
    }

    public Double getStockAsset() {
        return stockAsset;
    }

    public void setStockAsset(Double stockAsset) {
        this.stockAsset = stockAsset;
    }

    public Double getBondAsset() {
        return bondAsset;
    }

    public void setBondAsset(Double bondAsset) {
        this.bondAsset = bondAsset;
    }

    public Double getDepositAsset() {
        return depositAsset;
    }

    public void setDepositAsset(Double depositAsset) {
        this.depositAsset = depositAsset;
    }

    public Double getProportion() {
        return proportion;
    }

    public void setProportion(Double proportion) {
        this.proportion = proportion;
    }

    public Fund(String fundCode, String fundName, String fundDescription, Integer companyId, Integer managerId, String fundType, String category, String operationCycle, Double fundSize, Date inceptionDate, Double feeRate, Double stockAsset, Double cashAsset, Double bondAsset, Double depositAsset, Double proportion) {
        this.fundCode = fundCode;
        this.fundName = fundName;
        this.fundDescription = fundDescription;
        this.companyId = companyId;
        this.managerId = managerId;
        this.fundType = fundType;
        this.category = category;
        this.operationCycle = operationCycle;
        this.fundSize = fundSize;
        this.inceptionDate = inceptionDate;
        this.feeRate = feeRate;
        this.stockAsset = stockAsset;
        this.cashAsset = cashAsset;
        this.bondAsset = bondAsset;
        this.depositAsset = depositAsset;
        this.proportion = proportion;
    }

    public Fund() {
    }

    @Override
    public String toString() {
        return "fund{" +
                "fundCode='" + fundCode + '\'' +
                ", fundName='" + fundName + '\'' +
                ", fundDescription='" + fundDescription + '\'' +
                ", managerId=" + managerId +
                ", companyId=" + companyId +
                ", fundType='" + fundType + '\'' +
                ", category='" + category + '\'' +
                ", operationCycle='" + operationCycle + '\'' +
                ", fundSize=" + fundSize +
                ", inceptionDate=" + inceptionDate +
                ", feeRate=" + feeRate +
                ", stockAsset=" + stockAsset +
                ", cashAsset=" + cashAsset +
                ", bondAsset=" + bondAsset +
                ", depositAsset=" + depositAsset +
                ", proportion=" + proportion +
                '}';
    }
}
