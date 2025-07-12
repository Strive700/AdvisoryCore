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
        TradeOrder originalOrder = null;
        try {
            originalOrder = tradeOrderMapper.selectTradeOrderById(tradeId);
            if (originalOrder == null) {
                System.err.println("未找到交易指令，tradeId = " + tradeId);
                // 可选择抛出异常，或根据业务逻辑继续执行
                throw new RuntimeException("未找到指定的交易指令 tradeId=" + tradeId);
            } else {
                System.out.println("查询到交易指令: " + originalOrder);
            }
        } catch (Exception e) {
            System.err.println("查询交易指令失败！");
            e.printStackTrace();  // 打印异常栈
            throw new RuntimeException("查询失败，tradeId=" + tradeId + "，错误：" + e.getMessage(), e);
        }

        if (originalOrder == null) {
            throw new IllegalArgumentException("交易指令不存在");
        }

        // 2. 校验原交易指令状态
        if (!"FAILED".equals(originalOrder.getStatus())) {
            throw new IllegalArgumentException("只能替代失败的交易指令");
        }

        TradeOrder newOrder = null;

        try {
            newOrder = new TradeOrder();
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
            newOrder.setOperator(request.getReason());  // ⚠️ 你原来写成 request.getReason() 了，应该是 getOperator()

            System.out.println("新交易指令构造成功：" + newOrder);

        } catch (Exception e) {
            System.err.println("构造新交易指令失败！");
            e.printStackTrace();
            throw new RuntimeException("构造新交易指令失败：" + e.getMessage(), e);
        }// 使用reason作为operator的临时值
        System.out.println("<UNK>: " + newOrder);
        try {
            // 插入新交易指令
            tradeOrderMapper.insertTradeOrder(newOrder);
            System.out.println("交易指令插入成功: " + newOrder);
        } catch (Exception e) {
            // 打印异常信息并处理
            System.err.println("插入交易指令时发生异常！");
            e.printStackTrace(); // 输出完整异常栈
            // 也可以根据业务需要抛出自定义异常或返回错误状态
            throw new RuntimeException("数据库插入失败: " + e.getMessage(), e);
        }

        try {
            tradeOrderMapper.updateReplaceOrderId(tradeId, newOrder.getTradeId());
            System.out.println("原交易指令更新成功，replace_order_id = " + newOrder.getTradeId());
        } catch (Exception e) {
            System.err.println("更新原交易指令的 replace_order_id 失败！");
            e.printStackTrace();
            throw new RuntimeException("更新原交易指令失败：" + e.getMessage(), e);
        }


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
        try {
            System.out.println("请求的 trade_ids: " + request.getTrade_ids());

            // 查询所有指定的交易指令
            List<TradeOrder> tradeOrders = tradeOrderMapper.selectTradeOrdersByIds(request.getTrade_ids());
            System.out.println("查出的 tradeOrders: " + tradeOrders);

            // 筛选出状态为 PENDING 的交易指令 ID
            List<Integer> pendingTradeIds = tradeOrders.stream()
                    .filter(order -> "PENDING".equals(order.getStatus()))
                    .map(TradeOrder::getTradeId)
                    .collect(Collectors.toList());

            // 找出失败的 ID（不存在或状态不为 PENDING）
            Set<Integer> requestedIds = new HashSet<>(request.getTrade_ids());
            Set<Integer> pendingIds = new HashSet<>(pendingTradeIds);
            List<Integer> failedIds = requestedIds.stream()
                    .filter(id -> !pendingIds.contains(id))
                    .collect(Collectors.toList());

            int updatedCount = 0;
            if (!pendingTradeIds.isEmpty()) {
                updatedCount = tradeOrderMapper.updateStatusToIssued(pendingTradeIds, request.getOperator());
            }

            return new BulkIssueTradeOrderResponse(updatedCount, failedIds);

        } catch (Exception e) {
            // 打印异常日志
            System.err.println("批量下单失败: " + e.getMessage());
            e.printStackTrace();

            // 可以根据你的系统规范决定是返回失败响应还是抛出业务异常
            throw new RuntimeException("批量下单失败，原因：" + e.getMessage(), e);
        }
    }


    @Override
    @Transactional
    public BulkRejectTradeOrderResponse bulkRejectTradeOrders(BulkRejectTradeOrderRequest request) {
        try {
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

        } catch (Exception e) {
            System.err.println("<UNK>: " + e.getMessage());
            throw new RuntimeException("批量驳回交易指令时发生异常，请稍后重试。", e);
        }
    }

} 