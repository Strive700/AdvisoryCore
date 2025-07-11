package com.xxx.advisoryCore.Controller;

import com.xxx.advisoryCore.Dto.*;
import com.xxx.advisoryCore.Entity.TradeOrder;
import com.xxx.advisoryCore.Service.TradeOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trade/orders")
public class TradeOrderController {

    @Autowired
    private TradeOrderService tradeOrderService;

    /**
     * 查询失败的交易指令
     */
    @GetMapping("/failed")
    public ApiResponse<PageResponse<TradeOrder>> getFailedTradeOrders(
            FailedTradeOrderQueryRequest request) {
        try {
            PageResponse<TradeOrder> result = tradeOrderService.getFailedTradeOrders(request);
            return new ApiResponse<>(0, "查询成功", result);
        } catch (Exception e) {
            return new ApiResponse<>(500, "查询失败: " + e.getMessage(), null);
        }
    }

    /**
     * 替换并重新发送失败的交易指令
     */
    @PostMapping("/{tradeId}/replace")
    public ApiResponse<ReplaceTradeOrderResponse> replaceTradeOrder(
            @PathVariable Integer tradeId,
            @RequestBody ReplaceTradeOrderRequest request) {
        try {
            // 由于接口设计问题，这里需要特殊处理
            // 实际应该修改ReplaceTradeOrderRequest包含tradeId，或者使用不同的方法
            ReplaceTradeOrderResponse result = ((com.xxx.advisoryCore.Service.ServiceImpl.TradeOrderServiceImpl) tradeOrderService).replaceAndResendTradeOrder(tradeId, request);
            return new ApiResponse<>(0, "交易指令替换成功", result);
        } catch (IllegalArgumentException e) {
            return new ApiResponse<>(400, e.getMessage(), null);
        } catch (Exception e) {
            return new ApiResponse<>(500, "替换失败: " + e.getMessage(), null);
        }
    }

    /**
     * 多条件分页查询交易指令
     */
    @GetMapping
    public ApiResponse<PageResponse<TradeOrder>> getTradeOrders(
            TradeOrderQueryRequest request) {
        try {
            PageResponse<TradeOrder> result = tradeOrderService.getTradeOrders(request);
            return new ApiResponse<>(0, "查询成功", result);
        } catch (Exception e) {
            return new ApiResponse<>(500, "查询失败: " + e.getMessage(), null);
        }
    }

    /**
     * 批量下单交易指令
     */
    @PostMapping("/bulk_issue")
    public ApiResponse<BulkIssueTradeOrderResponse> bulkIssueTradeOrders(
            @RequestBody BulkIssueTradeOrderRequest request) {
        try {
            // 参数校验
            if (request.getTrade_ids() == null || request.getTrade_ids().isEmpty()) {
                return new ApiResponse<>(400, "交易指令ID列表不能为空", null);
            }
            
            BulkIssueTradeOrderResponse result = tradeOrderService.bulkIssueTradeOrders(request);
            return new ApiResponse<>(0, "批量交易指令已下发", result);
        } catch (Exception e) {
            return new ApiResponse<>(500, "批量下单失败: " + e.getMessage(), null);
        }
    }

    /**
     * 批量驳回交易指令
     */
    @PostMapping("/bulk_reject")
    public ApiResponse<BulkRejectTradeOrderResponse> bulkRejectTradeOrders(
            @RequestBody BulkRejectTradeOrderRequest request) {
        try {
            // 参数校验
            if (request.getTrade_ids() == null || request.getTrade_ids().isEmpty()) {
                return new ApiResponse<>(400, "交易指令ID列表不能为空", null);
            }
            
            if (request.getReject_reason() == null || request.getReject_reason().trim().isEmpty()) {
                return new ApiResponse<>(400, "驳回原因不能为空", null);
            }
            
            BulkRejectTradeOrderResponse result = tradeOrderService.bulkRejectTradeOrders(request);
            return new ApiResponse<>(0, "批量交易指令已驳回", result);
        } catch (Exception e) {
            return new ApiResponse<>(500, "批量驳回失败: " + e.getMessage(), null);
        }
    }
} 