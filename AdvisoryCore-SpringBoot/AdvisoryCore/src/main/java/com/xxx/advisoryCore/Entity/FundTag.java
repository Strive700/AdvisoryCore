package com.xxx.advisoryCore.Entity;

public class FundTag {
    /** 主键ID */
    private Integer tagid;

    /** 基金代码，外键 */
    private String fundCode;

    /** 标签（如“白酒”、“新能源”等） */
    private String tag;

    public Integer getTagid() {
        return tagid;
    }

    public void setTagid(Integer tagid) {
        this.tagid = tagid;
    }

    public String getFundCode() {
        return fundCode;
    }

    public void setFundCode(String fundCode) {
        this.fundCode = fundCode;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public FundTag(Integer tagid, String fundCode, String tag) {
        this.tagid = tagid;
        this.fundCode = fundCode;
        this.tag = tag;
    }

    public FundTag() {
    }

    @Override
    public String toString() {
        return "fundTag{" +
                "tagid=" + tagid +
                ", fundCode='" + fundCode + '\'' +
                ", tag='" + tag + '\'' +
                '}';
    }
}
