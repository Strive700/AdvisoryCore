package com.xxx.advisoryCore.Mapper;

import com.xxx.advisoryCore.Entity.FundCoreMetric;
import com.xxx.advisoryCore.Entity.FundManager;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FundCoreMetricMapper {
    List<FundCoreMetric> selectByCondition(
            Double yieldThisYearMin,Double yieldThisYearMax
    );
}
