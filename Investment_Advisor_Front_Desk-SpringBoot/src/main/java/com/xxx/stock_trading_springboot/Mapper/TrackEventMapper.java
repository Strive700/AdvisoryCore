package com.xxx.stock_trading_springboot.Mapper;

import com.xxx.stock_trading_springboot.Bean.TrackEvent;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import com.xxx.stock_trading_springboot.Bean.TrendPoint;
import java.util.List;

@Mapper
public interface TrackEventMapper {
    int insertTrackEvent(@Param("event") TrackEvent event);

    // 根据 user_id 查询事件
    List<TrackEvent> selectTrackEventsByUserId(@Param("user_id") String user_id);

    // 查询所有事件
    List<TrackEvent> selectAllTrackEvents();

    // 统计最近N分钟活跃用户数
    int countActiveUsers(@Param("minutes") int minutes);

    // 统计最近N分钟事件总数
    int countEvents(@Param("minutes") int minutes);

    // 查询最近N分钟活跃页面排行
    List<String> getActivePages(@Param("minutes") int minutes);

    // 查询最近N分钟活跃模块排行
    List<String> getActiveModules(@Param("minutes") int minutes);

    // 获取最近N分钟每分钟的活跃用户数
    List<TrendPoint> getActiveUsersTrend(@Param("minutes") int minutes);

    // 获取最近N分钟每分钟的事件数
    List<TrendPoint> getEventCountTrend(@Param("minutes") int minutes);

    // 根据 user_id 查询用户的所有事件
    List<TrackEvent> selectUserEvents(@Param("user_id") String user_id);
} 