/*
 * @Author: Lee
 * @Date: 2021-12-24 17:09:52
 * @LastEditors: Lee
 * @LastEditTime: 2022-01-14 11:15:53
 */

module.exports = ({ types: t }) => ({
  /** 插件名称 */
  name: 'babel-plugin-xxx',
  /** 访问者 */
  visitor: {
    FunctionDeclaration(path) {
      const param = path.node.params[0];
      paramName = param.name;
      param.name = 'x';
    },

    Identifier(path) {
      if (path.node.name === paramName) {
        path.node.name = 'x';
      }
    },
  },
});
