package com.xxx.advisoryCore.Entity;

import java.util.Date;

public class FundNavHistory {
    /** 主键ID */
    private Integer historyid;

    /** 基金代码 */
    private String fundCode;

    /** 净值对应日期 */
    private Date navDate;

    /** 单位净值 */
    private Double unitNav;

    /** 累计净值 */
    private Double accumulatedNav;

    /** 当日涨跌幅（%） */
    private Double dailyReturn;

    /** 基金当日总份额 */
    private Double shareTotal;

    public Integer getHistoryid() {
        return historyid;
    }

    public void setHistoryid(Integer historyid) {
        this.historyid = historyid;
    }

    public String getFundCode() {
        return fundCode;
    }

    public void setFundCode(String fundCode) {
        this.fundCode = fundCode;
    }

    public Date getNavDate() {
        return navDate;
    }

    public void setNavDate(Date navDate) {
        this.navDate = navDate;
    }

    public Double getUnitNav() {
        return unitNav;
    }

    public void setUnitNav(Double unitNav) {
        this.unitNav = unitNav;
    }

    public Double getAccumulatedNav() {
        return accumulatedNav;
    }

    public void setAccumulatedNav(Double accumulatedNav) {
        this.accumulatedNav = accumulatedNav;
    }

    public Double getShareTotal() {
        return shareTotal;
    }

    public void setShareTotal(Double shareTotal) {
        this.shareTotal = shareTotal;
    }

    public Double getDailyReturn() {
        return dailyReturn;
    }

    public void setDailyReturn(Double dailyReturn) {
        this.dailyReturn = dailyReturn;
    }

    public FundNavHistory(String fundCode, Date navDate, Double accumulatedNav, Double dailyReturn, Double shareTotal, Double unitNav, Integer historyid) {
        this.fundCode = fundCode;
        this.navDate = navDate;
        this.accumulatedNav = accumulatedNav;
        this.dailyReturn = dailyReturn;
        this.shareTotal = shareTotal;
        this.unitNav = unitNav;
        this.historyid = historyid;
    }

    public FundNavHistory() {
    }

    @Override
    public String toString() {
        return "FundNavHistory{" +
                "historyid=" + historyid +
                ", fundCode='" + fundCode + '\'' +
                ", navDate=" + navDate +
                ", unitNav=" + unitNav +
                ", accumulatedNav=" + accumulatedNav +
                ", dailyReturn=" + dailyReturn +
                ", shareTotal=" + shareTotal +
                '}';
    }
}
