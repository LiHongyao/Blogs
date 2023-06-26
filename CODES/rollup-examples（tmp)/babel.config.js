/*
 * @Author: Lee
 * @Date: 2023-06-04 11:15:54
 * @LastEditors: lihongyao lihy_online@163.com
 * @LastEditTime: 2023-06-04 11:18:18
 * @Description:
 */
export default {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'usage',
        corejs: 3,
      },
    ],
  ],
};
