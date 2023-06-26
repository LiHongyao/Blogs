/*
 * @Author: Lee
 * @Date: 2023-06-03 21:40:52
 * @LastEditors: Lee
 * @LastEditTime: 2023-06-03 21:45:24
 * @Description:
 */

require(['./moduleA'], ({ getSum }) => {
  const sum = getSum(10, 20);
  console.logz('sum = ', sum);
});
