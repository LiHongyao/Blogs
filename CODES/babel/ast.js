/*
 * @Author: Lee
 * @Date: 2022-01-12 14:12:05
 * @LastEditors: Lee
 * @LastEditTime: 2022-12-22 12:10:33
 */

// → 导入模块
const parser = require('@babel/parser');
const traverse = require('@babel/traverse');
const generator = require('@babel/generator');
const t = require('@babel/types');

// → 定义一段代码字符串
const codeString = `
function square(n) {
  return n * n;
}
n;`;

// → 解析代码字符串
const ast = parser.parse(codeString, {
  sourceType: 'script', // module unambigious
  plugins: ['jsx', 'typescript'],
});

// → 遍历节点
traverse.default(ast, {
  FunctionDeclaration(path) {
    console.log('————：', path.scope.generateUid());
  },
});

// → 将AST输出为目标代码
const code = generator.default(ast).code;
console.log('--------------- 目标代码 start ---------------');
console.log(code);
console.log('--------------- 目标代码 end ---------------');
/**
  function square(x) {
    return x * x;
  }
  x;
 */
