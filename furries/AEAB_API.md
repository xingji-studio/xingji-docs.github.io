# 极端福瑞/反福瑞行为档案库 API

公开页提供只读查询接口，默认地址：

```text
GET http://bl.furries.com.cn/api/blacklist/search
```

支持跨域调用，适合网页前端、机器人或其他后端服务直接接入。

## 请求参数

- `platform`：平台名称，必须是站点允许的平台之一，例如 `QQ`
- `account_id`：要查询的账号 ID 或账号名

## GET 调用示例

```bash
curl "http://bl.furries.com.cn/api/blacklist/search?platform=QQ&account_id=user_12345"
```

## POST JSON 调用示例

```bash
curl -X POST "http://bl.furries.com.cn/api/blacklist/search" \
  -H "Content-Type: application/json" \
  -d '{"platform":"QQ","account_id":"user_12345"}'
```

## JavaScript 调用示例

```js
const response = await fetch("http://bl.furries.com.cn/api/blacklist/search?platform=QQ&account_id=user_12345");
const data = await response.json();

if (data.success && data.found) {
  console.log("命中黑名单", data.entry);
} else if (data.success) {
  console.log("未命中", data.query);
} else {
  console.error("查询失败", data.error);
}
```

## 返回示例

命中时：

```json
{
  "success": true,
  "found": true,
  "query": {
    "platform": "QQ",
    "account_id": "user_12345"
  },
  "entry": {
    "id": 1,
    "platform": "QQ",
    "account_id": "user_12345",
    "threat_level": "高",
    "description": "长期骚扰、发布仇恨言论。",
    "created_at": "2026-05-20 08:00:00",
    "updated_at": "2026-05-20 08:00:00",
    "images": [
      {
        "id": 2,
        "filename": "evidence-1.png",
        "mime_type": "image/png",
        "url": "http://bl.furries.com.cn/blacklist-images/2"
      }
    ]
  }
}
```

未命中时：

```json
{
  "success": true,
  "found": false,
  "query": {
    "platform": "QQ",
    "account_id": "user_12345"
  },
  "entry": null
}
```

参数错误或请求过快时：

```json
{
  "success": false,
  "error": "平台选项无效。"
}
```
