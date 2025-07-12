package com.xxx.advisoryCore.Mapper;

import com.xxx.advisoryCore.Entity.RebalanceTask;
import com.xxx.advisoryCore.Entity.RebalanceDetail;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface RebalanceMapper {
    
    /**
     * 插入调仓任务，返回主键
     */
    int insertRebalanceTask(RebalanceTask task);
    
    /**
     * 批量插入调仓明细
     */
    int insertRebalanceDetails(@Param("details") List<RebalanceDetail> details);
}