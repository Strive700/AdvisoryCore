package com.xxx.advisoryCore.Service.ServiceImpl;

import com.xxx.advisoryCore.Entity.ConstraintItem;
import com.xxx.advisoryCore.Mapper.ConstraintItemMapper;
import com.xxx.advisoryCore.Service.ConstraintItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ConstraintItemServiceImpl implements ConstraintItemService {

    @Autowired
    private ConstraintItemMapper constraintItemMapper;

    @Override
    public int insertConstraintItem(ConstraintItem constraintItem) {
        try {
            return constraintItemMapper.insertConstraintItem(constraintItem);
        } catch (Exception e) {
            // 可记录日志
            return 0;
        }
    }
} 