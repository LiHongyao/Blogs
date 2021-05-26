/*
 * @Author: Li-HONGYAO
 * @Date: 2021-05-26 09:50:01
 * @LastEditTime: 2021-05-26 09:50:29
 * @LastEditors: Li-HONGYAO
 * @Description:
 * @FilePath: \03. Webpack\postcss.config.js
 */
module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: [
        "Android 4.1",
        "iOS 7.1",
        "Chrome > 31",
        "ff > 31",
        "ie >= 8",
      ],
    },
  },
};
