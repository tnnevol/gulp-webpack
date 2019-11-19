/**
 * 任务列表
 * 服务启动 webpack-dev-server
 * 项目打包 webpack-prod-build
 */

const { series } = require('gulp');

const server = require('./server');
const build = require('./build');
const clean = require('./clean');

exports.server = series(server);

exports.build = series(clean, build);

exports.deploy = series(clean, build, server);
