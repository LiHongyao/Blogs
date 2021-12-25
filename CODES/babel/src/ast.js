/*
 * @Author: Lee
 * @Date: 2021-12-25 10:13:29
 * @LastEditors: Lee
 * @LastEditTime: 2021-12-25 12:07:54
 */

const esprima = require('esprima');
const estraverse = require('estraverse');
const escodegen = require('escodegen');

// -- 源代码
const code = "const name = 'Muzili';";
// -- 词法分析
const ast = esprima.parseScript(code);
// -- 遍历AST树
estraverse.traverse(ast, {
  enter: function (node) {
    node.name = 'job';
    node.value = '前端工程师';
    node.kind = 'var';
  },
});
// -- 生成代码
const transformCode = escodegen.generate(ast);
// -- 输出结果
console.log(transformCode);


