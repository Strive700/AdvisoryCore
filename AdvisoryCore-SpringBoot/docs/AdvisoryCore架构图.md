# AdvisoryCore 系统架构图

## 1. 整体系统架构图

```mermaid
graph TB
    subgraph "前端层"
        A[Web前端]
        B[Mobile App]
    end
    
    subgraph "应用服务层"
        C[基金服务]
        D[交易服务]
        E[组合服务]
        F[因子服务]
    end
    
    subgraph "数据层"
        G[(MySQL)]
        H[Redis缓存]
    end
    
    subgraph "监控层"
        I[监控系统]
    end
    
    A --> C
    B --> C
    C --> D
    D --> E
    E --> F
    
    C --> G
    D --> G
    E --> G
    F --> G
    
    C --> H
    D --> H
    E --> H
    F --> H
    
    C --> I
    D --> I
    E --> I
    F --> I
```

## 2. 分层架构图

```mermaid
graph TB
    subgraph "表现层"
        A[Controller]
    end
    
    subgraph "业务层"
        B[Service]
    end
    
    subgraph "数据层"
        C[Mapper]
        D[(数据库)]
    end
    
    A --> B
    B --> C
    C --> D
```

## 3. 核心业务模块图

```mermaid
graph LR
    A[基金管理] --> B[交易管理]
    B --> C[组合管理]
    C --> D[因子管理]
    D --> E[指数管理]
```

## 4. 数据流图

```mermaid
flowchart TD
    A[用户请求] --> B[Controller]
    B --> C[Service]
    C --> D[Mapper]
    D --> E[数据库]
    E --> F[返回响应]
```

## 5. 数据库关系图

```mermaid
erDiagram
    FUNDS {
        string fund_code PK
        string fund_name
        int manager_id FK
    }
    
    TRADE_ORDERS {
        int trade_id PK
        string fund_code FK
        string status
    }
    
    PORTFOLIOS {
        int portfolio_id PK
        string name
    }
    
    FUNDS ||--o{ TRADE_ORDERS : "交易"
    PORTFOLIOS ||--o{ TRADE_ORDERS : "包含"
```

## 6. 部署架构图

```mermaid
graph TB
    subgraph "负载均衡"
        LB[Load Balancer]
    end
    
    subgraph "应用服务器"
        APP1[App Server 1]
        APP2[App Server 2]
    end
    
    subgraph "数据库"
        DB[(MySQL)]
    end
    
    subgraph "缓存"
        REDIS[Redis]
    end
    
    LB --> APP1
    LB --> APP2
    APP1 --> DB
    APP2 --> DB
    APP1 --> REDIS
    APP2 --> REDIS
```

## 7. 微服务架构图

```mermaid
graph TB
    subgraph "API网关"
        GATEWAY[Gateway]
    end
    
    subgraph "微服务"
        FUND[基金服务]
        TRADE[交易服务]
        PORTFOLIO[组合服务]
        FACTOR[因子服务]
    end
    
    GATEWAY --> FUND
    GATEWAY --> TRADE
    GATEWAY --> PORTFOLIO
    GATEWAY --> FACTOR
```

## 8. 技术栈图

```mermaid
graph TB
    A[Spring Boot] --> B[MyBatis]
    B --> C[MySQL]
    A --> D[Lombok]
    A --> E[Gradle]
```

## 9. 安全架构图

```mermaid
graph TB
    A[认证] --> B[授权]
    B --> C[加密]
    C --> D[审计]
```

## 10. 性能优化图

```mermaid
graph LR
    A[缓存] --> B[数据库优化]
    C[异步处理] --> D[连接池]
```

## 11. 监控架构图

```mermaid
graph TB
    A[数据收集] --> B[数据处理]
    B --> C[监控展示]
    B --> D[告警通知]
```

## 12. 开发流程图

```mermaid
graph LR
    A[需求] --> B[开发]
    B --> C[测试]
    C --> D[部署]
    D --> E[运维]
```

---

*这些简化后的架构图保留了系统的核心架构信息，更加简洁易读，便于快速理解系统结构。* 