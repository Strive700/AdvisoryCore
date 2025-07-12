package com.xxx.advisoryCore.Entity;

import java.util.Date;

public class FundCoreMetric {
    /** 主键ID */
    private Integer coreid;

    /** 基金代码 */
    private String fundCode;

    /** 统计日期 */
    private Date statDate;

    /** 近一月收益率 */
    private Double return1m;

    /** 今年以来收益率 */
    private Double returnYtd;

    /** 近一年最大回撤 */
    private Double maxDrawdown1y;

    /** 年化夏普率 */
    private Double annualSharpe;

    /** 风险等级 */
    private String riskLevel;

    /** 优品基金评分 */
    private Double qualityScore;

    /** 风险调整收益评分 */
    private Double riskAdjScore;

    /** 基金评级 */
    private String rating;

    /** 资产规模评分 */
    private Double assetScore;

    /** 机构研究支持评分 */
    private Double researchScore;

    /** 风险管理评分 */
    private Double riskMgmtScore;

    /** 最近基金经理任职年限评分 */
    private Double tenureScore;

    public Integer getCoreid() {
        return coreid;
    }

    public void setCoreid(Integer coreid) {
        this.coreid = coreid;
    }

    public String getFundCode() {
        return fundCode;
    }

    public void setFundCode(String fundCode) {
        this.fundCode = fundCode;
    }

    public Date getStatDate() {
        return statDate;
    }

    public void setStatDate(Date statDate) {
        this.statDate = statDate;
    }

    public Double getMaxDrawdown1y() {
        return maxDrawdown1y;
    }

    public void setMaxDrawdown1y(Double maxDrawdown1y) {
        this.maxDrawdown1y = maxDrawdown1y;
    }

    public String getRiskLevel() {
        return riskLevel;
    }

    public void setRiskLevel(String riskLevel) {
        this.riskLevel = riskLevel;
    }

    public Double getQualityScore() {
        return qualityScore;
    }

    public void setQualityScore(Double qualityScore) {
        this.qualityScore = qualityScore;
    }

    public Double getRiskAdjScore() {
        return riskAdjScore;
    }

    public void setRiskAdjScore(Double riskAdjScore) {
        this.riskAdjScore = riskAdjScore;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public Double getResearchScore() {
        return researchScore;
    }

    public void setResearchScore(Double researchScore) {
        this.researchScore = researchScore;
    }

    public Double getTenureScore() {
        return tenureScore;
    }

    public void setTenureScore(Double tenureScore) {
        this.tenureScore = tenureScore;
    }

    public Double getRiskMgmtScore() {
        return riskMgmtScore;
    }

    public void setRiskMgmtScore(Double riskMgmtScore) {
        this.riskMgmtScore = riskMgmtScore;
    }

    public Double getAssetScore() {
        return assetScore;
    }

    public void setAssetScore(Double assetScore) {
        this.assetScore = assetScore;
    }

    public Double getAnnualSharpe() {
        return annualSharpe;
    }

    public void setAnnualSharpe(Double annualSharpe) {
        this.annualSharpe = annualSharpe;
    }

    public Double getReturnYtd() {
        return returnYtd;
    }

    public void setReturnYtd(Double returnYtd) {
        this.returnYtd = returnYtd;
    }

    public Double getReturn1m() {
        return return1m;
    }

    public void setReturn1m(Double return1m) {
        this.return1m = return1m;
    }

    public FundCoreMetric(Double tenureScore, Integer coreid, String fundCode, Date statDate, Double return1m, Double returnYtd, Double maxDrawdown1y, Double annualSharpe, String riskLevel, Double qualityScore, Double riskAdjScore, String rating, Double assetScore, Double researchScore, Double riskMgmtScore) {
        this.tenureScore = tenureScore;
        this.coreid = coreid;
        this.fundCode = fundCode;
        this.statDate = statDate;
        this.return1m = return1m;
        this.returnYtd = returnYtd;
        this.maxDrawdown1y = maxDrawdown1y;
        this.annualSharpe = annualSharpe;
        this.riskLevel = riskLevel;
        this.qualityScore = qualityScore;
        this.riskAdjScore = riskAdjScore;
        this.rating = rating;
        this.assetScore = assetScore;
        this.researchScore = researchScore;
        this.riskMgmtScore = riskMgmtScore;
    }

    public FundCoreMetric() {
    }

    @Override
    public String toString() {
        return "FundCoreMetric{" +
                "coreid=" + coreid +
                ", fundCode='" + fundCode + '\'' +
                ", statDate=" + statDate +
                ", return1m=" + return1m +
                ", returnYtd=" + returnYtd +
                ", maxDrawdown1y=" + maxDrawdown1y +
                ", annualSharpe=" + annualSharpe +
                ", riskLevel='" + riskLevel + '\'' +
                ", qualityScore=" + qualityScore +
                ", riskAdjScore=" + riskAdjScore +
                ", rating='" + rating + '\'' +
                ", assetScore=" + assetScore +
                ", researchScore=" + researchScore +
                ", riskMgmtScore=" + riskMgmtScore +
                ", tenureScore=" + tenureScore +
                '}';
    }
}
