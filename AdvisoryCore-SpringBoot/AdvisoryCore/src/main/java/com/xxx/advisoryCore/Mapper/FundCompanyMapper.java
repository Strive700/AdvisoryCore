package com.xxx.advisoryCore.Mapper;

import com.xxx.advisoryCore.Entity.FundCompany;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface FundCompanyMapper {
    List<FundCompany> selectByCondition(
            String companyName,
            Double minEffectiveAssets,
            Double maxEffectiveAssets,
            Double minEquityReturn,
            Double maxEquityReturn,
            Double minBondReturn,
            Double maxBondReturn
    );
}