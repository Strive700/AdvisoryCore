package com.xxx.advisoryCore.Mapper;

import com.xxx.advisoryCore.Entity.Fund;
import org.apache.ibatis.annotations.MapKey;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Mapper
public interface FundMapper {
    List<Fund> selectByCondition(
            @Param("establishedFrom") Date establishedFrom,
            @Param("establishedTo") Date establishedTo,
            @Param("scaleMin") Double scaleMin,
            @Param("scaleMax") Double scaleMax,
            @Param("feeRateMin") Double feeRateMin,
            @Param("feeRateMax") Double feeRateMax,
            @Param("style") String style,
            @Param("code") String code
    );
    @MapKey("fund_code")
    Map<String, Object> selectFundImageByCode(String code);
}
