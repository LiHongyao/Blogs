/*
 * @Author: Li-HONGYAO
 * @Date: 2021-05-25 15:14:19
 * @LastEditTime: 2021-05-25 15:22:41
 * @LastEditors: Li-HONGYAO
 * @Description:
 * @FilePath: \03. Webpack\src\utils\B.js
 */

define(["./A.js"], function (A) {
  const getBirth = (idCard) => {
    const obj = A.splitBirth(idCard);
    if(obj) {
      return `出生年月：${obj.year}年${obj.month}月${obj.day}日`;
    }
    return "";
  };
  return {
    getBirth
  }
});
