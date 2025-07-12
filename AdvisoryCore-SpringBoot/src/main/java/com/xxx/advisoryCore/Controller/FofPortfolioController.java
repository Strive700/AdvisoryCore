package com.xxx.advisoryCore.Controller;

import com.xxx.advisoryCore.Entity.FofPortfolio;
import com.xxx.advisoryCore.Service.FofPortfolioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/fof-portfolio")
public class FofPortfolioController {

    @Autowired
    private FofPortfolioService fofPortfolioService;

    /**
     * 添加FOF组合
     * @param fofPortfolio FOF组合对象（JSON）
     * @return 插入结果
     */
    @PostMapping("")
    public ResponseEntity<?> addFofPortfolio(@RequestBody FofPortfolio fofPortfolio) {
        System.out.println("调用接口: addFofPortfolio(), body=" + fofPortfolio);
        int result = fofPortfolioService.insertFofPortfolio(fofPortfolio);
        if (result > 0) {
            return ResponseEntity.status(HttpStatus.CREATED).body("插入成功");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("插入失败");
        }
    }
} 