/*
 * @Author: Lee
 * @Date: 2022-01-12 20:32:15
 * @LastEditors: Lee
 * @LastEditTime: 2022-01-13 14:23:15
 */
// → 导入 transformSync
const { transformSync } = require('@babel/core');

// → 编写示例代码

const code = `
  const a = 10;
  const b = 20;
  console.log(a);
  const c = 30;
  console.log(b);
  const sum = a + b;
  // signle comment...
  // @lg-noremove
  console.log('sum：', a + b);
  a + b + c;
  console.log('Hello, vue.js!');
  console.log("I'm studing!"); // @lg-noremove
`;

// → 调用插件处理code
const output = transformSync(code, {
  plugins: ['./index.js'],
});

// → 输出目标代码
console.log(output.code);
