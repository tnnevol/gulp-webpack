const express = require('express');
const router = express.Router();
const ejs = require('ejs');
const { getTemplate } = require('../../utils');

router.get('/', async (req, res, next) => {
  try {
    // await render(res, 'home', { title: '首页' })
    const template = await getTemplate('home.ejs'); // 获取 ejs 模板文件
    const html = ejs.render(template, { title: '首页' });
    res.status(200).send(html);
    // return res.render('home', { title: '首页' })
  } catch (e) {
    next(e);
  }
});

router.get('/home', async (req, res, next) => {
  try {
    const template = await getTemplate('home.ejs'); // 获取 ejs 模板文件
    const html = ejs.render(template, { title: 'home' });
    res.status(200).send(html);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
