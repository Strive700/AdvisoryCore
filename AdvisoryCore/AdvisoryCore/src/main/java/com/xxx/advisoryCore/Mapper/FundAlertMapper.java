package com.xxx.advisoryCore.Mapper;

import com.xxx.advisoryCore.Entity.FundAlert;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FundAlertMapper {
    int insertAlert(FundAlert alert);
}
