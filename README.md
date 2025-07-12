# 智能投顾系统 (Investment Advisory System)

一个完整的智能投资顾问系统，包含前端Vue.js应用和后端Spring Boot API服务，提供基金投资管理、因子分析、交易指令管理等功能。

## 🏗️ 系统架构

本项目采用前后端分离架构：

- **前端**: Vue 3 + TypeScript + Element Plus (Investment Advisor)
- **后端**: Spring Boot + MyBatis + MySQL (AdvisoryCore)

```
实训项目/
├── Investment Advisor(2)/     # 前端应用
│   └── Investment Advisor/
│       ├── src/
│       │   ├── components/    # Vue组件
│       │   ├── views/         # 页面视图
│       │   ├── router/        # 路由配置
│       │   └── stores/        # 状态管理
│       └── package.json
└── AdvisoryCore/              # 后端API服务
    └── AdvisoryCore/
        ├── src/main/java/
        │   └── com/xxx/advisoryCore/
        │       ├── Controller/    # REST API控制器
        │       ├── Service/       # 业务逻辑层
        │       ├── Entity/        # 数据实体
        │       ├── Mapper/        # MyBatis映射器
        │       └── Dto/           # 数据传输对象
        └── build.gradle
```

## 🚀 主要功能

### 📊 基金投资管理
- **基金查询**: 支持多条件筛选基金信息
- **基金公司管理**: 基金公司信息查询和管理
- **基金经理管理**: 基金经理信息查询
- **基金自选**: 自选基金管理和监控
- **基金预警**: 基金价格和风险预警设置

### 🧮 因子分析系统
- **风格因子**: 创建和管理风格因子
- **衍生因子**: 衍生因子定义和权重设置
- **因子树**: 因子层级结构管理
- **因子权重**: 自定义因子权重配置

### 📈 交易指令管理
- **交易指令查询**: 多维度交易指令查询
- **批量下单**: 批量交易指令处理
- **失败指令处理**: 失败交易指令查询和重试
- **替代指令**: 交易指令替换功能
- **交割单管理**: 交割单查询和管理

### ⚖️ 调仓管理
- **账户调仓**: 账户独立调仓功能
- **调仓任务**: 调仓任务创建和管理
- **调仓详情**: 调仓明细查看

## 🛠️ 技术栈

### 前端技术栈
- **框架**: Vue 3.5.17
- **语言**: TypeScript 5.8.0
- **UI组件**: Element Plus 2.6.1
- **图表库**: ECharts 5.6.0 + Vue-ECharts 6.7.3
- **状态管理**: Pinia 3.0.3
- **路由**: Vue Router 4.5.1
- **HTTP客户端**: Axios 1.10.0
- **构建工具**: Vite (rolldown-vite)
- **包管理器**: npm

### 后端技术栈
- **框架**: Spring Boot 3.5.3
- **语言**: Java 21
- **数据库**: MySQL
- **ORM**: MyBatis 3.0.3
- **分页**: PageHelper 1.4.7
- **构建工具**: Gradle
- **依赖管理**: Spring Dependency Management 1.1.7

## 📦 安装和运行

### 环境要求
- **Node.js**: >= 16.0.0
- **npm**: >= 8.0.0
- **Java**: 21
- **MySQL**: 8.0+
- **Gradle**: 8.0+

### 前端启动

1. **进入前端目录**
```bash
cd "Investment Advisor(2)/Investment Advisor"
```

2. **安装依赖**
```bash
npm install
```

3. **启动开发服务器**
```bash
npm run dev
```

4. **访问应用**
打开浏览器访问 `http://localhost:5173`

### 后端启动

1. **进入后端目录**
```bash
cd AdvisoryCore/AdvisoryCore
```

2. **配置数据库**
编辑 `src/main/resources/application.properties`，配置MySQL连接信息

3. **启动应用**
```bash
./gradlew bootRun
```

4. **API服务地址**
默认运行在 `http://localhost:8080`

## 📁 项目结构详解

