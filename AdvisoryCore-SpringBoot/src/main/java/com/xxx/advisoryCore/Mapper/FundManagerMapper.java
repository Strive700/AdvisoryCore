package com.xxx.advisoryCore.Mapper;

import com.xxx.advisoryCore.Entity.FundManager;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface FundManagerMapper {
    List<FundManager> selectByCondition1(
        Double managerTenureMin,Double managerTenureMax
    );
    List<FundManager> selectByCondition(
            String managerName,
            String companyName,
            Integer tenureYearsMin,
            Integer tenureYearsMax
    );
}
