/*
 * @Author: Lee
 * @Date: 2023-06-02 21:31:46
 * @LastEditors: Lee
 * @LastEditTime: 2023-06-02 21:32:02
 * @Description:
 */

const path = require('path');
const appDir = process.cwd();

const resolve = (relativePath) => {
  return path.resolve(appDir, relativePath);
};

module.exports = resolve;
