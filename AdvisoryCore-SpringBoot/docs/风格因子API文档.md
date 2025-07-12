# 添加风格因子 API 文档

## 接口信息
- **接口名称：** 16Add_style_factor
- **请求方式：** POST
- **接口地址：** `/api/custom-style-factors/add`

## 请求格式

### 请求体
```json
{
  "styleFactorId": 1001,
  "factors": [
    {
      "factorId": 2001,
      "weight": 0.3,
      "normalized": true
    },
    {
      "factorId": 2002,
      "weight": 0.4,
      "normalized": false
    },
    {
      "factorId": 2003,
      "weight": 0.3,
      "normalized": true
    }
  ]
}
```

### 参数说明
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| styleFactorId | Integer | 是 | 风格因子ID |
| factors | Array | 是 | 衍生因子列表 |
| factors[].factorId | Integer | 是 | 衍生因子ID |
| factors[].weight | Double | 是 | 权重值 |
| factors[].normalized | Boolean | 是 | 是否归一化 |

## 响应格式

### 成功响应 (200)
```json
{
  "code": 200,
  "message": "添加成功",
  "data": {
    "styleFactorId": 1001,
    "insertedCount": 3
  }
}
```

### 失败响应 (400/500)
```json
{
  "code": 400,
  "message": "错误信息",
  "data": null
}
```

## 测试示例

### cURL
```bash
curl -X POST "http://localhost:8080/api/custom-style-factors/add" \
  -H "Content-Type: application/json" \
  -d '{
    "styleFactorId": 1001,
    "factors": [
      {"factorId": 2001, "weight": 0.3, "normalized": true},
      {"factorId": 2002, "weight": 0.4, "normalized": false},
      {"factorId": 2003, "weight": 0.3, "normalized": true}
    ]
  }'
```

### Postman
- Method: POST
- URL: `http://localhost:8080/api/custom-style-factors/add`
- Headers: `Content-Type: application/json`
- Body: 使用上面的JSON格式

## 数据库表
```sql
CREATE TABLE custom_style_factor_mix (
    mixid INT PRIMARY KEY AUTO_INCREMENT,
    style_factor_id INT,
    factor_id INT,
    weight DOUBLE,
    normalized BOOLEAN
);
```

## 实现文件
- Controller: `CustomStyleFactorMixController.java`
- Service: `CustomStyleFactorMixService.java` / `CustomStyleFactorMixServiceImpl.java`
- Mapper: `CustomStyleFactorMixMapper.java` / `CustomStyleFactorMixMapper.xml`
- DTO: `AddCustomStyleFactorRequest.java` / `AddCustomStyleFactorResponse.java`
- Entity: `CustomStyleFactorMix.java` (已存在)

## 业务特点
- 支持批量插入多个衍生因子组合
- 相同styleFactorId会覆盖之前的记录
- 包含归一化标志字段
- 使用事务确保数据一致性 