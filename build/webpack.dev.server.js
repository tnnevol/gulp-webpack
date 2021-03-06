'use strict';

const webpack = require('webpack');
const path = require('path');
const express = require('express');
const webpackDevConfig = require('./webpack.dev.conf');
const compiler = webpack(webpackDevConfig);

module.exports = function (app) {
  // 用 webpack-dev-middleware 启动 webpack 编译
  // 该中间件是在webpack编译后的文件进行监听，文件是不会写入磁盘的，在内存的
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: webpackDevConfig.output.publicPath,
    logLevel: 'error'
  }));

  // 使用 webpack-hot-middleware 支持热更新
  // 主要用于监听入口文件和入口文件的依赖热启动，自动刷新浏览器
  app.use(require('webpack-hot-middleware')(compiler, {
    publicPath: webpackDevConfig.output.publicPath
  }));
  // 指定开发环境下的静态资源目录
  // app.use(webpackDevConfig.output.publicPath, express.static(path.join(__dirname, '../src')));
  app.use(express.static(path.join(__dirname, '../server/public')));
};
