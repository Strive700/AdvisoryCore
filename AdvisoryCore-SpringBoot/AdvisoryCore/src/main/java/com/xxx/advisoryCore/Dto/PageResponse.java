package com.xxx.advisoryCore.Dto;

import lombok.Data;
import java.util.List;

@Data
public class PageResponse<T> {
    private Long total;           // 总记录数
    private Integer page;         // 当前页码
    private Integer pageSize;     // 分页大小
    private List<T> list;         // 数据列表
    
    public PageResponse(Long total, Integer page, Integer pageSize, List<T> list) {
        this.total = total;
        this.page = page;
        this.pageSize = pageSize;
        this.list = list;
    }
} 