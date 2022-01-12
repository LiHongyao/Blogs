/*
 * @Author: Lee
 * @Date: 2022-01-12 20:32:15
 * @LastEditors: Lee
 * @LastEditTime: 2022-01-13 02:20:25
 */
// → 导入 transformSync
const { transformSync } = require('@babel/core');

// → 编写示例代码

const code = `
  const a = 10;
  const b = 20;
  console.log(a);
  // hello
  // @noremove
  console.log(b);
  console.log('Hello, vue.js!'); //@noremove
  console.log('happy');
  const sum = a + b;
`;

// → 调用插件处理code
const output = transformSync(code, {
  plugins: ['./index.js'],
});

// → 输出目标代码
console.log(output.code);
