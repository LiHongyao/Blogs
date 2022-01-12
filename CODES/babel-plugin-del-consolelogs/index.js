/*
 * @Author: Lee
 * @Date: 2022-01-12 20:29:14
 * @LastEditors: Lee
 * @LastEditTime: 2022-01-12 21:11:00
 */
module.exports = ({ types: t }) => {
  return {
    visitor: {
      // coding in here...
      CallExpression(path) {
        const hasCallee = !!path.node.callee;
        const isConsole = t.isIdentifier(path.node.callee.object, {
          name: 'console',
        });
        if (hasCallee && isConsole) {
          path.remove();
        }
      },
    },
  };
};
