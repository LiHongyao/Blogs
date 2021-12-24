/*
 * @Author: Li-HONGYAO
 * @Date: 2021-05-25 13:38:03
 * @LastEditTime: 2021-05-25 16:21:51
 * @LastEditors: Li-HONGYAO
 * @Description:
 * @FilePath: \03. Webpack\src\main.js
 */

import "./index.less";
// commonJS
const { Util } = require("./utils");
// AMD
require(["./utils/B.js"], (B) => {
  const birth = B.getBirth("510321199307161234");
  console.log(birth); // 出生年月：1993年07月16日
});
Util.setTitle("title", "Hello, webpack!!");


// ES6
const sayHello = (name) => {
  console.log(`Hello, ${name}!`);
};
sayHello("Muzili");
