"use strict";

require("core-js/modules/es.function.name.js");

/*
 * @Author: Lee
 * @Date: 2021-12-25 10:13:29
 * @LastEditors: Lee
 * @LastEditTime: 2022-01-13 21:19:13
 */
var esprima = require('esprima');

var estraverse = require('estraverse');

var escodegen = require('escodegen'); // -- 源代码


var code = "const name = 'Muzili';"; // -- 词法分析

var ast = esprima.parseScript(code); // -- 遍历AST树

estraverse.traverse(ast, {
  enter: function enter(node) {
    node.name = 'job';
    node.value = '前端工程师';
    node.kind = 'var';
  }
}); // -- 生成代码

var transformCode = escodegen.generate(ast); // -- 输出结果

console.log(transformCode);