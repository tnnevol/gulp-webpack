const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const routes = require('./routes');
const { processProxy } = require('./utils');
const app = express();

const webpackDevConfig = require('../build/webpack.dev.conf');
const compiler = webpack(webpackDevConfig);
const isDev = process.env.NODE_ENV === 'development';
// console.log('isDev', isDev);

app.use(logger('dev'));
// app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if (isDev) {
  // 用 webpack-dev-middleware 启动 webpack 编译
  // 该中间件是在webpack编译后的文件进行监听，文件是不会写入磁盘的，在内存的
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackDevConfig.output.publicPath
    // overlay: true,
    // hot: true
  }));

  // 使用 webpack-hot-middleware 支持热更新
  // 主要用于监听入口文件和入口文件的依赖热启动，自动刷新浏览器
  app.use(webpackHotMiddleware(compiler, {
    publicPath: webpackDevConfig.output.publicPath
  }));

  // app.set('view engine', 'ejs');
  // 指定开发环境下的静态资源目录
  app.use(webpackDevConfig.output.publicPath, express.static(path.join(__dirname, '../src')));
} else {
  // view engine setup
  app.set('views', path.join(__dirname, '../dist/views'));
  app.set('view engine', 'ejs');
  app.use(express.static(path.join(__dirname, '../dist')));
}

// 路由配置
routes(app);
// 代理
processProxy(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.stack || 'Service Error');
  // res.render('error');
});

module.exports = app;
