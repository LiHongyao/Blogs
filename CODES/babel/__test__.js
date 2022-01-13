/*
 * @Author: Lee
 * @Date: 2022-01-13 20:48:31
 * @LastEditors: Lee
 * @LastEditTime: 2022-01-13 21:23:11
 */

// → 导入 transformSync
const { transformSync } = require('@babel/core');

// → 编写测试代码
const code = `var a = 10;`;

// → 调用插件处理code
const output = transformSync(code, {
  plugins: [['./index.js', { name: 'Li-HONGYAO' }]],
});

// → 输出目标代码
console.log("目标代码： ", output.code);
