const express = require('express');
const router = express.Router();
// const ejs = require('ejs');
const config = require('../../../config');
const { getTemplate, ejs } = require('../../utils');
const isDev = process.env.NODE_ENV === 'development';
const assetsPublicPath = config[isDev ? 'dev' : 'build'].assetsPublicPath;

router.get('/', async (req, res, next) => {
  try {
    // await render(res, 'home', { title: '首页' })
    const template = await getTemplate('index.ejs'); // 获取 ejs 模板文件
    const html = ejs.render(template, { title: '图书管理系统', assetsPublicPath });
    return res.status(200).send(html);
  } catch (e) {
    next(e);
  }
});

router.get('/home', async (req, res, next) => {
  try {
    const template = await getTemplate('home.ejs'); // 获取 ejs 模板文件
    const html = ejs.render(template, { title: 'home' });
    return res.status(200).send(html);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
