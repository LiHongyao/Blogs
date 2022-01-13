/*
 * @Author: Lee
 * @Date: 2022-01-12 14:12:05
 * @LastEditors: Lee
 * @LastEditTime: 2022-01-13 20:29:20
 */

// → 导入模块
const parser = require('@babel/parser');
const traverse = require('@babel/traverse');
const generator = require('@babel/generator');
const t = require('@babel/types');

// → 定义一段代码字符串
const codeString = `function square(n) {
  return n * n;
}`;

// → 解析代码字符串
const ast = parser.parse(codeString, {
  sourceType: 'script', // module unambigious
  plugins: ['jsx', 'typescript'],
});

// → 遍历节点
traverse.default(ast, {
  Identifier(path) {
    // 判断是否是 name 为 n 的标志符
    if (t.isIdentifier(path.node, { name: 'n' })) {
      path.node.name = 'x';
    }
  },
});

// → 将AST输出为目标代码
const code = generator.default(ast, { sourceMaps: true }).code;
console.log(code);
/**
 * → 输出结果
 * function square(x) {
 *    return x * x;
 * }
 */


