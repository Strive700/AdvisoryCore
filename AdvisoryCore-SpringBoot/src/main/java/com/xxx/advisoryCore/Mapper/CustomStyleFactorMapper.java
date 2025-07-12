
package com.xxx.advisoryCore.Mapper;

import com.xxx.advisoryCore.Entity.CustomStyleFactor;
import com.xxx.advisoryCore.Entity.CustomStyleFactorMix;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CustomStyleFactorMapper {
    int insertCustomStyleFactor(CustomStyleFactor factor);
}


