package com.xxx.advisoryCore.Mapper;

import com.xxx.advisoryCore.Entity.DerivedFactor;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface DerivedFactorMapper {
    // 批量插入衍生因子记录
    int insertDerivedFactors(@Param("factors") List<DerivedFactor> factors);
    
    // 根据衍生因子ID删除相关记录
    int deleteByDerivedId(@Param("derivedId") Integer derivedId);
    
    // 根据衍生因子ID查询记录数量
    int countByDerivedId(@Param("derivedId") Integer derivedId);
}
