# 智能投顾系统 (Investment Advisory System)

一个完整的智能投资顾问系统，采用微服务架构，包含多个前端应用和后端API服务，通过Nginx反向代理统一管理，提供基金投资管理、因子分析、交易指令管理等功能。

## 部署网站
部署公网网址：116.62.82.244
## 登录方式
投顾前台和监控大屏
账号：admin
密码：123
投顾中台
账号：admin
密码：123456
## 🏗️ 系统架构

本项目采用微服务架构，通过Nginx反向代理统一管理多个应用：

### 前端应用
- **Investment Advisor**: Vue 3 + TypeScript + Element Plus (主要投顾系统)
- **Watch-Vue**: Vue 3 + TypeScript + ECharts (行情监控系统)
- **Investment_Advisor_Front_Desk-Vue**: Vue 3 + TypeScript (前台管理系统)
- **AdvisoryCore-Harmony**: HarmonyOS ArkUI (移动端应用)

### 后端服务
- **AdvisoryCore-SpringBoot**: Spring Boot + MyBatis + MySQL (主要API服务)
- **AdvisoryCore**: Spring Boot + MyBatis + MySQL (核心业务服务)

```
实训项目/
├── Investment Advisor(2)/           # 主要投顾系统前端
│   └── Investment Advisor/
│       ├── src/
│       │   ├── components/          # Vue组件
│       │   ├── views/               # 页面视图
│       │   ├── router/              # 路由配置
│       │   └── stores/              # 状态管理
│       └── package.json
├── Watch-Vue/                       # 行情监控系统
│   ├── src/
│   ├── package.json
│   └── 埋点接入说明.md
├── Investment_Advisor_Front_Desk-Vue/ # 前台管理系统
│   ├── src/
│   ├── package.json
│   └── 埋点接入说明.md
├── AdvisoryCore-SpringBoot/         # 主要API服务
│   ├── src/
│   ├── build.gradle
│   └── gradlew
├── AdvisoryCore/                    # 核心业务服务
│   └── AdvisoryCore/
│       ├── src/main/java/
│       │   └── com/xxx/advisoryCore/
│       │       ├── Controller/      # REST API控制器
│       │       ├── Service/         # 业务逻辑层
│       │       ├── Entity/          # 数据实体
│       │       ├── Mapper/          # MyBatis映射器
│       │       └── Dto/             # 数据传输对象
│       └── build.gradle
├── AdvisoryCore-Harmony/            # 移动端应用
│   ├── entry/
│   ├── AppScope/
│   └── oh-package.json5
└── nginx.conf                       # Nginx反向代理配置
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

### 📱 移动端功能
- **用户认证**: 安全的用户登录系统
- **基金管理**: 基金信息查看、筛选和管理
- **衍生因子**: 自定义因子创建和配置
- **基金备选库**: 基金池管理和筛选

### 📊 行情监控
- **实时行情**: 股票和基金实时价格监控
- **图表分析**: 多种技术指标和图表展示
- **市场数据**: 市场指数和板块分析
- **数据埋点**: 完整的用户行为数据收集

## 🛠️ 技术栈

### 前端技术栈
- **主要投顾系统**: Vue 3.5.17 + TypeScript + Element Plus 2.6.1
- **行情监控系统**: Vue 3.5.13 + TypeScript + ECharts 5.6.0 + Chart.js 4.5.0
- **前台管理系统**: Vue 3.5.13 + TypeScript + ECharts 5.6.0
- **移动端应用**: HarmonyOS ArkUI + ArkTS
- **状态管理**: Pinia 3.0.3 + pinia-plugin-persistedstate 4.3.0
- **路由**: Vue Router 4.5.0
- **HTTP客户端**: Axios 1.9.0
- **构建工具**: Vite 6.2.4
- **包管理器**: npm

### 后端技术栈
- **框架**: Spring Boot 3.5.3
- **语言**: Java 21
- **数据库**: MySQL
- **ORM**: MyBatis 3.0.3
- **分页**: PageHelper 1.4.7
- **测试覆盖**: Jacoco 0.8.10
- **构建工具**: Gradle
- **依赖管理**: Spring Dependency Management 1.1.7

### 部署技术栈
- **反向代理**: Nginx
- **负载均衡**: Nginx Upstream
- **静态资源**: Nginx Static Files
- **API网关**: Nginx Proxy

## 📦 安装和运行

### 环境要求
- **Node.js**: >= 16.0.0
- **npm**: >= 8.0.0
- **Java**: 21
- **MySQL**: 8.0+
- **Gradle**: 8.0+
- **Nginx**: 1.18+
- **DevEco Studio**: DevEco Studio NEXT Developer Beta1+ (移动端开发)

### 前端启动

#### 主要投顾系统
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

#### 行情监控系统
```bash
cd Watch-Vue
npm install
npm run dev
# 访问 http://localhost:5174
```

#### 前台管理系统
```bash
cd Investment_Advisor_Front_Desk-Vue
npm install
npm run dev
# 访问 http://localhost:5175
```

### 后端启动

#### 主要API服务
1. **进入后端目录**
```bash
cd AdvisoryCore-SpringBoot
```

2. **配置数据库**
编辑 `src/main/resources/application.properties`，配置MySQL连接信息

3. **启动应用**
```bash
./gradlew bootRun
```

4. **API服务地址**
默认运行在 `http://localhost:8080`

