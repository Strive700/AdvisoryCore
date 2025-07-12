# 智能投资顾问系统

一个基于 Vue 3 + TypeScript + Element Plus 的现代化智能投资顾问系统前端应用。

## 🚀 项目简介

本项目是一个专业的投资顾问系统，提供全面的投资管理功能，包括基础基金信息、因子分析、资产配置、投资组合构建和交易管理等核心模块。

## 📊 功能模块

### 🏠 主模块 (Main)
- **首页**: 系统概览和快速导航
- **关于**: 系统信息和使用说明

### 📈 模型1 - 基础基金信息 (Model1)
- **基础基金管理**: 基金基本信息维护
- **基金公司管理**: 基金公司信息管理
- **基金经理管理**: 基金经理信息维护

### 🔍 模型2 - 因子分析 (Model2)
- **因子树分析**: 因子层级结构展示
- **因子选择**: 多步骤因子选择流程
- **衍生因子创建**: 自定义因子构建
- **因子权重设置**: 因子权重配置
- **风格因子权重**: 风格因子权重管理
- **基金选项**: 基金筛选和选择

### 💼 模型3 - 资产配置 (Model3)
- **资产配置**: 资产配置策略制定
- **资产信息**: 资产详细信息展示
- **资产矩阵**: 资产关联分析
- **资产研究**: 资产深度研究
- **资产选择**: 资产筛选工具
- **FOF管理**: 基金中基金配置
- **投资组合创建**: 组合构建工具
- **指数创建**: 自定义指数构建
- **策略详情**: 投资策略展示
- **择时管理**: 市场择时功能

### 🎯 模型4 - 投资组合构建 (Model4)
- **投资组合基础信息**: 组合基本信息管理
- **投资组合构建**: 组合构建流程
- **产品详情**: 产品详细信息
- **基金池视图**: 基金池管理

### 📋 模型5 - 交易管理 (Model5)
- **账户再平衡**: 账户资产再平衡
- **所有订单**: 订单总览管理
- **交割订单**: 交割订单处理
- **失败订单**: 失败订单管理
- **交易订单**: 交易订单处理
- **替换订单**: 订单替换功能

## 🛠️ 技术栈

### 前端框架
- **Vue 3**: 渐进式JavaScript框架
- **TypeScript**: 类型安全的JavaScript超集
- **Vue Router 4**: 官方路由管理器
- **Pinia**: 状态管理库

### UI组件库
- **Element Plus**: 基于Vue 3的组件库
- **@element-plus/icons-vue**: Element Plus图标库

### 图表和可视化
- **ECharts**: 数据可视化图表库
- **vue-echarts**: Vue 3的ECharts组件

### 工具库
- **Axios**: HTTP客户端
- **Day.js**: 轻量级日期处理库
- **Lodash-es**: 实用工具库

### 开发工具
- **Vite**: 下一代前端构建工具
- **ESLint**: 代码质量检查
- **TypeScript**: 类型检查

## 📦 安装和运行

### 环境要求
- Node.js >= 16.0.0
- npm >= 8.0.0

### 快速开始

1. **克隆项目**
```bash
git clone <repository-url>
cd "Investment Advisor"
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

### 构建和部署

```bash
# 类型检查
npm run type-check

# 代码检查
npm run lint

# 生产环境构建
npm run build

# 预览生产构建
npm run preview
```

## 📁 项目结构

```
Investment Advisor/
├── public/                 # 静态资源
├── src/
│   ├── assets/            # 样式和静态资源
│   │   ├── base.css       # 基础样式
│   │   ├── logo.svg       # 项目logo
│   │   └── main.css       # 主样式文件
│   ├── components/        # 公共组件
│   │   ├── model1/        # 基础基金相关组件
│   │   ├── model2/        # 因子分析相关组件
│   │   ├── model3/        # 资产配置相关组件
│   │   ├── model4/        # 投资组合相关组件
│   │   └── model5/        # 交易管理相关组件
│   ├── router/            # 路由配置
│   │   └── index.ts       # 路由定义
│   ├── stores/            # 状态管理
│   │   └── counter.ts     # 计数器状态示例
│   ├── views/             # 页面组件
│   │   ├── main/          # 主页面
│   │   ├── model1/        # 基础基金页面
│   │   ├── model2/        # 因子分析页面
│   │   ├── model3/        # 资产配置页面
│   │   ├── model4/        # 投资组合页面
│   │   └── model5/        # 交易管理页面
│   ├── App.vue            # 根组件
│   └── main.ts            # 应用入口
├── package.json           # 项目配置
├── tsconfig.json          # TypeScript配置
├── vite.config.ts         # Vite配置
└── README.md              # 项目说明
```

## 🎨 设计特色

### 模块化架构
- 清晰的模块划分，便于维护和扩展
- 组件化开发，提高代码复用性
- 类型安全的TypeScript开发

### 用户体验
- 现代化的UI设计
- 响应式布局，支持多设备
- 流畅的页面交互
- 直观的数据可视化

### 功能完整性
- 覆盖投资管理的全流程
- 从基础信息到交易执行的完整链路
- 专业的投资分析工具

## 🔧 开发指南

### 代码规范
- 使用ESLint进行代码检查
- 遵循TypeScript类型规范
- 组件命名采用PascalCase
- 文件命名采用kebab-case

### 组件开发
- 使用Composition API
- 组件props使用TypeScript接口定义
- 事件使用emit定义
- 样式使用scoped CSS

### 状态管理
- 使用Pinia进行状态管理
- 按模块划分store
- 使用TypeScript定义store类型

## 🚀 部署说明

### 开发环境
1. 确保Node.js环境正确安装
2. 克隆项目并安装依赖
3. 运行 `npm run dev` 启动开发服务器
4. 访问 `http://localhost:5173`

### 生产环境
1. 运行 `npm run build` 构建生产版本
2. 将 `dist` 目录部署到Web服务器
3. 配置服务器支持SPA路由（history模式）

### 环境变量
- 开发环境：`.env.development`
- 生产环境：`.env.production`

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支：`git checkout -b feature/新功能`
3. 提交更改：`git commit -m '添加新功能'`
4. 推送分支：`git push origin feature/新功能`
5. 提交 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系方式

如有问题或建议，请通过以下方式联系：
- 项目地址：https://github.com/your-username/investment-advisor
- 邮箱：your-email@example.com

## 🙏 致谢

感谢以下开源项目的支持：
- [Vue.js](https://vuejs.org/) - 渐进式JavaScript框架
- [Element Plus](https://element-plus.org/) - Vue 3组件库
- [ECharts](https://echarts.apache.org/) - 数据可视化图表库
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [TypeScript](https://www.typescriptlang.org/) - JavaScript的超集

---

**注意**: 本项目仅供学习和研究使用，不构成投资建议。投资有风险，入市需谨慎。
