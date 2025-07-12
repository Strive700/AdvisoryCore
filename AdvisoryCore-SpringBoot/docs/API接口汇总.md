# AdvisoryCore API接口汇总文档

## 1. 基金相关接口

### 1.1 基金查询接口
**Controller**: `FundsController`

| 接口路径 | 方法 | 描述 | 请求参数 | 响应格式 |
|---------|------|------|----------|----------|
| `/api/funds/queryWithJoin` | POST | 基金连表查询 | `FundQueryRequest` | `FundQueryResponse` |
| `/api/funds/Fund_Image` | POST | 基金图片查询 | `Map<String,Object>` | `Map<String,Object>` |

### 1.2 基金公司接口
**Controller**: `FundCompanyController`

| 接口路径 | 方法 | 描述 | 请求参数 | 响应格式 |
|---------|------|------|----------|----------|
| `/api/fund-company/query` | POST | 基金公司查询 | `FundCompanyQueryRequest` | `ApiResponse` |

### 1.3 基金经理接口
**Controller**: `FundManagerController`

| 接口路径 | 方法 | 描述 | 请求参数 | 响应格式 |
|---------|------|------|----------|----------|
| `/api/fund-manager/query` | POST | 基金经理查询 | `FundManagerQueryRequest` | `ApiResponse` |

### 1.4 基金预警接口
**Controller**: `FundAlertController`

| 接口路径 | 方法 | 描述 | 请求参数 | 响应格式 |
|---------|------|------|----------|----------|
| `/api/fund-alert/set` | POST | 设置基金预警 | `SetFundAlertRequest` | `ApiResponse` |

### 1.5 基金备选库接口
**Controller**: `FundWatchlistController`

| 接口路径 | 方法 | 描述 | 请求参数 | 响应格式 |
|---------|------|------|----------|----------|
| `/api/fund-watchlist/add` | POST | 添加基金到备选库 | `FundWatchlist` | `ApiResponse` |
| `/api/fund-watchlist/query` | GET | 查询备选库 | - | `ApiResponse` |

## 2. 交易相关接口

### 2.1 交易指令接口
**Controller**: `TradeOrderController`

| 接口路径 | 方法 | 描述 | 请求参数 | 响应格式 |
|---------|------|------|----------|----------|
| `/api/trade/orders` | GET | 交易指令查询 | `TradeOrderQueryRequest` | `ApiResponse<PageResponse<TradeOrder>>` |
| `/api/trade/orders/failed` | GET | 失败交易指令查询 | `FailedTradeOrderQueryRequest` | `ApiResponse<PageResponse<TradeOrder>>` |
| `/api/trade/orders/bulk_issue` | POST | 批量下单 | `BulkIssueTradeOrderRequest` | `ApiResponse<BulkIssueTradeOrderResponse>` |
| `/api/trade/orders/bulk_reject` | POST | 批量驳回 | `BulkRejectTradeOrderRequest` | `ApiResponse<BulkRejectTradeOrderResponse>` |
| `/api/trade/orders/{tradeId}/replace` | POST | 替换交易指令 | `ReplaceTradeOrderRequest` | `ApiResponse<ReplaceTradeOrderResponse>` |

### 2.2 交割单接口
**Controller**: `DeliveryOrderController`

| 接口路径 | 方法 | 描述 | 请求参数 | 响应格式 |
|---------|------|------|----------|----------|
| `/api/delivery-orders/query` | POST | 交割单查询 | `DeliveryOrderQueryRequest` | `ApiResponse<PageResponse<DeliveryOrder>>` |

### 2.3 结算单接口
**Controller**: `SettlementOrdersController`

| 接口路径 | 方法 | 描述 | 请求参数 | 响应格式 |
|---------|------|------|----------|----------|
| `/api/settlement-orders/query` | POST | 结算单查询 | `SettlementOrderRequest` | `ApiResponse` |

## 3. 组合管理接口

### 3.1 投资组合接口
**Controller**: `PortfolioController`

| 接口路径 | 方法 | 描述 | 请求参数 | 响应格式 |
|---------|------|------|----------|----------|
| `/api/portfolio/create` | POST | 创建组合 | `Portfolio` | `ApiResponse` |
| `/api/portfolio/list` | GET | 组合列表查询 | - | `ApiResponse` |
| `/api/portfolio/{id}` | GET | 组合详情查询 | - | `ApiResponse` |

