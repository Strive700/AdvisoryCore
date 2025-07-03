package com.xxx.advisoryCore.Mapper;

import com.xxx.advisoryCore.Entity.TradeOrder;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface TradeOrderMapper {
    
    /**
     * 分页查询失败的交易指令
     */
    List<TradeOrder> selectFailedTradeOrders(@Param("portfolioId") Integer portfolioId,
                                            @Param("customerId") Integer customerId,
                                            @Param("tradeType") String tradeType,
                                            @Param("failReason") String failReason,
                                            @Param("offset") Integer offset,
                                            @Param("pageSize") Integer pageSize);
    
    /**
     * 统计失败的交易指令总数
     */
    Long countFailedTradeOrders(@Param("portfolioId") Integer portfolioId,
                               @Param("customerId") Integer customerId,
                               @Param("tradeType") String tradeType,
                               @Param("failReason") String failReason);
    
    /**
     * 根据ID查询交易指令
     */
    TradeOrder selectTradeOrderById(@Param("tradeId") Integer tradeId);
    
    /**
     * 插入新的交易指令
     */
    int insertTradeOrder(TradeOrder tradeOrder);
    
    /**
     * 更新交易指令的replace_order_id
     */
    int updateReplaceOrderId(@Param("tradeId") Integer tradeId, 
                            @Param("replaceOrderId") Integer replaceOrderId);
    
    /**
     * 多条件分页查询交易指令
     */
    List<TradeOrder> selectTradeOrdersByConditions(Map<String, Object> params);
    
    /**
     * 统计符合条件的交易指令总数
     */
    Long countTradeOrdersByConditions(Map<String, Object> params);
    
    /**
     * 根据ID列表查询交易指令
     */
    List<TradeOrder> selectTradeOrdersByIds(@Param("tradeIds") List<Integer> tradeIds);
    
    /**
     * 批量更新交易指令状态为ISSUED
     */
    int updateStatusToIssued(@Param("tradeIds") List<Integer> tradeIds,
                            @Param("operator") String operator);
    
    /**
     * 根据ID列表查询交易指令（用于批量驳回）
     */
    List<TradeOrder> selectByIds(@Param("ids") List<Integer> ids);
    
    /**
     * 批量驳回交易指令
     */
    int batchReject(@Param("ids") List<Integer> ids, 
                    @Param("reason") String reason, 
                    @Param("operator") String operator);
} 