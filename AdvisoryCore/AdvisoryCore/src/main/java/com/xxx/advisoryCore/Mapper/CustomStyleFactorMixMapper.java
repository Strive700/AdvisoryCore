package com.xxx.advisoryCore.Mapper;

import com.xxx.advisoryCore.Entity.CustomStyleFactorMix;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CustomStyleFactorMixMapper {
    // 批量插入风格因子组合记录
    int insertCustomStyleFactorMixes(@Param("mixes") List<CustomStyleFactorMix> mixes);
    
    // 根据风格因子ID删除相关记录
    int deleteByStyleFactorId(@Param("styleFactorId") Integer styleFactorId);
    
    // 根据风格因子ID查询记录数量
    int countByStyleFactorId(@Param("styleFactorId") Integer styleFactorId);
} 