package com.xxx.advisoryCore.Service;

import com.github.pagehelper.PageInfo;
import com.xxx.advisoryCore.Dto.FundCompanyQueryRequest;
import com.xxx.advisoryCore.Entity.FundCompany;
public interface FundCompanyService {
    PageInfo<FundCompany> queryByCondition(FundCompanyQueryRequest request);
}
