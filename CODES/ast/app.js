/*
 * @Author: Lee
 * @Date: 2022-01-12 14:12:05
 * @LastEditors: Lee
 * @LastEditTime: 2022-01-12 18:17:59
 */

// → 导入模块
const babelParser = require('@babel/parser');

// → 定义一段脚本
const codeStr = `function square(n) {
    return n * n;
  }`;

// → 通过解析器脚本生成AST
const ast = babelParser.parse(codeStr);

// → 递归遍历AST，进行节点操作
require('@babel/traverse').default(ast, {
  enter(path) {
    if (path.isIdentifier({ name: 'n' })) {
      path.node.name = 'x';
    }
  },
});

require('@babel/generator').default(ast).code;
// → 打印AST
console.log();
