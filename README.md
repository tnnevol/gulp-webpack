# 基于gulp+webpack的框架
author: newblue

```bash
// 启动项目
gulp dev-server

// 打包项目--用于正式服务器打包
gulp prod-build
```

## tip
该项目使用的是webpack4版本，配置项是基于vue-cli2的配置项构建，没有支持.vue文件，该框架只是一个轮廓，想要什么在项目中自行扩展

webpack3-build、webpack3-config--这两个目录废弃


## babel7 配置注意事项
* 项目根目录下新建/babel.config.js 配置项请使用本项目
* 依赖简介
    * @babel/core @babel/cli
    用于终端使用（本项目未使用）
    * @babel/plugin-transform-runtime
    用于低版本浏览器es6/es7的支持，需压依赖@babel/runtime --save runtime之后使用
    * @babel/polyfill垫片
    * @babel/runtime-corejs2 支持的babel7的 corejs runtime之后需要使用
    * @babel/preset-env
    将es2015+彻底转换，babel7
    * @babel/register
    node 后续运行时所需要 require 进来的扩展名为 .es6、.es、.jsx、 .mjs 和 .js 的文件将由 Babel 自动转换。

## express
* 该项目没有使用webpack-dev-server作为服务启动，而是使用了express框架，这样有利于做ssr，也利于seo优化
* [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware) 该项目的代理使用了这个中间件

