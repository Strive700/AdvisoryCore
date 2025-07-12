package com.xxx.stock_trading_springboot.Bean;

public class TrendPoint {
    private String time;
    private int value;

    public TrendPoint() {}
    public TrendPoint(String time, int value) {
        this.time = time;
        this.value = value;
    }
    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }
    public int getValue() { return value; }
    public void setValue(int value) { this.value = value; }
} 