/*
 * @Author: Lee
 * @Date: 2023-06-04 11:15:54
 * @LastEditors: Lee
 * @LastEditTime: 2023-06-04 18:25:54
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
    '@babel/preset-typescript',
  ],
};
