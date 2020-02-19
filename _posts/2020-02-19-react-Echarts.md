---
layout: post
color: purple
title:  "react-Echarts"
date:   2020-02-18 01:54:00
cover: "../img/bg1.jpg"
tags: react
---

#### react-Echarts(以及react-webpack重新配置)

> 1、创建项目
```
npx create-react-app 项目名
```
>2、重新配置

1、
eject 项目 ,把项目的所有webpack配置暴露出来，但是这个操作时不可逆的。然后就可以进行webpack进行配置了。
2、
安装 react-app-rewired 并修改 package.json 里的启动配置。。由于新的 react-app-rewired@2.x 版本的关系，你需要还需要安装 customize-cra。
> 具体的配置去react-app-rewired和customize-cra 官网查看
```
npm install react-app-rewired customize-cra --save-dev
```
- 修改package.json
```
    "scripts": {
    -   "start": "react-scripts start",
    +   "start": "react-app-rewired start",
    -   "build": "react-scripts build",
    +   "build": "react-app-rewired build",
    -   "test": "react-scripts test --env=jsdom",
    +   "test": "react-app-rewired test --env=jsdom",
    }
```
- 然后在项目根目录创建一个 config-overrides.js 用于修改默认配置。
```
const { override, fixBabelImports } = require('customize-cra');
 module.exports = override( //用于配置anr-design
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    style: 'css',
   }),
   addWebpackAlias({//配置别名
     '@'：path.resolve(__dirname,'./src/components')
   })
 );
```

> 3、载入Echarts
- 安装第三方库 echarts-for-react 以及安装本身的echarts
  具体使用参照echarts-for-react官网