### 3.2 FOF组合接口
**Controller**: `FofPortfolioController`

| 接口路径 | 方法 | 描述 | 请求参数 | 响应格式 |
|---------|------|------|----------|----------|
| `/api/fof-portfolio/add` | POST | 添加FOF组合 | `FofPortfolio` | `ApiResponse` |

### 3.3 择时组合接口
**Controller**: `TimingPortfolioController`

| 接口路径 | 方法 | 描述 | 请求参数 | 响应格式 |
|---------|------|------|----------|----------|
| `/api/timing-portfolio/add` | POST | 添加择时组合 | `TimingPortfolio` | `ApiResponse` |

### 3.4 调仓接口
**Controller**: `RebalanceController`

| 接口路径 | 方法 | 描述 | 请求参数 | 响应格式 |
|---------|------|------|----------|----------|
| `/api/rebalance/submit` | POST | 提交调仓 | `RebalanceManualSubmitRequest` | `ApiResponse` |
| `/api/rebalance/account` | POST | 账户独立调仓 | `AccountRebalanceSubmitRequest` | `ApiResponse<AccountRebalanceSubmitResponse>` |

## 4. 因子管理接口

### 4.1 基础因子接口
**Controller**: `FactorController`

| 接口路径 | 方法 | 描述 | 请求参数 | 响应格式 |
|---------|------|------|----------|----------|
| `/api/factor/add` | POST | 添加因子 | `FactorDefinition` | `ApiResponse` |
| `/api/factor/tree` | GET | 因子树查询 | - | `ApiResponse` |

### 4.2 衍生因子接口
**Controller**: `DerivedFactorController`

| 接口路径 | 方法 | 描述 | 请求参数 | 响应格式 |
|---------|------|------|----------|----------|
| `/api/derived-factor/add` | POST | 添加衍生因子 | `AddDerivedFactorRequest` | `ApiResponse<AddDerivedFactorResponse>` |
| `/api/derived-factor/query` | GET | 衍生因子查询 | - | `ApiResponse` |

### 4.3 自定义风格因子接口
**Controller**: `CustomStyleFactorController`

| 接口路径 | 方法 | 描述 | 请求参数 | 响应格式 |
|---------|------|------|----------|----------|
| `/api/custom-style-factor/add` | POST | 添加自定义风格因子 | `AddCustomStyleFactorRequest` | `ApiResponse<AddCustomStyleFactorResponse>` |

### 4.4 自定义风格因子组合接口
**Controller**: `CustomStyleFactorMixController`

| 接口路径 | 方法 | 描述 | 请求参数 | 响应格式 |
|---------|------|------|----------|----------|
| `/api/custom-style-factor-mix/add` | POST | 添加自定义风格因子组合 | `CustomStyleFactorMix` | `ApiResponse` |

## 5. 指数管理接口

### 5.1 指数定义接口
**Controller**: `IndexController`

| 接口路径 | 方法 | 描述 | 请求参数 | 响应格式 |
|---------|------|------|----------|----------|
| `/api/index/add` | POST | 添加指数 | `IndexDefinition` | `ApiResponse` |
| `/api/index/tree` | GET | 指数树查询 | - | `ApiResponse` |
| `/api/index/{name}` | GET | 根据名称查询指数 | - | `ApiResponse` |
| `/api/index/{name}` | PUT | 根据名称修改指数 | `IndexDefinition` | `ApiResponse` |
| `/api/index/{name}/funds` | GET | 根据指数名称查询基金列表 | - | `ApiResponse` |

### 5.2 基金指数映射接口
**Controller**: `FundIndexMappingController`

| 接口路径 | 方法 | 描述 | 请求参数 | 响应格式 |
|---------|------|------|----------|----------|
| `/api/fund-index-mapping/add` | POST | 添加基金指数映射 | `FundIndexMapping` | `ApiResponse` |

### 5.3 基金因子映射接口
**Controller**: `FundFactorMappingController`

| 接口路径 | 方法 | 描述 | 请求参数 | 响应格式 |
|---------|------|------|----------|----------|
| `/api/fund-factor-mapping/add` | POST | 添加基金因子映射 | `FundFactorMapping` | `ApiResponse` |

