package com.xxx.advisoryCore.Entity;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

/**
 * 大类指数树实体类
 * 对应数据库表: index_tree
 */
@Data
public class IndexTreeNode {
    private Integer indexid;        // 主键ID
    private Integer parentId;      // 父节点ID
    private String nodeName;       // 指数节点名称
    private String nodeType;       // 节点类型
    private Integer IndexId;      // 关联指数ID
    private Boolean isLeaf;        // 是否为叶子节点
    private Integer sortOrder;     // 展示排序顺序
    private String description;     // 描述

    // 叶子节点关联的指数定义详细信息
    private IndexDefinition indexDefinition;

    // 子节点列表（树形结构）
    private List<IndexTreeNode> children = new ArrayList<>();
}