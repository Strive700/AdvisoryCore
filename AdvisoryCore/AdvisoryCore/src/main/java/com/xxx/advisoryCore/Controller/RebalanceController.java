package com.xxx.advisoryCore.Controller;

import com.xxx.advisoryCore.Dto.AccountRebalanceSubmitRequest;
import com.xxx.advisoryCore.Dto.AccountRebalanceSubmitResponse;
import com.xxx.advisoryCore.Dto.ApiResponse;
import com.xxx.advisoryCore.Service.RebalanceService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rebalance")
public class RebalanceController {

    @Autowired
    private RebalanceService rebalanceService;

    /**
     * 提交账户独立调仓任务
     * POST /api/rebalance/account/submit
     */
    @PostMapping("/account/submit")
    public ResponseEntity<ApiResponse<AccountRebalanceSubmitResponse>> submitAccountRebalance(
            @Valid @RequestBody AccountRebalanceSubmitRequest request,
            BindingResult bindingResult) {
        
        // 参数校验
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(400, bindingResult.getAllErrors().get(0).getDefaultMessage()));
        }
        
        try {
            AccountRebalanceSubmitResponse response = rebalanceService.submitAccountRebalance(request);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.success("账户独立调仓任务提交成功", response));
        } catch (IllegalArgumentException e) {
            // 业务逻辑错误，返回400
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(400, e.getMessage()));
        } catch (Exception e) {
            // 其他异常，返回500
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error(500, "服务器内部错误: " + e.getMessage()));
        }
    }
}