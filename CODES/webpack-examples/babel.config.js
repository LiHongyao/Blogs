/*
 * @Author: Lee
 * @Date: 2023-06-02 09:42:53
 * @LastEditors: Lee
 * @LastEditTime: 2023-06-02 09:42:58
 * @Description: 
 */
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3, // 指定core-js版本
      },
    ],
  ],
};
