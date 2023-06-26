/*
 * @Author: Lee
 * @Date: 2023-06-02 17:45:21
 * @LastEditors: Lee
 * @LastEditTime: 2023-06-03 15:27:38
 * @Description:
 */

const { DefinePlugin } = require('webpack');
const resolve = require('./paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');

/** @type {import('webpack').Configuration} */
const commonConfig = {
  entry: './src/index.js',
  output: {
    // -- 指定输出文件
    filename: 'assets/[name]-[contenthash:8].js',
    // -- 指定输出位置
    path: resolve('./dist'),
    // -- 在生成文件之前清空 output 目录
    // -- 5.20之前使用 clean-webpack-plugin 插件
    clean: true,
  },
  resolve: {
    // -- 支持后缀（供webpack识别处理）
    extensions: ['.js', '.json', '.ts', '.jsx', '.tsx', '.vue'],
    // -- 别名
    alias: {
      '@': resolve('./src'),
    },
  },
  optimization: {
    minimizer: [new CssMinimizerWebpackPlugin()],
    // -- 代码分离
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        // -- vendor 缓存组用于将来自 node_modules 目录的模块打包到名为 vendors 的块中。
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: -10, // 指定缓存组的优先级。数字越大，优先级越高
          chunks: 'initial', // 指定在哪些类型的块中应用该缓存组
        },
        // -- common缓存组用于将多次被引用的模块打包到名为 common 的块中
        common: {
          name: 'common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true, // 指定是否重用已经存在的块
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              esModule: false,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              esModule: false,
            },
          },
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(png|svg|gif|jpe?g)$/,
        type: 'asset',
        generator: {
          filename: 'assets/[name]-[contenthash:8][ext][query]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 60 * 1024, // 50kb
          },
        },
      },
      {
        test: /\.(ttf|otf|eot|woff2?)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name]-[contenthash:8][ext]',
        },
      },
    ],
  },
  plugins: [
    // -- 拷贝资源
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          globOptions: {
            ignore: ['**/index.html'],
          },
        },
      ],
    }),
    // -- 抽离CSS
    new MiniCssExtractPlugin({
      filename: 'assets/[name]-[contenthash:8].css',
    }),
    // -- 压缩CSS
    new CssMinimizerWebpackPlugin(),
    // -- 注入变量
    new DefinePlugin({
      BASE_URL: '"./"',
    }),
    // -- 处理HTML
    new HtmlWebpackPlugin({
      title: '构建工具-示例',
      template: './public/index.html',
    }),
  ],
};
module.exports = commonConfig;
