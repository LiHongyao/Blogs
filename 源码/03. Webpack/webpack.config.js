/*
 * @Author: Li-HONGYAO
 * @Date: 2021-05-25 13:39:40
 * @LastEditTime: 2021-05-26 09:53:31
 * @LastEditors: Li-HONGYAO
 * @Description:
 * @FilePath: \03. Webpack\webpack.config.js
 */

// 1. 引入模块
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 2. 导出配置
module.exports = {
  // 配置基础路径为当前目录（默认为配置文件所在的当前目录）
  context: path.resolve(__dirname, "./"),
  // 打包模式 development | production
  mode: "development",
  // 入口 string | array | object
  entry: {
    main: "./src/main.js",
  },
  // 出口
  output: {
    // 输出目录/绝对路径
    path: path.resolve(__dirname, "./dist/"),
    // 输出文件名
    filename: "js/[name]-bundle.js",
    // 处理静态资源路径
    // 静态资源最终访问路径 = output.publicPath + 资源loader或插件等配置路径
    // 这里假设开启devServer服务
    // publicPath: "http://localhost:8080/",
  },
  // 加载器
  module: {
    rules: [
      // 处理脚本
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      // 处理样式
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          // "style-loader",
          // => 使用插件中的loader代替style方式
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    new HtmlWebpackPlugin({
      // 模板文件
      template: "./src/index.html",
      // 文件名(相对于output.path)，可通过文件名设置目录，如 static/pages/detail.html
      filename: "index.html",
      // 静态资源位置
      inject: "body",
      // 是否hash
      hash: false,
      // 指定输出文件所依赖的入口文件（*.js）的[name]
      chunks: ["main"],
      // 控制压缩
      minify: {
        collapseWhitespace: false,
        removeComments: true,
        removeAttributeQuotes: true,
        removeEmptyAttributes: true,
      },
    }),
  ],
  // 开发服务
  devServer: {
    contentBase: path.resolve(__dirname, "./dist"),
    host: "192.168.101.31",
    port: 8888,
  },
};
