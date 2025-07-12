package com.xxx.advisoryCore.Service.ServiceImpl;

import com.xxx.advisoryCore.Dto.FundWithCoreMetricDTO;
import com.xxx.advisoryCore.Mapper.FundIndexMappingMapper;
import com.xxx.advisoryCore.Service.FundIndexMappingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FundIndexMappingServiceImpl implements FundIndexMappingService {

    @Autowired
    private FundIndexMappingMapper fundIndexMappingMapper;

    @Override
    public List<FundWithCoreMetricDTO> findFundsByIndexName(String indexName) {
        return fundIndexMappingMapper.findFundsByIndexName(indexName);
    }
} 