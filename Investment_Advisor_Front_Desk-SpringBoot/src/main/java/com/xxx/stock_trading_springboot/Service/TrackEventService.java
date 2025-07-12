package com.xxx.stock_trading_springboot.Service;

import com.xxx.stock_trading_springboot.Bean.TrackEvent;
import java.util.List;

public interface TrackEventService {
    int insertTrackEvent(TrackEvent event);

    // 根据 user_id 查询事件
    List<TrackEvent> getTrackEventsByUserId(String user_id);

    // 查询所有事件
    List<TrackEvent> getAllTrackEvents();

    // 统计最近N分钟活跃用户数
    int countActiveUsers(int minutes);

    // 统计最近N分钟事件总数
    int countEvents(int minutes);

    // 查询最近N分钟活跃页面排行
    List<String> getActivePages(int minutes);

    // 查询最近N分钟活跃模块排行
    List<String> getActiveModules(int minutes);

    // 获取最近N分钟每分钟的活跃用户数
    List<com.xxx.stock_trading_springboot.Bean.TrendPoint> getActiveUsersTrend(int minutes);

    // 获取最近N分钟每分钟的事件数
    List<com.xxx.stock_trading_springboot.Bean.TrendPoint> getEventCountTrend(int minutes);

    // 根据 user_id 查询用户的所有事件
    List<TrackEvent> getUserEvents(String user_id);
} 