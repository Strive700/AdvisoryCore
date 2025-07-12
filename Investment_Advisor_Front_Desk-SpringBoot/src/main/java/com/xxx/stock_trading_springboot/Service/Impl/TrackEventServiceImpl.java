package com.xxx.stock_trading_springboot.Service.Impl;

import com.xxx.stock_trading_springboot.Bean.TrackEvent;
import com.xxx.stock_trading_springboot.Mapper.TrackEventMapper;
import com.xxx.stock_trading_springboot.Service.TrackEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrackEventServiceImpl implements TrackEventService {
    @Autowired
    private TrackEventMapper trackEventMapper;

    @Override
    public int insertTrackEvent(TrackEvent event) {
        return trackEventMapper.insertTrackEvent(event);
    }

    @Override
    public List<TrackEvent> getTrackEventsByUserId(String user_id) {
        return trackEventMapper.selectTrackEventsByUserId(user_id);
    }

    @Override
    public List<TrackEvent> getAllTrackEvents() {
        return trackEventMapper.selectAllTrackEvents();
    }

    @Override
    public int countActiveUsers(int minutes) {
        return trackEventMapper.countActiveUsers(minutes);
    }

    @Override
    public int countEvents(int minutes) {
        return trackEventMapper.countEvents(minutes);
    }

    @Override
    public List<String> getActivePages(int minutes) {
        return trackEventMapper.getActivePages(minutes);
    }

    @Override
    public List<String> getActiveModules(int minutes) {
        return trackEventMapper.getActiveModules(minutes);
    }

    @Override
    public List<com.xxx.stock_trading_springboot.Bean.TrendPoint> getActiveUsersTrend(int minutes) {
        return trackEventMapper.getActiveUsersTrend(minutes);
    }

    @Override
    public List<com.xxx.stock_trading_springboot.Bean.TrendPoint> getEventCountTrend(int minutes) {
        return trackEventMapper.getEventCountTrend(minutes);
    }

    @Override
    public List<TrackEvent> getUserEvents(String user_id) {
        return trackEventMapper.selectUserEvents(user_id);
    }
} 