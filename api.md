>老司机接口文档



# 请求

所有请求`heade`需要添加字段

* platform:`[ios android web mobileWeb]`
* Authorization:`Bearer + refreshToken/accessToken`

## api

response body

```
{
  "status": 200,
  "message": "",
  "data": {}/[]
}
```

| 类型  | url|含义|request|body.data|
| ---------- | -----------|-----------| -----------|-----------|
| post |/oauth/register | 注册 |{email:"邮箱"，password:"密码"} |  {"isRegistered": true}
| post |/oauth/login |登录|{email:"邮箱"，password:"密码"} |{"refreshToken":‘’，"accessToken":‘’ }
| get  |/oauth/accessToken |获得accessToken| |{"accessToken": ‘’}
|get   |/mail/sendCode/{email} |指定邮箱发送验证码|||
|post   |/mail/validateCode|校验邮箱验证码|{email:'',code:''}|{validate:0失败 1成功 }
|get|  /meizi/page/{number}|获得某页数据||{"total": 2734,"page": "1","pageSize": 30,"data": [{"thumbUrl": "http:jpg","title": "标题","id": 5529},] }
|get|/meizi/detail/{id}|获得某项的详情||{"tag": [],"images":[]}
|get|  /javbus/page/{number}|获得某页数据||{"total": 2734,"page": "1","pageSize": 30,"data": [{"thumbUrl": "http:jpg","title": "标题","id": 5529},] }
|get|/javbus/detail/{id}|获得某项的详情||[详情](#/javbus/detail/{id})| 

#### /javbus/detail/{id}
```
{
	"tag": [],
	"mvActors": [],
    "mvImageSmall": [],
    "mvImageBig": [],
    "mvMagnets": [{
        "title": "",
        "url": "",
        "size": "874.92MB",
        "time": "2014-10-16"
      },
      {
        "title": "(isd-104)+spfun",
        "url": "",
        "size": "874.76MB",
        "time": "2013-06-13"
      }
    ],
    "title": "",
    "thumb": "",
    "series": "",
    "mvPublisher": "RUBY",
    "mvProducers": "ルビー",
    "mvLength": "120分鐘",
    "mvDirector": "",
    "id": "",
    "href": "",
    "dateNumber": 20170618,
    "date": "2017-06-18",
    "cover": "https://pics.javbus.com/cover/61z9_b.jpg",
    "_id": "591feee9a3e3f508e76911a3"
  }
  
```



## 错误码

| 错误码  | 含义|
| ---------- | -----------| 
|200   | 正确
|204   |账号或密码错误
|401   |登录超时    
|422   | 携带参数不对 
|500 |服务器位置错误    