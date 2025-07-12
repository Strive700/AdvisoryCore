package com.xxx.advisoryCore.Service;

import com.xxx.advisoryCore.Entity.IndexDefinition;
import com.xxx.advisoryCore.Entity.IndexTreeNode;

import java.util.List;

public interface IndexService {
    List<IndexTreeNode> getAllIndexTreeNodes();

    /**
     * 根据指数名称查询指数定义信息，且必须是启用状态
     * @param name 指数名称
     * @return 指数定义实体
     */
    IndexDefinition getIndexDefinitionByName(String name);

    /**
     * 根据指数名称更新指数定义信息
     * @param indexDefinition 指数定义对象（需包含 name 及要更新的字段）
     * @return 影响行数
     */
    int updateIndexDefinitionByName(IndexDefinition indexDefinition);

    /**
     * 获取全部指数定义信息
     * @return 指数定义实体列表
     */
    List<IndexDefinition> getAllIndexDefinitions();

    /**
     * 新增指数定义
     * @param indexDefinition 指数定义对象
     * @return 影响行数
     */
    int insertIndexDefinition(IndexDefinition indexDefinition);
} 