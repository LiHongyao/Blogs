/*
 * @Author: Li-HONGYAO
 * @Date: 2021-05-25 13:38:09
 * @LastEditTime: 2021-05-25 13:38:46
 * @LastEditors: Li-HONGYAO
 * @Description:
 * @FilePath: \03. Webpack\src\utils.js
 */
class Util {
  constructor() {}
  static setTitle(id, title) {
    let el = document.getElementById(id);
    el.textContent = title;
  }
}

module.exports = {
  Util,
};
