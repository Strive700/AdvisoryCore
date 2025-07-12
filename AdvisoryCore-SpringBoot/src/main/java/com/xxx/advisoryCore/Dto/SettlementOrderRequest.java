package com.xxx.advisoryCore.Dto;

import java.util.List;

public class SettlementOrderRequest {
    private List<FundInfo> funds;
    private Double cashRatio;

    public List<FundInfo> getFunds() {
        return funds;
    }

    public void setFunds(List<FundInfo> funds) {
        this.funds = funds;
    }

    public Double getCashRatio() {
        return cashRatio;
    }

    public void setCashRatio(Double cashRatio) {
        this.cashRatio = cashRatio;
    }

    public static class FundInfo {
        private String fundCode;
        private String fundName;
        private Double ratio;

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

        public Double getRatio() {
            return ratio;
        }

        public void setRatio(Double ratio) {
            this.ratio = ratio;
        }
    }
} 