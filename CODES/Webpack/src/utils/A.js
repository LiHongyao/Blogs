/*
 * @Author: Li-HONGYAO
 * @Date: 2021-05-25 14:25:16
 * @LastEditTime: 2021-05-25 15:21:03
 * @LastEditors: Li-HONGYAO
 * @Description:
 * @FilePath: \03. Webpack\src\utils\A.js
 */

define(function () {
  const splitBirth = (idCard) => {
    if (isNaN(idCard) || idCard.length !== 18) {
      return null;
    }
    return {
      year: idCard.slice(6, 10),
      month: idCard.slice(10, 12),
      day: idCard.slice(12, 14),
    };
  };
  return {
    splitBirth,
  };
});
