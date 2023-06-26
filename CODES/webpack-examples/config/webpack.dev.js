/*
 * @Author: Lee
 * @Date: 2023-06-02 17:55:15
 * @LastEditors: Lee
 * @LastEditTime: 2023-06-02 21:06:40
 * @Description:
 */

const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

/** @type {import('webpack').Configuration} */
const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    static: './dist',
    host: '0.0.0.0',
    port: 3000,
    open: false, // 是否自动打开浏览器
    hot: true, // 启用模块热替换
    compress: true, // gzips
    historyApiFallback: true, // 单页应用/防止刷新时出现404
    liveReload: true,
    watchFiles: ['src/**'],
    // -- 配置代理（重要）
    proxy: {
      '/api': {
        target: 'https://api.github.com',
        pathRewrite: { '^/api': '' },
        changeOrigin: true,
      },
    },
  },
};
module.exports = merge(common, devConfig);
