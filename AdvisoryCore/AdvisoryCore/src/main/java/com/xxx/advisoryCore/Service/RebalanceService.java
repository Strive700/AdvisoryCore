package com.xxx.advisoryCore.Service;

import com.xxx.advisoryCore.Dto.AccountRebalanceSubmitRequest;
import com.xxx.advisoryCore.Dto.AccountRebalanceSubmitResponse;

public interface RebalanceService {
    
    /**
     * 提交账户独立调仓任务
     */
    AccountRebalanceSubmitResponse submitAccountRebalance(AccountRebalanceSubmitRequest request);
}
