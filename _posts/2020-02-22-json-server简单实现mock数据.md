---
layout: post
color: purple
title:  "json-server"
date:   2020-02-18 01:54:00
cover: "../img/bg1.jpg"
tags: json-server
---

> 1、安装
```javaScript
	npm install -g json-server
```
> 2、来实现一个需要简单的数据
```javaScript
{
  "gallery": [
    {
      "id": 199,
      "name": "泰仪",
      "keyword": "泰仪",
      "imageUrl": "https:\u002F\u002Fehaoyao.oss-cn-hangzhou.aliyuncs.com\u002F2019\u002F12\u002F2\u002F1575249248561_72.jpg",
      "linkUrl": "http:\u002F\u002Fm.ehaoyao.com\u002Fproduct-110846.html",
      "site": 2,
      "isDefault": "1",
      "dataJson": "{\"color\":\"#e2d5cc\",\"definename\":\"泰仪\"}",
      "moduleId": 27,
      "isUse": 0
    },
    {
      "id": 193,
      "name": "八味益肾丸",
      "keyword": "八味益肾丸",
      "imageUrl": "https:\u002F\u002Fehaoyao.oss-cn-hangzhou.aliyuncs.com\u002F2019\u002F11\u002F25\u002F1574642245226_95.jpg",
      "linkUrl": "http:\u002F\u002Fm.ehaoyao.com\u002Fproduct-39364.html",
      "site": 3,
      "isDefault": "0",
      "dataJson": "{\"color\":\"#fee1e5\",\"definename\":\"八味益肾丸\"}",
      "moduleId": 27,
      "isUse": 0
    }
    ]
}
```

- 编写mock.js
- 
```javaScript
const test = require('./test.json')
module.exports = () =>{
  return {
   test
  }
}
```

- 可以直接使用命令行，来启动这个json文件


```javaScript
	json-server ./src/mock/mock.js  -p 9000 --watch
```

这里 ./src/mock/mock.js是你的根文件 ，-p 9000是配置端口，--watch是监听变化。

出现这样的提示代表你成功了

```javaScript
\{^_^}/ hi!

  Loading ./src/mock/mock.js
  Done

  Resources
  http://localhost:9000/test

  Home
  http://localhost:9000
```

- 为了更好的定制你的需求可以添加路由文件进行配置,创建route.json的路由配置文件


```javaScript
{
  "/ajax/test":"/test"
}
```
启动

```javaScript
  json-server ./src/mock/mock.js -r ./src/mock/route.json -p 9000 --watch
```

 ./src/mock/mock.js -r 是路由配置文件

 启动成功：

 ```javaScript
 ./src/mock/route.json has changed, reloading...

  Loading ./src/mock/mock.js
  Loading ./src/mock/route.json
  Done

  Resources
  http://localhost:9000/test

  Other routes
  /ajax/test -> /test

  Home
  http://localhost:9000
```

最后打开提示路径到浏览器就行

> 常用配置
```javaScript
–config -c 指定配置文件 [默认值: “json-server.json”]
–port -p 设置端口 [默认值: 3000] Number
–host -H 设置域 [默认值: “0.0.0.0”] String
–watch -w Watch file(s) 是否监听
–routes -r 指定自定义路由
–middlewares -m 指定中间件 files [数组]
–static -s Set static files directory 静态目录,类比：express的静态目录
–readonly --ro Allow only GET requests [布尔]
–nocors --nc Disable Cross-Origin Resource Sharing [布尔]
–no gzip , --ng Disable GZIP Content-Encoding [布尔]
–snapshots -S Set snapshots directory [默认值: “.”]
–delay -d Add delay to responses (ms)
–id -i Set database id property (e.g. _id) [默认值: “id”]
–foreignKeySuffix – fks Set foreign key suffix (e.g. _id as in post_id) [默认值: “Id”]
–help -h 显示帮助信息 [布尔]
–version -v 显示版本号 [布尔]
```

还可以把启动命令写到json-server.json配置文件中

```javaScript
{
  "port": 3000,
  "watch": true,
  "static": "./mock",//自定义
  "read-only": false,
  "no-cors": false,
  "no-gzip": false,
  "routes": "route.json"
}

```

启动命令：
> json-server --watch mock.js  

json-server还可以做更详细的配置，比如模拟动态路由，查询参数，升序，降序等。

参考：
> 官网：https://github.com/typicode/json-server
>https://blog.csdn.net/dpy521/article/details/89279060> 
