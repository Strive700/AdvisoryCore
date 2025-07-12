# 交割单查询接口实现

## 项目概述
本项目实现了一个完整的交割单查询接口，使用 Spring Boot + MyBatis 技术栈。

## 功能特性
- ✅ 分页查询交割单列表
- ✅ 多条件过滤（客户ID、组合ID、基金代码、交易类型、日期范围）
- ✅ LEFT JOIN 关联查询 settlement_orders 和 trade_orders 表
- ✅ 自动参数验证和默认值设置
- ✅ 异常处理和错误响应
- ✅ 完整的单元测试

## 技术栈
- Spring Boot 3.5.3
- MyBatis 3.0.3
- MySQL 8.0+
- Lombok
- JUnit 5

## 项目结构

```
src/main/java/com/xxx/advisoryCore/
├── Controller/
│   └── DeliveryOrderController.java          # 控制器层
├── Service/
│   ├── DeliveryOrderService.java             # 服务接口
│   └── ServiceImpl/
│       └── DeliveryOrderServiceImpl.java     # 服务实现
├── Mapper/
│   └── DeliveryOrderMapper.java              # MyBatis映射接口
├── Dto/
│   ├── DeliveryOrderQueryRequest.java        # 查询请求DTO
│   ├── DeliveryOrderResponse.java            # 响应DTO
│   ├── PageResponse.java                     # 分页响应DTO
│   └── ApiResponse.java                      # API响应DTO
└── Entity/
    └── DeliveryOrder.java                    # 实体类

src/main/resources/
└── Mapper/
    └── DeliveryOrderMapper.xml               # MyBatis XML映射文件

src/test/java/com/xxx/advisoryCore/
└── Controller/
    └── DeliveryOrderControllerTest.java      # 单元测试
```

## 数据库表结构

### settlement_orders 表
```sql
CREATE TABLE settlement_orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    batch_no VARCHAR(50) NOT NULL,
    portfolio_name VARCHAR(100),
    portfolio_id INT,
    fund_name VARCHAR(100),
    fund_code VARCHAR(20),
    trade_order_id INT
);
```

### trade_orders 表
```sql
CREATE TABLE trade_orders (
    tradeid INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    trade_type VARCHAR(10),
    trade_time DATETIME,
    executed_shares DECIMAL(15,2),
    executed_amount DECIMAL(15,2),
    executed_price DECIMAL(10,4),
    commission DECIMAL(10,2),
    tax DECIMAL(10,2),
    execution_time DATETIME,
    status VARCHAR(20),
    source_system VARCHAR(50)
);
```

## 快速开始

### 1. 环境要求
- JDK 21+
- MySQL 8.0+
- Gradle 7.0+

### 2. 数据库配置
修改 `src/main/resources/application.properties` 中的数据库连接信息：
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/your_database
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### 3. 运行项目
```bash
# 使用 Gradle 运行
./gradlew bootRun

# 或者构建后运行
./gradlew build
java -jar build/libs/AdvisoryCore-0.0.1-SNAPSHOT.jar
```

### 4. 测试接口
```bash
# 基础查询
curl "http://localhost:8080/api/delivery_orders"

# 分页查询
curl "http://localhost:8080/api/delivery_orders?page=1&pageSize=10"

# 条件过滤
curl "http://localhost:8080/api/delivery_orders?customerId=10001&fundCode=FUND_X"

# 日期范围查询
curl "http://localhost:8080/api/delivery_orders?tradeDateStart=2025-06-01&tradeDateEnd=2025-06-30"
```

## 接口文档
详细的接口文档请参考：[交割单查询接口文档.md](交割单查询接口文档.md)

## 测试
```bash
# 运行所有测试
./gradlew test

# 运行特定测试
./gradlew test --tests DeliveryOrderControllerTest
```

## 主要特性说明

### 1. 分页查询
- 支持自定义页码和每页大小
- 自动验证分页参数，无效参数会重置为默认值
- 返回总记录数、当前页码、每页大小和数据列表

### 2. 多条件过滤
- 客户ID：精确匹配 trade_orders.customer_id
- 组合ID：精确匹配 settlement_orders.portfolio_id
- 基金代码：模糊匹配 settlement_orders.fund_code
- 交易类型：精确匹配 trade_orders.trade_type
- 日期范围：范围匹配 trade_orders.trade_time

### 3. 数据关联
- 使用 LEFT JOIN 关联 settlement_orders 和 trade_orders 表
- 仅查询状态为 'EXECUTED' 或 'PARTIAL_FILLED' 的交易记录
- 按 settlement_orders.id 降序排列

### 4. 异常处理
- SQL 查询失败返回 500 错误
- 分页参数非法时自动重置为默认值
- 详细的错误日志记录

## 扩展建议

1. **缓存优化**：可以添加 Redis 缓存来提高查询性能
2. **权限控制**：可以添加 Spring Security 进行权限验证
3. **数据导出**：可以添加 Excel/CSV 导出功能
4. **实时通知**：可以添加 WebSocket 实时推送功能
5. **监控告警**：可以添加 Prometheus + Grafana 监控

## 贡献指南
1. Fork 本项目
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 许可证
MIT License 