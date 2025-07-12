# 鸿蒙开发项目 (HarmonyOS Development)

## 📱 项目概述

这是一个专注于鸿蒙系统开发的综合项目集合，包含多个基于HarmonyOS的应用和组件。项目采用最新的ArkUI框架和ArkTS语言，为开发者提供完整的鸿蒙应用开发解决方案。

## 🚀 项目列表

### [投顾中台系统 (AdvisoryCore-Harmony)](./AdvisoryCore-Harmony/)

一个专业的基金投资顾问管理平台，为投资顾问提供全面的基金管理和分析工具。

**主要功能：**
- 🔐 用户认证系统
- 📊 基金管理（基础基金、基金公司、基金经理、基金备选库）
- 🔧 衍生因子管理
- 📈 投资分析工具

**技术特点：**
- 基于HarmonyOS ArkUI框架
- 使用ArkTS编程语言
- 集成@ohos/axios网络请求
- 现代化UI设计

## 🛠️ 开发环境

### 系统要求
- **操作系统**: Windows 10/11, macOS, Linux
- **开发工具**: DevEco Studio NEXT Developer Beta1及以上
- **HarmonyOS SDK**: HarmonyOS NEXT Developer Beta1 SDK及以上
- **Node.js**: LTS版本

### 支持设备
- **目标设备**: 华为手机（标准系统）
- **系统版本**: HarmonyOS NEXT Developer Beta1及以上

## 📚 学习资源

### 官方文档
- [HarmonyOS开发者官网](https://developer.harmonyos.com/)
- [ArkUI开发指南](https://developer.harmonyos.com/cn/docs/documentation/doc-guides-V3/ui-arkui-overview-0000001053529601-V3)
- [ArkTS语言指南](https://developer.harmonyos.com/cn/docs/documentation/doc-guides-V3/arkts-overview-0000001473525144-V3)

### 开发工具
- [DevEco Studio下载](https://developer.harmonyos.com/cn/develop/deveco-studio/)
- [HarmonyOS SDK下载](https://developer.harmonyos.com/cn/develop/deveco-studio/)

## 🎯 快速开始

### 1. 环境准备
```bash
# 安装Node.js (如果未安装)
# 下载并安装DevEco Studio
# 配置HarmonyOS SDK
```

### 2. 克隆项目
```bash
git clone [项目地址]
cd 鸿蒙开发
```

### 3. 选择项目
```bash
# 进入投顾中台系统项目
cd AdvisoryCore-Harmony

# 安装依赖
npm install

# 使用DevEco Studio打开项目
```

### 4. 运行项目
1. 使用DevEco Studio打开项目
2. 连接华为设备或启动模拟器
3. 点击运行按钮
4. 选择目标设备并等待安装完成

## 📁 项目结构

```
鸿蒙开发/
├── AdvisoryCore-Harmony/          # 投顾中台系统
│   ├── AppScope/                  # 应用级配置
│   ├── entry/                     # 主模块
│   │   ├── src/main/ets/         # 主要代码
│   │   │   ├── pages/            # 页面组件
│   │   │   ├── utility/          # 工具类
│   │   │   └── viewmodel/        # 视图模型
│   │   └── resources/            # 资源文件
│   ├── hvigor/                   # 构建配置
│   └── README.md                 # 项目详细说明
├── README.md                     # 本文件
└── [其他项目...]                 # 未来可能添加的项目
```

## 🔧 开发指南

### ArkTS开发规范
- 使用声明式UI编程模式
- 遵循ArkUI组件规范
- 采用MVVM架构模式
- 使用TypeScript类型系统

### 网络请求
```typescript
import RequestAxios from '../utility/BaseRequest'

// 发送请求示例
RequestAxios.post<ResponseType>('/api/endpoint', data)
  .then((response) => {
    // 处理响应
  })
  .catch((error) => {
    // 处理错误
  });
```

### 页面导航
```typescript
import router from '@ohos.router';

// 页面跳转
router.pushUrl({ url: 'pages/TargetPage' });

// 页面替换
router.replaceUrl({ url: 'pages/TargetPage' });
```

## 🤝 贡献指南

我们欢迎所有形式的贡献！

### 贡献方式
1. **报告问题**: 提交Issue描述bug或建议
2. **代码贡献**: Fork项目并提交Pull Request
3. **文档改进**: 帮助完善文档和示例
4. **功能建议**: 提出新功能想法

### 贡献流程
1. Fork本项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建Pull Request

## 📄 许可证

本项目采用Apache License 2.0许可证。详见各子项目的LICENSE文件。

## 📞 联系方式

如有问题或建议，请通过以下方式联系：
- 提交Issue到对应项目仓库
- 发送邮件至项目维护者

## 🔄 更新日志

### 2024年
- **投顾中台系统 v1.0.0**: 初始版本发布
  - 实现基础基金管理功能
  - 添加用户登录系统
  - 集成衍生因子管理模块

## 🎉 致谢

感谢所有为这个项目做出贡献的开发者！

---

**注意**: 本项目仅支持HarmonyOS系统，请确保在兼容的设备上运行。
