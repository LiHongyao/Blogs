/*
 * @Author: Lee
 * @Date: 2022-01-13 20:48:31
 * @LastEditors: Lee
 * @LastEditTime: 2022-01-14 11:15:36
 */

// → 导入 transformSync
const { transformSync } = require('@babel/core');

// → 编写测试代码
const code = `
function square(n) {
  return n * n;
}`;

// → 调用插件处理code
const output = transformSync(code, {
  plugins: [['./babel-plugin-xxx.js', { name: 'Li-HONGYAO' }]],
});

// → 输出目标代码
console.log('目标代码： ', output.code);