## 6. 资产配置接口

### 6.1 资产配置接口
**Controller**: `AssetAllocationController`

| 接口路径 | 方法 | 描述 | 请求参数 | 响应格式 |
|---------|------|------|----------|----------|
| `/api/asset-allocation/add` | POST | 添加资产配置 | `AssetAllocation` | `ApiResponse` |

### 6.2 资产配置列表接口
**Controller**: `AssetAllocationListController`

| 接口路径 | 方法 | 描述 | 请求参数 | 响应格式 |
|---------|------|------|----------|----------|
| `/api/asset-allocation-list/add` | POST | 添加资产配置列表 | `AssetAllocationList` | `ApiResponse` |

## 7. 约束管理接口

### 7.1 约束组接口
**Controller**: `ConstraintGroupController`

| 接口路径 | 方法 | 描述 | 请求参数 | 响应格式 |
|---------|------|------|----------|----------|
| `/api/constraint-group/add` | POST | 添加约束组 | `ConstraintGroup` | `ApiResponse` |

### 7.2 约束项接口
**Controller**: `ConstraintItemController`

| 接口路径 | 方法 | 描述 | 请求参数 | 响应格式 |
|---------|------|------|----------|----------|
| `/api/constraint-item/add` | POST | 添加约束项 | `ConstraintItem` | `ApiResponse` |

## 8. 方案管理接口

### 8.1 方案接口
**Controller**: `PlanController`

| 接口路径 | 方法 | 描述 | 请求参数 | 响应格式 |
|---------|------|------|----------|----------|
| `/api/plan/add` | POST | 添加方案 | `Plan` | `ApiResponse` |
| `/api/plan/list` | GET | 方案列表查询 | - | `ApiResponse` |
| `/api/plan/{id}` | PUT | 更新方案 | `Plan` | `ApiResponse` |
| `/api/plan/{id}` | DELETE | 删除方案 | - | `ApiResponse` |

## 9. 用户认证接口

### 9.1 登录接口
**Controller**: `Login`

| 接口路径 | 方法 | 描述 | 请求参数 | 响应格式 |
|---------|------|------|----------|----------|
| `/api/login` | POST | 用户登录 | `LoginRequest` | `ApiResponse<LoginResponse>` |

## 10. 统一响应格式

### 10.1 成功响应
```json
{
  "code": 0,
  "message": "操作成功",
  "data": {}
}
```

### 10.2 分页响应
```json
{
  "code": 0,
  "message": "查询成功",
  "data": {
    "list": [],
    "total": 100,
    "pageNum": 1,
    "pageSize": 10
  }
}
```

### 10.3 错误响应
```json
{
  "code": 500,
  "message": "操作失败: 具体错误信息",
  "data": null
}
```

## 11. 接口调用示例

### 11.1 基金查询示例
```bash
curl -X POST http://localhost:8080/api/funds/queryWithJoin \
  -H "Content-Type: application/json" \
  -d '{
    "code": "000001",
    "pageNum": 1,
    "pageSize": 10
  }'
```

### 11.2 交易指令查询示例
```bash
curl -X GET "http://localhost:8080/api/trade/orders?pageNum=1&pageSize=10&status=pending" \
  -H "Content-Type: application/json"
```

### 11.3 批量下单示例
```bash
curl -X POST http://localhost:8080/api/trade/orders/bulk_issue \
  -H "Content-Type: application/json" \
  -d '{
    "trade_ids": [1, 2, 3]
  }'
```

## 12. 接口规范

### 12.1 请求规范
- 所有POST请求使用JSON格式
- GET请求使用查询参数
- 分页参数统一使用`pageNum`和`pageSize`
- 时间格式统一使用ISO 8601格式

### 12.2 响应规范
- 所有接口返回统一的响应格式
- 成功操作返回code=0
- 错误操作返回对应的错误码
- 分页数据包含总数和分页信息

### 12.3 错误码规范
- 0: 成功
- 400: 请求参数错误
- 401: 未授权
- 403: 禁止访问
- 404: 资源不存在
- 500: 服务器内部错误

---

*本文档汇总了AdvisoryCore系统的所有API接口，包括接口路径、请求方法、参数格式和响应格式，为前端开发和接口调用提供了完整的参考。* 