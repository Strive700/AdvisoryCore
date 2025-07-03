package com.xxx.advisoryCore.Mapper;

import com.xxx.advisoryCore.Entity.FactorDefinition;
import com.xxx.advisoryCore.Entity.FactorTreeNode;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FactorMapper {
    /**
     * 查询所有因子树节点，前端或业务层可基于此组装树结构
     * @return 因子树节点列表
     */
    List<FactorTreeNode> selectAllFactorTreeNodes();
    /**
     * 根据因子定义ID查询因子定义信息，且必须是启用状态
     * @param definitionid 因子定义ID
     * @return 因子定义实体
     */
    FactorDefinition selectFactorDefinitionById( int definitionid);

    List<String> selectDerivedFactorDataTypes();
}
