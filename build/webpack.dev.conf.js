'use strict';

// process.env.NODE_ENV = 'development';
// console.log('dev', process.env.NODE_ENV)

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
// const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

const utils = require('./utils');
const config = require('../config');
const webpackBaseConfig = require('./webpack.base.conf');

module.exports = webpackMerge(webpackBaseConfig, {
  module: {

  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`
    }),
    // OccurrenceOrderPlugin is needed for webpack 1.x only
    // new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // Use NoErrorsPlugin for webpack 1.x
    // new webpack.NoEmitOnErrorsPlugin(),
    // 抽出css
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: utils.assetsPath('css/[name].css'), // devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: utils.assetsPath('css/[id].css') // devMode ? '[id].css' : '[id].[hash].css'
    }),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [
          `Your application is running here: http://${config.dev.host}:${config.dev.port}`,
          `or running here: http://127.0.0.1:${config.dev.port}`]
      },
      onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
    })
  ],

  devtool: config.dev.devtool,

  mode: process.env.NODE_ENV
});
