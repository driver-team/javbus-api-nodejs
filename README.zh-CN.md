# javabus-api-nodejs

> 使用阿里新推出的企业级nodejs服务框架egg,写得一个提供av信息的 api server


## 开发日志

### jwt认证与加密

>使用jwt来做身份认证，设计使用两个token来做身份校验refreshToken,accessToken

#### Payload标准中注册的声明 (建议但不强制使用) 

>注意：这里初次使用jwt会有一个坑，jwt建议使用以下的保留字段，但是必须注意exp字段必须大于签名时间。
>还有一个大坑，moment组件生成的时间戳是string型，但是exp需要number型，所以moment生成的时间还要做转换

* iss: jwt签发者
* sub: jwt所面向的用户
* aud: 接收jwt的一方
* exp: jwt的过期时间，这个过期时间必须要大于签发时间
* nbf: 定义在什么时间之前，该jwt都是不可用的.
* iat: jwt的签发时间
* jti: jwt的唯一身份标识，主要用来作为一次性token,从而回避重放攻击。

#### 设计描述
token|描述|生命周期|payload
----|----|----|----
refreshToken|获得accessToken时携带，每次登陆注册时生成|7天|userId，exp，plt：设备类型， ip|
accessToken|api请求时携带，每次启动app和登陆注册时生成|24小时|userId，exp:超时时间戳，plt：设备类型,ip,uuid：每次随机生成|

**安全规则**

#### 登录以及注册
生成`refreshToken`并存到到数据库.

`refreshToken`仅用来生成`accessToken`使用，替代账号密码，时间戳为7天
`refreshToken`的`payload`包含：

* sub: 用户id
* exp:超时时间戳
* data.plt:设备类别ios android web mobileWeb
* data.ip:发起请求ip
* jti:设备id用来做唯一识别码

`refreshToken`存储与数据库的`token`字段。


#### 刷新accessToken
`accessToken`是api请求时携带的token，每次启动app，登录，注册时生成。存储于session中，由路由`/oauth/accessToken`发起。请求header需要携带refreshToken

我们现在使用mongodb来替代session做键值对存储。
存储规则为：

* key: userid
* android:uuid
* ios:uuid
* web:uuid
* mobileWeb:uuid

用来区分每个平台，账号登录的唯一性，uuid为时间戳生成。

accessToken的payload组成：
* sub: 用户id
* exp:超时时间戳
* data.plt:设备类别ios android web mobileWeb
* jti:uuid用来做唯一识别码

#### api请求

api请求携带accessToken，基于jwt解密。主要通过payload获得
`userId`,`platform`,`uuid`,然后与`session`的校验来检测准确性
，并校验`exp`来检测是否超时。








## 快速入门

<!-- 在此次添加使用文档 -->

如需进一步了解，参见 [egg 文档][egg]。

### 本地开发
```bash
$ npm install
$ npm run dev
$ open http://localhost:7001/news
```

### 部署

线上正式环境用 `EGG_SERVER_ENV=prod` 来启动。

```bash
$ EGG_SERVER_ENV=prod npm start
```

### 单元测试
- [egg-bin] 内置了 [mocha], [thunk-mocha], [power-assert], [istanbul] 等框架，让你可以专注于写单元测试，无需理会配套工具。
- 断言库非常推荐使用 [power-assert]。
- 具体参见 [egg 文档 -单元测试](https://eggjs.org/zh-cn/core/unittest)。

### 内置指令

- 使用 `npm run lint` 来做代码风格检查。
- 使用 `npm test` 来执行单元测试。
- 使用 `npm run autod` 来自动检测依赖更新，详细参见 [autod](https://www.npmjs.com/package/autod) 。


[egg]: https://eggjs.org