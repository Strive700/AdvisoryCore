package com.xxx.advisoryCore.Service.ServiceImpl;

import com.xxx.advisoryCore.Entity.CustomStyleFactor;
import com.xxx.advisoryCore.Mapper.CustomStyleFactorMapper;
import com.xxx.advisoryCore.Service.CustomStyleFactorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomStyleFactorServiceImpl implements CustomStyleFactorService {
    @Autowired
    private CustomStyleFactorMapper customStyleFactorMapper;

    @Override
    public Integer addCustomStyleFactor(CustomStyleFactor factor) {
        customStyleFactorMapper.insertCustomStyleFactor(factor);

        return factor.getStyleId();
    }
} 