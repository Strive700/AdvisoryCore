package com.xxx.advisoryCore.Entity;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class FactorTreeNode {
    private Integer treeid;          // 节点ID
    private Integer parentId;        // 父节点ID，根节点可为null或0
    private String nodeName;         // 节点名称
    private String nodeType;         // 节点类型，如 theme / dimension / factor
    private Integer factorId;        // 关联的因子定义ID，非叶子节点可能为空
    private Boolean isLeaf;          // 是否叶子节点
    private Integer sortOrder;       // 展示顺序
    private String description;      // 描述信息

    // 叶子节点关联的因子定义详细信息
    private FactorDefinition factorDefinition;

    // 子节点列表（树形结构）
    private List<FactorTreeNode> children = new ArrayList<>();
}
