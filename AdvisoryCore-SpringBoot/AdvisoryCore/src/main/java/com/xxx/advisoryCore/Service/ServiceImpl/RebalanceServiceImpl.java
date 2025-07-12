package com.xxx.advisoryCore.Service.ServiceImpl;

import com.xxx.advisoryCore.Dto.AccountRebalanceSubmitRequest;
import com.xxx.advisoryCore.Dto.AccountRebalanceSubmitResponse;
import com.xxx.advisoryCore.Entity.RebalanceTask;
import com.xxx.advisoryCore.Entity.RebalanceDetail;
import com.xxx.advisoryCore.Mapper.RebalanceMapper;
import com.xxx.advisoryCore.Service.RebalanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class RebalanceServiceImpl implements RebalanceService {

    @Autowired
    private RebalanceMapper rebalanceMapper;

    @Override
    @Transactional
    public AccountRebalanceSubmitResponse submitAccountRebalance(AccountRebalanceSubmitRequest request) {
        // 1. 校验新权重总和是否为1
        double totalNewWeight = request.getDetails().stream()
                .mapToDouble(AccountRebalanceSubmitRequest.RebalanceDetail::getNew_weight)
                .sum();
        
        if (Math.abs(totalNewWeight - 1.0) > 0.0001) {
            throw new IllegalArgumentException("新权重总和必须为1，当前总和为: " + totalNewWeight);
        }
        
        // 2. 校验客户ID和组合ID（这里可以添加具体的业务逻辑校验）
        validateCustomerAndPortfolio(request.getCustomerId(), request.getPortfolioId());
        
        // 3. 创建调仓任务
        RebalanceTask task = new RebalanceTask();
        task.setStrategyId(null); // 客户账户调仓没有策略ID
        task.setTriggerTime(LocalDateTime.now());
        task.setTaskType("客户账户调仓");
        task.setExecuteTime(null); // 执行时间待定
        task.setReason(request.getReason() + " [组合ID:" + request.getPortfolioId() + ", 客户ID:" + request.getCustomerId() + "]");
        task.setOperator(request.getOperator());
        
        // 4. 插入调仓任务
        rebalanceMapper.insertRebalanceTask(task);
        
        // 5. 创建调仓明细列表
        List<RebalanceDetail> details = new ArrayList<>();
        for (AccountRebalanceSubmitRequest.RebalanceDetail detailRequest : request.getDetails()) {
            RebalanceDetail detail = new RebalanceDetail();
            detail.setTaskId(task.getId());
            detail.setFundCode(detailRequest.getFund_code());
            detail.setOldWeight(detailRequest.getOld_weight());
            detail.setNewWeight(detailRequest.getNew_weight());
            detail.setDiff(detailRequest.getDiff());
            details.add(detail);
        }
        
        // 6. 批量插入调仓明细
        rebalanceMapper.insertRebalanceDetails(details);
        
        // 7. 返回结果
        return new AccountRebalanceSubmitResponse(task.getId());
    }
    
    /**
     * 校验客户ID和组合ID
     * 这里可以添加具体的业务逻辑校验，比如查询数据库验证客户和组合是否存在
     */
    private void validateCustomerAndPortfolio(Integer customerId, String portfolioId) {
        // 示例校验逻辑，实际项目中可能需要查询数据库
        if (customerId == null || customerId <= 0) {
            throw new IllegalArgumentException("客户ID无效");
        }
        if (portfolioId == null || portfolioId.trim().isEmpty()) {
            throw new IllegalArgumentException("组合ID无效");
        }
        
        // 这里可以添加更多的业务校验逻辑
        // 例如：查询客户表验证客户是否存在
        // 例如：查询组合表验证组合是否存在
        // 例如：验证客户是否有权限操作该组合
    }
}
