/*
 * @Author: Lee
 * @Date: 2021-12-24 17:09:52
 * @LastEditors: Lee
 * @LastEditTime: 2021-12-24 17:47:31
 */

module.exports = function ({ types: babelTypes }) {
  return {
    name: 'plugin-example',
    visitor: {
      Identifier(path, state) {
        let name = path.node.name;
        if (state.opts[name]) {
          path.node.name = state.opts[name];
        }
      },
    },
  };
};
