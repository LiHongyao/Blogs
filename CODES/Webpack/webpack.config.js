/*
 * @Author: Lee
 * @Date: 2021-12-27 14:52:14
 * @LastEditors: Lee
 * @LastEditTime: 2021-12-27 22:07:42
 */

// 1. 引入模块
const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const glob = require('glob');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');

// 2. 导出配置
module.exports = {
  context: path.resolve(__dirname, './'),
  entry: {
    main: './src/app.js',
  },
  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: '[name]-bundle-[hash].js',
  },
  resolve: {
    alias: {
      '@utils': path.resolve(__dirname, 'src/utils/'),
    },
  },
  module: {
    rules: [
      // -- 打包脚本
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      // -- 打包样式
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['postcss-preset-env'],
              },
            },
          },
          'less-loader',
        ],
      },
      // -- 打包图片
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        exclude: /node_modules/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]',
        },
      },
      // -- 处理html文件中的img图片（负责引入img）
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'html-loader',
        options: {
          esModule: false,
        },
      },
      // -- 打包字体
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        exclude: /node_modules/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.BannerPlugin('版权Li-HONGYAO所有，翻版必究！'),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[hash].css',
    }),
    new CopyPlugin({
      patterns: [{ from: 'public' }],
    }),
    new PurgeCSSPlugin({
      paths: glob.sync('./src/**/*', { nodir: true }),
    }),
    // new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      // -- 模板文件
      template: 'src/index.html',
      // -- 文件名，相对于output.path，
      // -- 可通过文件名设置目录，如 static/pages/detail.htm
      filename: 'index.html',
      // -- 指定输出文件所依赖的入口文件（*.js）的[name]
      chunks: ['main'],
    }),
  ],
  devServer: {
    liveReload: true,
    watchFiles: ['src/**'],
    static: {
      directory: path.join(__dirname, 'dist'),
    },
  },
};
