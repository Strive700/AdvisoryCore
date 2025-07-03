package com.xxx.advisoryCore.Mapper;

import org.apache.ibatis.annotations.MapKey;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;


@Mapper
public interface FundWatchlistMapper {
    @MapKey("fundCode")
    List<Map<String, Object>>selectFundWatchlistDetails();

    int deleteById(Integer watchlistId);
}