#### 核心业务服务
```bash
cd AdvisoryCore/AdvisoryCore
./gradlew bootRun
# 默认运行在 http://localhost:9090
```

### 移动端启动

1. **进入移动端目录**
```bash
cd AdvisoryCore-Harmony
```

2. **安装依赖**
```bash
npm install
```

3. **使用DevEco Studio打开项目**
4. **连接华为设备或启动模拟器**
5. **点击运行按钮，选择目标设备**

## 🌐 Nginx反向代理配置

### 配置说明
系统使用Nginx作为反向代理服务器，统一管理多个前端应用和后端API服务：

```nginx
# 主要投顾系统
location / {
    root   C:/Users/strive/Desktop/整合/portal;
    index  index.html;
}

# 前台管理系统
location /client/ {
    alias C:/Users/strive/Desktop/整合/dist_client/;
    index index.html;
    try_files $uri $uri/ /index.html;
}

# 行情监控系统
location /watch/ {
    alias C:/Users/strive/Desktop/整合/dist_watch/;
    index index.html;
    try_files $uri $uri/ /index.html;
}

# 主要API服务代理
location http://localhost:8080/ {
    proxy_pass http://localhost:8080/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}

# 核心业务服务代理
location /api2/ {
    proxy_pass http://localhost:9090/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
```

### 访问地址
- **主要投顾系统**: `http://localhost/`
- **前台管理系统**: `http://localhost/client/`
- **行情监控系统**: `http://localhost/watch/`
- **主要API服务**: `http://localhost:8080/`
- **核心业务服务**: `http://localhost/api2/`

### 部署步骤
1. **构建前端应用**
```bash
# 主要投顾系统
cd "Investment Advisor(2)/Investment Advisor"
npm run build

# 行情监控系统
cd Watch-Vue
npm run build

# 前台管理系统
cd Investment_Advisor_Front_Desk-Vue
npm run build
```

2. **配置Nginx**
- 将构建产物复制到对应目录
- 修改nginx.conf中的路径配置
- 重启Nginx服务

3. **启动后端服务**
- 确保两个Spring Boot服务正常运行
- 检查端口8080和9090是否可用

## 📁 项目结构详解

### 前端结构

#### 主要投顾系统 (Investment Advisor)
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

#### 行情监控系统 (Watch-Vue)
```
src/
├── components/          # 监控组件
├── views/              # 页面视图
├── router/             # 路由配置
├── stores/             # 状态管理
└── assets/             # 静态资源
```

#### 前台管理系统 (Investment_Advisor_Front_Desk-Vue)
```
src/
├── components/          # 管理组件
├── views/              # 页面视图
├── router/             # 路由配置
├── stores/             # 状态管理
└── assets/             # 静态资源
```

#### 移动端应用 (AdvisoryCore-Harmony)
```
entry/
├── src/main/ets/       # 主要代码目录
│   ├── common/         # 公共组件和常量
│   ├── entryability/   # 应用入口
│   ├── pages/          # 页面组件
│   ├── utility/        # 工具类
│   ├── view/           # 视图组件
│   └── viewmodel/      # 视图模型
├── resources/          # 模块资源
└── module.json5        # 模块配置
```

### 后端结构

#### 主要API服务 (AdvisoryCore-SpringBoot)
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

#### 核心业务服务 (AdvisoryCore)
```
src/main/java/com/xxx/advisoryCore/
├── Controller/         # REST API控制器
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

### 开发环境部署
1. **启动所有前端应用**
```bash
# 主要投顾系统
cd "Investment Advisor(2)/Investment Advisor"
npm run dev

# 行情监控系统
cd Watch-Vue
npm run dev

# 前台管理系统
cd Investment_Advisor_Front_Desk-Vue
npm run dev
```

2. **启动所有后端服务**
```bash
# 主要API服务
cd AdvisoryCore-SpringBoot
./gradlew bootRun

# 核心业务服务
cd AdvisoryCore/AdvisoryCore
./gradlew bootRun
```

3. **配置Nginx反向代理**
- 修改nginx.conf配置文件
- 重启Nginx服务

### 生产环境部署
1. **构建前端应用**
```bash
# 主要投顾系统
cd "Investment Advisor(2)/Investment Advisor"
npm run build

# 行情监控系统
cd Watch-Vue
npm run build

# 前台管理系统
cd Investment_Advisor_Front_Desk-Vue
npm run build
```

2. **构建后端服务**
```bash
# 主要API服务
cd AdvisoryCore-SpringBoot
./gradlew build

# 核心业务服务
cd AdvisoryCore/AdvisoryCore
./gradlew build
```

3. **部署配置**
- 将前端构建产物复制到Nginx配置的对应目录
- 运行后端JAR包：`java -jar build/libs/AdvisoryCore-0.0.1-SNAPSHOT.jar`
- 配置生产环境数据库连接
- 重启Nginx服务

### 移动端部署
1. **构建HarmonyOS应用**
- 使用DevEco Studio构建应用
- 生成HAP包
- 部署到华为应用市场或设备

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
- 15637818459

## 🙏 致谢

感谢以下开源项目的支持：
- [Vue.js](https://vuejs.org/)
- [Spring Boot](https://spring.io/projects/spring-boot)
- [Element Plus](https://element-plus.org/)
- [ECharts](https://echarts.apache.org/)
- [MyBatis](https://mybatis.org/)
- [HarmonyOS](https://www.harmonyos.com/)
- [Nginx](https://nginx.org/)
- [Chart.js](https://www.chartjs.org/)