/*
 * @Author: Lee
 * @Date: 2023-06-02 17:55:05
 * @LastEditors: Lee
 * @LastEditTime: 2023-06-02 21:06:36
 * @Description:
 */

const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

/** @type {import('webpack').Configuration} */
const prodConfig = {
  mode: 'production',
};

module.exports = merge(common, prodConfig);
