# 投顾中台系统 (AdvisoryCore-Harmony)

## 📱 项目简介

投顾中台系统是一个基于HarmonyOS开发的基金投资顾问管理平台，为投资顾问提供全面的基金管理和分析工具。系统采用ArkUI框架开发，具有现代化的用户界面和流畅的用户体验。

![应用演示](screenshots/device/demo.gif)

## ✨ 主要功能

### 🔐 用户认证
- 安全的用户登录系统
- 支持账号密码认证
- 登录状态管理

### 📊 基金管理
- **基础基金管理**: 基金信息查看、筛选和管理
- **基金公司管理**: 基金公司信息维护和查询
- **基金经理管理**: 基金经理档案和业绩分析
- **基金备选库**: 基金池管理和筛选

### 🔧 衍生因子
- **创建衍生因子**: 自定义因子创建和配置
- **衍生因子选择**: 因子筛选和组合管理

## 🛠️ 技术栈

- **开发框架**: HarmonyOS ArkUI
- **编程语言**: ArkTS
- **网络请求**: @ohos/axios
- **UI组件**: HarmonyOS原生组件
- **开发工具**: DevEco Studio

## 📋 系统要求

### 开发环境
- **DevEco Studio**: DevEco Studio NEXT Developer Beta1及以上
- **HarmonyOS SDK**: HarmonyOS NEXT Developer Beta1 SDK及以上
- **Node.js**: 建议使用LTS版本

### 运行环境
- **HarmonyOS系统**: HarmonyOS NEXT Developer Beta1及以上
- **支持设备**: 华为手机（标准系统）

## 🚀 快速开始

### 1. 环境准备
确保你的开发环境满足上述系统要求。

### 2. 克隆项目
```bash
git clone [项目地址]
cd AdvisoryCore-Harmony
```

### 3. 安装依赖
```bash
npm install
```

### 4. 运行项目
1. 使用DevEco Studio打开项目
2. 连接华为设备或启动模拟器
3. 点击运行按钮，选择目标设备
4. 等待应用安装和启动

## 📱 使用指南

### 登录系统
1. 启动应用后，进入登录页面
2. 输入账号和密码
3. 点击"登录"按钮
4. 登录成功后自动跳转到主页面

### 功能导航
主页面提供以下功能模块：
- **基础基金**: 查看和管理基础基金信息
- **创建衍生因子**: 创建自定义投资因子
- **衍生因子选择**: 筛选和管理衍生因子
- **基金公司**: 管理基金公司信息
- **基金经理**: 查看基金经理档案
- **基金备选库**: 管理基金备选池

## 🏗️ 项目结构

```
AdvisoryCore-Harmony/
├── AppScope/                 # 应用级配置
│   ├── app.json5            # 应用配置文件
│   └── resources/           # 应用级资源
├── entry/                   # 主模块
│   ├── src/main/ets/       # 主要代码目录
│   │   ├── common/         # 公共组件和常量
│   │   ├── entryability/   # 应用入口
│   │   ├── pages/          # 页面组件
│   │   ├── utility/        # 工具类
│   │   ├── view/           # 视图组件
│   │   └── viewmodel/      # 视图模型
│   ├── resources/          # 模块资源
│   └── module.json5        # 模块配置
├── hvigor/                 # 构建配置
├── oh_modules/            # 依赖模块
└── screenshots/           # 截图和演示
```

## 🔧 开发指南

### 页面开发
- 使用ArkTS语言开发
- 遵循ArkUI组件规范
- 采用声明式UI编程模式

### 网络请求
项目使用@ohos/axios进行网络请求：
```typescript
import RequestAxios from '../utility/BaseRequest'

// 发送POST请求
RequestAxios.post<ResponseType>('/api/endpoint', data)
  .then((response) => {
    // 处理响应
  })
  .catch((error) => {
    // 处理错误
  });
```

### 路由导航
使用HarmonyOS路由系统进行页面跳转：
```typescript
import router from '@ohos.router';

// 页面跳转
router.pushUrl({ url: 'pages/TargetPage' });

// 页面替换
router.replaceUrl({ url: 'pages/TargetPage' });
```

## 📄 许可证

本项目采用Apache License 2.0许可证。详见 [LICENSE](LICENSE) 文件。

## 🤝 贡献指南

欢迎提交Issue和Pull Request来改进项目。

### 贡献流程
1. Fork本项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建Pull Request

## 📞 联系方式

如有问题或建议，请通过以下方式联系：
- 提交Issue
- 发送邮件至项目维护者

## 🔄 更新日志

### v1.0.0
- 初始版本发布
- 实现基础基金管理功能
- 添加用户登录系统
- 集成衍生因子管理模块

---

**注意**: 本项目仅支持HarmonyOS系统，请确保在兼容的设备上运行。
