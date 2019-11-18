/**
 * 任务列表
 * 服务启动 webpack-dev-server
 * 项目打包 webpack-prod-build
 */

const { series } = require('gulp');

const devServer = require('./dev.server');
const build = require('./build');
const clean = require('./clean');

exports.devServer = series(devServer);

exports.build = series(clean, build);
