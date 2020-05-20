/**
 * 任务列表后台ui框架
 * 服务启动 webpack-dev-server
 * 项目打包 webpack-prod-build
 */

const { series, parallel } = require('gulp');

const server = require('./server');
const build = require('./build');
const clean = require('./clean');
const buildServer = require('./build.server');

exports.server = series(server);

exports.build = series(clean, parallel(buildServer, build));

exports.deploy = series(clean, build, server);

exports.buildServer = series(clean, buildServer);
