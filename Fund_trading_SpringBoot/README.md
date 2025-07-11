## 实时埋点统计接口文档

### 1. 获取最近N分钟活跃用户数
- **GET** `/track/event/active-users?minutes=5`
- **参数**：minutes（可选，默认5）
- **返回**：int，活跃用户数
- **示例返回**：
```
3
```

### 2. 获取最近N分钟事件总数
- **GET** `/track/event/count?minutes=5`
- **参数**：minutes（可选，默认5）
- **返回**：int，事件总数
- **示例返回**：
```
25
```

### 3. 获取最近N分钟活跃页面排行
- **GET** `/track/event/active-pages?minutes=5`
- **参数**：minutes（可选，默认5）
- **返回**：List<String>，页面名称排行（按事件数降序，最多10条）
- **示例返回**：
```
[
  "首页",
  "市场页",
  "详情页"
]
```

### 4. 获取最近N分钟活跃模块排行
- **GET** `/track/event/active-modules?minutes=5`
- **参数**：minutes（可选，默认5）
- **返回**：List<String>，模块名称排行（按事件数降序，最多10条）
- **示例返回**：
```
[
  "sidebar_menu",
  "market_overview"
]
```

### 5. 获取指定用户的所有埋点事件
- **GET** `/track/event/user-events?user_id=xxx`
- **参数**：user_id（必填，前端登录用户的ID）
- **返回**：该用户的所有埋点事件列表，按时间倒序排列
- **示例返回**：
```
[
  {
    "id": 1,
    "event_id": "click_home_menu",
    "event_name": "点击主页面菜单",
    "module": "sidebar_menu",
    "page_name": "首页",
    "trigger_type": "click",
    "target_component": "主页面菜单项",
    "selector": "[data-track-id='sidebar-home-menu']",
    "extra_params": "{\"menuName\":\"主页面\",\"menuCode\":\"home\"}",
    "user_id": "test_user",
    "user_name": "张三",
    "user_email": "test@example.com",
    "user_phone": "1234567890",
    "created_at": "2024-07-03 10:00:00"
  },
  ...
]
``` 