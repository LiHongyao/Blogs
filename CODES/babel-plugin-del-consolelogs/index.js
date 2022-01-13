/*
 * @Author: Lee
 * @Date: 2022-01-13 09:23:13
 * @LastEditors: Lee
 * @LastEditTime: 2022-01-13 14:18:32
 */
/*
 * @Author: Lee
 * @Date: 2022-01-12 20:29:14
 * @LastEditors: Lee
 * @LastEditTime: 2022-01-13 14:03:49
 */

module.exports = ({ types: t }) => {
  return {
    /** 插件名称 */
    name: 'babel-plugin-del-consolelogs',
    /** 访问者 */
    visitor: {
      CallExpression(path) {
        // → 生产环境下才处理注释清除
        if (process.env.NODE_ENV === 'production') {
          // → 获取父级AST节点
          const parentNode = path.parent;
          // → 筛选是否是打印语句
          const isConsoleStatement = t.isIdentifier(path.node.callee.object, {
            name: 'console',
          });
          // → 定义变量，记录是否执行清除动作，默认为true
          let shouldRemove = true;
          // → 判断是否是conosle语句
          if (isConsoleStatement) {
            // → 遍历前置注释
            if (parentNode.leadingComments) {
              parentNode.leadingComments.forEach((comment) => {
                // 判断注释内容是否是保留注释：@lg-noremove
                if (comment.value.trim() === '@lg-noremove') {
                  shouldRemove = false;
                }
              });
            }
            // → 遍历后置注释
            if (parentNode.trailingComments) {
              // 获取console所在行
              const consoleLine = parentNode.expression.loc.start.line;
              parentNode.trailingComments.forEach((comment) => {
                // 读取注释所在行
                const commentLine = comment.loc.start.line;
                // 判断注释内容是否是保留注释：@lg-noremove 并且是否和console语句在同一行
                if (
                  comment.value.trim() === '@lg-noremove' &&
                  consoleLine === commentLine
                ) {
                  shouldRemove = false;
                }
              });
            }
            // → 移除
            if (shouldRemove) {
              path.remove();
            }
          }
        }
      },
    },
  };
};
