/*
 * @Author: Lee
 * @Date: 2022-01-13 20:45:56
 * @LastEditors: Lee
 * @LastEditTime: 2022-01-13 21:23:36
 */

module.exports = ({ types: t }) => ({
  /** 插件名称 */
  name: 'babel-plugin-xxx',
  /** 访问者 */
  visitor: {
    VariableDeclarator(path, state) {
      console.log(path.get("id").toString())
    },
  },
});
