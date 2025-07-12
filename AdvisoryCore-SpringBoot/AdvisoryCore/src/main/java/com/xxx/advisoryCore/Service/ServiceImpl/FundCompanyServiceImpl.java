package com.xxx.advisoryCore.Service.Impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.xxx.advisoryCore.Dto.FundCompanyQueryRequest;
import com.xxx.advisoryCore.Entity.FundCompany;
import com.xxx.advisoryCore.Mapper.FundCompanyMapper;
import com.xxx.advisoryCore.Service.FundCompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FundCompanyServiceImpl implements FundCompanyService {

    @Autowired
    private FundCompanyMapper fundCompanyMapper;

    @Override
    public PageInfo<FundCompany> queryByCondition(FundCompanyQueryRequest request) {
        PageHelper.startPage(request.getPage(), request.getPageSize());
        List<FundCompany> list = fundCompanyMapper.selectByCondition(
                request.getCompanyName(),
                request.getMinEffectiveAssets(),
                request.getMaxEffectiveAssets(),
                request.getMinEquityReturn(),
                request.getMaxEquityReturn(),
                request.getMinBondReturn(),
                request.getMaxBondReturn()
        );
        return new PageInfo<>(list);
    }
}
