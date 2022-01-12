/*
 * @Author: Lee
 * @Date: 2022-01-12 20:29:14
 * @LastEditors: Lee
 * @LastEditTime: 2022-01-13 02:40:29
 */

module.exports = ({ types: t }) => {
  return {
    /** 插件名称 */
    name: 'babel-plugin-del-consolelogs',
    /** 访问者 */
    visitor: {
      CallExpression(path) {
        const parentPath = path.parentPath;
        // → 筛选是否是打印语句
        const isConsoleStatement = t.isIdentifier(path.node.callee.object, {
          name: 'console',
        });
        if (isConsoleStatement) {
          // → 判断是否需要移除注释，即代码中如果存在 @lg-noremove 则不清除
          // → 分两种情况：前置注释 和 后置注释
          let shouldRemove = true;
          const a = parentPath.get("@lg-noremove");
          console.log(a., '------');
         
          // path.remove();
        }
      },
    },
  };
};
