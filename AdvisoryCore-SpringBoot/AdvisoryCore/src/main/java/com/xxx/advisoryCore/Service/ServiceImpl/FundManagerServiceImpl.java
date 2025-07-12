package com.xxx.advisoryCore.Service.ServiceImpl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.xxx.advisoryCore.Dto.FundManagerQueryRequest;
import com.xxx.advisoryCore.Mapper.FundManagerMapper;
import com.xxx.advisoryCore.Entity.FundManager;
import com.xxx.advisoryCore.Service.FundManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class FundManagerServiceImpl implements FundManagerService {

    @Autowired
    private FundManagerMapper fundManagerMapper;

    @Override
    public Map<String, Object> queryByCondition(FundManagerQueryRequest request) {
        PageHelper.startPage(request.getPage(), request.getPageSize());

        List<FundManager> list = fundManagerMapper.selectByCondition(
                request.getManagerName(),
                request.getCompanyName(),
                request.getTenureYearsMin(),
                request.getTenureYearsMax()
        );

        PageInfo<FundManager> pageInfo = new PageInfo<>(list);

        Map<String, Object> result = new HashMap<>();
        result.put("total", pageInfo.getTotal());
        result.put("pageNum", pageInfo.getPageNum());
        result.put("pageSize", pageInfo.getPageSize());
        result.put("list", pageInfo.getList());
        return result;
    }
}
