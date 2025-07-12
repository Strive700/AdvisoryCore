package com.xxx.advisoryCore.Mapper;

import com.xxx.advisoryCore.Entity.IndexDefinition;
import com.xxx.advisoryCore.Entity.IndexTreeNode;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface IndexMapper {
    /**
     * 查询所有指数树节点，前端或业务层可基于此组装树结构
     * @return 指数树节点列表
     */
    List<IndexTreeNode> selectAllIndexTreeNodes();
  
    /**
     * 根据指数定义ID查询指数定义信息，且必须是启用状态
     * @param definitionid 指数定义ID
     * @return 指数定义实体
     */
    IndexDefinition selectIndexDefinitionById( int definitionid);
   
    /**
     * 根据指数名称查询指数定义信息，且必须是启用状态
     * @param name 指数名称
     * @return 指数定义实体
     */
    IndexDefinition selectIndexDefinitionByName(String name);
   
    /**
     * 根据指数名称更新指数定义信息
     * @param indexDefinition 指数定义对象（需包含 name 及要更新的字段）
     * @return 影响行数
     */
    int updateIndexDefinitionByName(IndexDefinition indexDefinition);

    /**
     * 查询所有指数定义信息
     * @return 指数定义实体列表
     */
    List<IndexDefinition> selectAllIndexDefinitions();

    /**
     * 新增指数定义
     * @param indexDefinition 指数定义对象
     * @return 影响行数
     */
    int insertIndexDefinition(IndexDefinition indexDefinition);

}
