/*
 * @Author: Lee
 * @Date: 2021-12-24 17:09:52
 * @LastEditors: Lee
 * @LastEditTime: 2021-12-24 17:38:51
 */

module.exports = function ({ types: babelTypes }) {
  return {
    name: 'plugin-example',
    visitor: {
      Identifier(path, state) {
        if (path.node.name === 'bad') {
          path.node.name = 'good';
        }
      },
    },
  };
};
