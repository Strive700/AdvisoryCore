package com.xxx.advisoryCore.Service.ServiceImpl;

import com.xxx.advisoryCore.Entity.IndexDefinition;
import com.xxx.advisoryCore.Entity.IndexTreeNode;
import com.xxx.advisoryCore.Mapper.IndexMapper;
import com.xxx.advisoryCore.Service.IndexService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class IndexServiceImpl implements IndexService {

    @Autowired
    private IndexMapper indexMapper;

    @Override
    public List<IndexTreeNode> getAllIndexTreeNodes() {
        try {
            if (indexMapper == null) {

            }
            List<IndexTreeNode> nodes = indexMapper.selectAllIndexTreeNodes();
            return nodes != null ? nodes : Collections.emptyList();
        } catch (Exception e) {
            // 记录异常日志
            // log.error("查询指数树节点异常", e);
            return Collections.emptyList();
        }
    }

    /**
     * 根据指数名称查询指数定义信息，且必须是启用状态
     * @param name 指数名称
     * @return 指数定义实体
     */
    @Override
    public IndexDefinition getIndexDefinitionByName(String name) {
        try {
            return indexMapper.selectIndexDefinitionByName(name);
        } catch (Exception e) {
            // 可记录日志
            return null;
        }
    }

    /**
     * 根据指数名称更新指数定义信息
     * @param indexDefinition 指数定义对象（需包含 name 及要更新的字段）
     * @return 影响行数
     */
    @Override
    public int updateIndexDefinitionByName(IndexDefinition indexDefinition) {
        try {
            return indexMapper.updateIndexDefinitionByName(indexDefinition);
        } catch (Exception e) {
            // 可记录日志
            return 0;
        }
    }

    @Override
    public List<IndexDefinition> getAllIndexDefinitions() {
        try {
            List<IndexDefinition> list = indexMapper.selectAllIndexDefinitions();
            return list != null ? list : Collections.emptyList();
        } catch (Exception e) {
            // 可记录日志
            return Collections.emptyList();
        }
    }

    @Override
    public int insertIndexDefinition(IndexDefinition indexDefinition) {
        try {
            return indexMapper.insertIndexDefinition(indexDefinition);
        } catch (Exception e) {
            // 可记录日志
            return 0;
        }
    }

}
