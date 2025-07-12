package com.xxx.advisoryCore.Service.ServiceImpl;

import com.xxx.advisoryCore.Entity.ConstraintGroup;
import com.xxx.advisoryCore.Mapper.ConstraintGroupMapper;
import com.xxx.advisoryCore.Service.ConstraintGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ConstraintGroupServiceImpl implements ConstraintGroupService {

    @Autowired
    private ConstraintGroupMapper constraintGroupMapper;

    @Override
    public int insertConstraintGroup(ConstraintGroup constraintGroup) {
        try {
            return constraintGroupMapper.insertConstraintGroup(constraintGroup);
        } catch (Exception e) {
            // 可记录日志
            return 0;
        }
    }
} 