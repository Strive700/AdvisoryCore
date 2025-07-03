package com.xxx.advisoryCore.Service;

import com.xxx.advisoryCore.Dto.*;
import com.xxx.advisoryCore.Entity.TradeOrder;
import java.util.List;
import java.util.Map;

public interface TradeOrderService {
    
    /**
     * 查询失败的交易指令
     */
    PageResponse<TradeOrder> getFailedTradeOrders(FailedTradeOrderQueryRequest request);
    
    /**
     * 替换并重新发送失败的交易指令
     */
    ReplaceTradeOrderResponse replaceTradeOrder(ReplaceTradeOrderRequest request);
    
    /**
     * 多条件分页查询交易指令
     */
    PageResponse<TradeOrder> getTradeOrders(TradeOrderQueryRequest request);
    
    /**
     * 批量下单交易指令
     */
    BulkIssueTradeOrderResponse bulkIssueTradeOrders(BulkIssueTradeOrderRequest request);
    
    /**
     * 批量驳回交易指令
     */
    BulkRejectTradeOrderResponse bulkRejectTradeOrders(BulkRejectTradeOrderRequest request);
} 