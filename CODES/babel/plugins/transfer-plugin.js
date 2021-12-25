/*
 * @Author: Lee
 * @Date: 2021-12-24 17:09:52
 * @LastEditors: Lee
 * @LastEditTime: 2021-12-25 12:28:41
 */

// plugins/transfer-plugin.js
module.exports = function ({ types: babelTypes }) {
  return {
    name: 'transfer-plugin',
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
