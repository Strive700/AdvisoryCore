package com.xxx.advisoryCore.Service.ServiceImpl;

import com.xxx.advisoryCore.Mapper.FactorMapper;
import com.xxx.advisoryCore.Service.FactorService;
import com.xxx.advisoryCore.Entity.FactorTreeNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class FactorServiceImpl implements FactorService {

    @Autowired
    private FactorMapper factorMapper;

    @Override
    public List<FactorTreeNode> getAllFactorTreeNodes() {
        try {
            if (factorMapper == null) {

            }
            List<FactorTreeNode> nodes = factorMapper.selectAllFactorTreeNodes();
            return nodes != null ? nodes : Collections.emptyList();
        } catch (Exception e) {
            // 记录异常日志
            // log.error("查询因子树节点异常", e);
            return Collections.emptyList();
        }
    }

}