### 前端结构
```
src/
├── components/          # 组件目录
│   ├── model1/         # 基础基金管理组件
│   ├── model2/         # 因子分析组件
│   ├── model3/         # 预留模块
│   ├── model4/         # 交易指令组件
│   └── model5/         # 调仓管理组件
├── views/              # 页面视图
│   ├── main/           # 主要页面
│   ├── model1/         # 基础基金管理页面
│   ├── model2/         # 因子分析页面
│   ├── model3/         # 预留模块页面
│   ├── model4/         # 交易指令页面
│   └── model5/         # 调仓管理页面
├── router/             # 路由配置
├── stores/             # 状态管理
└── assets/             # 静态资源
```

### 后端结构
```
src/main/java/com/xxx/advisoryCore/
├── Controller/         # REST API控制器
│   ├── FundsController.java              # 基金管理
│   ├── FundCompanyController.java        # 基金公司管理
│   ├── FundManagerController.java        # 基金经理管理
│   ├── FundWatchlistController.java      # 基金自选
│   ├── FundAlertController.java          # 基金预警
│   ├── FactorController.java             # 因子管理
│   ├── DerivedFactorController.java      # 衍生因子
│   ├── CustomStyleFactorMixController.java # 风格因子
│   ├── TradeOrderController.java         # 交易指令
│   ├── DeliveryOrderController.java      # 交割单
│   └── RebalanceController.java          # 调仓管理
├── Service/            # 业务逻辑层
│   └── ServiceImpl/    # 服务实现
├── Entity/             # 数据实体
├── Mapper/             # MyBatis映射器
├── Dto/                # 数据传输对象
└── Config/             # 配置类
```

## 🔧 开发指南

### 前端开发
```bash
# 开发模式
npm run dev

# 类型检查
npm run type-check

# 代码检查
npm run lint

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

### 后端开发
```bash
# 运行应用
./gradlew bootRun

# 构建项目
./gradlew build

# 运行测试
./gradlew test

# 清理构建
./gradlew clean
```

## 📚 API文档

### 基金相关API
- `GET /api/funds` - 基金查询
- `GET /api/fund-companies` - 基金公司查询
- `GET /api/fund-managers` - 基金经理查询
- `POST /api/fund-watchlist` - 添加自选基金
- `POST /api/fund-alerts` - 设置基金预警

### 因子相关API
- `GET /api/factors` - 因子查询
- `POST /api/derived-factors` - 创建衍生因子
- `POST /api/style-factors` - 创建风格因子
- `PUT /api/factor-weights` - 设置因子权重

### 交易相关API
- `GET /api/trade-orders` - 交易指令查询
- `POST /api/trade-orders/bulk` - 批量下单
- `GET /api/delivery-orders` - 交割单查询
- `POST /api/trade-orders/replace` - 替代交易指令

### 调仓相关API
- `POST /api/rebalance/account` - 账户调仓
- `GET /api/rebalance/tasks` - 调仓任务查询

## 🎨 界面特色

### 现代化设计
- 响应式布局，支持多设备访问
- 深色侧边栏 + 浅色主内容区
- Element Plus组件库提供统一UI体验
- ECharts图表库提供丰富的数据可视化

### 用户体验
- 直观的导航结构
- 清晰的信息层级
- 便捷的操作流程
- 实时的数据反馈

## 🚀 部署说明

### 前端部署
1. 构建生产版本：`npm run build`
2. 将 `dist` 目录部署到Web服务器
3. 配置服务器支持SPA路由

### 后端部署
1. 构建JAR包：`./gradlew build`
2. 运行JAR包：`java -jar build/libs/AdvisoryCore-0.0.1-SNAPSHOT.jar`
3. 配置生产环境数据库连接

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支：`git checkout -b feature/AmazingFeature`
3. 提交更改：`git commit -m 'Add some AmazingFeature'`
4. 推送分支：`git push origin feature/AmazingFeature`
5. 提交 Pull Request

## 📄 许可证

本项目采用 MIT 许可证。

## 📞 联系方式

如有问题或建议，请通过以下方式联系：
- 项目地址：https://github.com/your-username/investment-advisory-system

## 🙏 致谢

感谢以下开源项目的支持：
- [Vue.js](https://vuejs.org/)
- [Spring Boot](https://spring.io/projects/spring-boot)
- [Element Plus](https://element-plus.org/)
- [ECharts](https://echarts.apache.org/)
- [MyBatis](https://mybatis.org/)