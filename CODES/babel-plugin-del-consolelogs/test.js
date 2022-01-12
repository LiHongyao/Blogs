/*
 * @Author: Lee
 * @Date: 2022-01-12 20:32:15
 * @LastEditors: Lee
 * @LastEditTime: 2022-01-12 20:37:25
 */
const { transformSync } = require('@babel/core');
// → 使用我们的插件

const code = `
  const a = 10;
  const b = 20;
  console.log(a);
  console.log(b);
  console.log('Hello, vue.js!');
  const sum = a + b;
`;

const output = transformSync(code, {
  plugins: ['./index.js'],
});
console.log(output.code);
