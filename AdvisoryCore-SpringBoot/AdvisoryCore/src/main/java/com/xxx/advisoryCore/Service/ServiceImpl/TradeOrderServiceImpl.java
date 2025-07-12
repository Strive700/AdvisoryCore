package com.xxx.advisoryCore.Service.ServiceImpl;

import com.xxx.advisoryCore.Dto.*;
import com.xxx.advisoryCore.Entity.TradeOrder;
import com.xxx.advisoryCore.Mapper.TradeOrderMapper;
import com.xxx.advisoryCore.Service.TradeOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class TradeOrderServiceImpl implements TradeOrderService {

    @Autowired
    private TradeOrderMapper tradeOrderMapper;

    @Override
    public PageResponse<TradeOrder> getFailedTradeOrders(FailedTradeOrderQueryRequest request) {
        // 参数校验和默认值设置
        if (request.getPage() == null || request.getPage() < 1) {
            request.setPage(1);
        }
        if (request.getPageSize() == null || request.getPageSize() < 1) {
            request.setPageSize(10);
        }
        
        // 计算偏移量
        int offset = (request.getPage() - 1) * request.getPageSize();
        
        // 查询总数
        Long total = tradeOrderMapper.countFailedTradeOrders(
            request.getPortfolioId(),
            request.getCustomerId(),
            request.getTradeType(),
            request.getFailReason()
        );
        
        // 查询数据列表
        List<TradeOrder> list = tradeOrderMapper.selectFailedTradeOrders(
            request.getPortfolioId(),
            request.getCustomerId(),
            request.getTradeType(),
            request.getFailReason(),
            offset,
            request.getPageSize()
        );
        
        // 返回分页结果
        return new PageResponse<>(total, request.getPage(), request.getPageSize(), list);
    }
    
    @Override
    @Transactional
    public ReplaceTradeOrderResponse replaceTradeOrder(ReplaceTradeOrderRequest request) {
        // 这个方法需要tradeId参数，但当前的ReplaceTradeOrderRequest没有包含tradeId
        // 需要修改接口或DTO结构
        throw new UnsupportedOperationException("此方法需要tradeId参数，请使用replaceAndResendTradeOrder方法");
    }
    
    /**
     * 替换并重新发送失败的交易指令（保留原有方法）
     */
    @Transactional
    public ReplaceTradeOrderResponse replaceAndResendTradeOrder(Integer tradeId, ReplaceTradeOrderRequest request) {
        // 1. 查询原交易指令
        TradeOrder originalOrder = tradeOrderMapper.selectTradeOrderById(tradeId);
        if (originalOrder == null) {
            throw new IllegalArgumentException("交易指令不存在");
        }
        
        // 2. 校验原交易指令状态
        if (!"FAILED".equals(originalOrder.getStatus())) {
            throw new IllegalArgumentException("只能替代失败的交易指令");
        }
        
        // 3. 创建新的交易指令
        TradeOrder newOrder = new TradeOrder();
        newOrder.setCustomerId(originalOrder.getCustomerId());
        newOrder.setFundCode(request.getNew_fund_code());
        newOrder.setPortfolioId(originalOrder.getPortfolioId());
        newOrder.setRebalanceId(originalOrder.getRebalanceId());
        newOrder.setAmount(request.getNew_amount() != null ? request.getNew_amount() : originalOrder.getAmount());
        newOrder.setShares(request.getNew_shares() != null ? request.getNew_shares() : originalOrder.getShares());
        newOrder.setTradeType(originalOrder.getTradeType());
        newOrder.setReason(request.getReason() != null ? request.getReason() : originalOrder.getReason());
        newOrder.setTradeTime(LocalDateTime.now());
        newOrder.setStatus("PENDING");
        newOrder.setFailReason(null);
        newOrder.setReplaceOrderId(null);
        newOrder.setOperator(request.getReason()); // 使用reason作为operator的临时值
        
        // 4. 插入新交易指令
        tradeOrderMapper.insertTradeOrder(newOrder);
        
        // 5. 更新原交易指令的replace_order_id
        tradeOrderMapper.updateReplaceOrderId(tradeId, newOrder.getTradeId());
        
        // 6. 返回结果
        return new ReplaceTradeOrderResponse(tradeId, newOrder.getTradeId());
    }
    
    @Override
    public PageResponse<TradeOrder> getTradeOrders(TradeOrderQueryRequest request) {
        // 参数校验和默认值设置
        if (request.getPage() == null || request.getPage() < 1) {
            request.setPage(1);
        }
        if (request.getPageSize() == null || request.getPageSize() < 1) {
            request.setPageSize(10);
        }
        
        // 构建查询参数
        Map<String, Object> params = new HashMap<>();
        params.put("orderType", request.getOrderType());
        params.put("status", request.getStatus());
        params.put("portfolioId", request.getPortfolioId());
        params.put("customerId", request.getCustomerId());
        params.put("startDate", request.getStartDate());
        params.put("endDate", request.getEndDate());
        
        // 查询总数
        Long total = tradeOrderMapper.countTradeOrdersByConditions(params);
        
        // 计算偏移量并添加到参数中
        int offset = (request.getPage() - 1) * request.getPageSize();
        params.put("offset", offset);
        params.put("pageSize", request.getPageSize());
        
        // 查询数据列表
        List<TradeOrder> list = tradeOrderMapper.selectTradeOrdersByConditions(params);
        
        // 返回分页结果
        return new PageResponse<>(total, request.getPage(), request.getPageSize(), list);
    }

    @Override
    @Transactional
    public BulkIssueTradeOrderResponse bulkIssueTradeOrders(BulkIssueTradeOrderRequest request) {
        // 查询所有指定的交易指令
        List<TradeOrder> tradeOrders = tradeOrderMapper.selectTradeOrdersByIds(request.getTrade_ids());
        
        // 筛选出状态为PENDING的交易指令ID
        List<Integer> pendingTradeIds = tradeOrders.stream()
            .filter(order -> "PENDING".equals(order.getStatus()))
            .map(TradeOrder::getTradeId)
            .collect(Collectors.toList());
        
        // 找出失败的ID（不存在或状态不为PENDING）
        Set<Integer> requestedIds = new HashSet<>(request.getTrade_ids());
        Set<Integer> pendingIds = new HashSet<>(pendingTradeIds);
        List<Integer> failedIds = requestedIds.stream()
            .filter(id -> !pendingIds.contains(id))
            .collect(Collectors.toList());
        
        // 批量更新状态为ISSUED
        int updatedCount = 0;
        if (!pendingTradeIds.isEmpty()) {
            updatedCount = tradeOrderMapper.updateStatusToIssued(pendingTradeIds, request.getOperator());
        }
        
        return new BulkIssueTradeOrderResponse(updatedCount, failedIds);
    }

    @Override
    @Transactional
    public BulkRejectTradeOrderResponse bulkRejectTradeOrders(BulkRejectTradeOrderRequest request) {
        // 查询所有指定的交易指令
        List<TradeOrder> tradeOrders = tradeOrderMapper.selectByIds(request.getTrade_ids());
        
        // 筛选出状态为PENDING或ISSUED的交易指令ID
        List<Integer> rejectableTradeIds = tradeOrders.stream()
            .filter(order -> "PENDING".equals(order.getStatus()) || "ISSUED".equals(order.getStatus()))
            .map(TradeOrder::getTradeId)
            .collect(Collectors.toList());
        
        // 找出失败的ID（不存在或状态不符合条件）
        Set<Integer> requestedIds = new HashSet<>(request.getTrade_ids());
        Set<Integer> rejectableIds = new HashSet<>(rejectableTradeIds);
        List<Integer> failedIds = requestedIds.stream()
            .filter(id -> !rejectableIds.contains(id))
            .collect(Collectors.toList());
        
        // 批量驳回
        int rejectedCount = 0;
        if (!rejectableTradeIds.isEmpty()) {
            rejectedCount = tradeOrderMapper.batchReject(rejectableTradeIds, request.getReject_reason(), request.getOperator());
        }
        
        return new BulkRejectTradeOrderResponse(rejectedCount, failedIds);
    }
} 