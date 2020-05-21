// const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const { getTemplate, ejs } = require('./utils');

const { processProxy } = require('./utils');
const app = express();

const isDev = process.env.NODE_ENV === 'development';
// console.log('isDev', isDev);

app.use(logger('dev'));
// app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if (isDev) {
  require('../build/webpack.dev.server')(app);
} else {
  // view engine setup
  app.set('views', path.join(__dirname, '../dist/views'));
  // app.set('view engine', 'ejs');
  app.use(express.static(path.join(__dirname, '../dist')));
}

// 代理
processProxy(app);
// 路由配置
require('./routes')(app);

// catch 404 and forward to error handler
app.use(async (req, res, next) => {
  try {
    // await render(res, 'home', { title: '首页' })
    const template = await getTemplate('404.ejs'); // 获取 ejs 模板文件
    const html = ejs.render(template, { title: '404' });
    return res.status(200).send(html);
  } catch (e) {
    next(e);
  }
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  return res.send(err.stack || 'Service Error');
  // res.render('error');
});

module.exports = app;
