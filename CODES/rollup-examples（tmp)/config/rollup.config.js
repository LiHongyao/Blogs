import { defineConfig } from 'rollup';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import alias from '@rollup/plugin-alias';
import json from '@rollup/plugin-json';
import html from '@rollup/plugin-html';
import terser from '@rollup/plugin-terser';
import { babel } from '@rollup/plugin-babel';
import del from 'rollup-plugin-delete';
import serve from 'rollup-plugin-serve';
import postcss from 'rollup-plugin-postcss';

const resolve = (p) => {
  return path.resolve(dirname(fileURLToPath(import.meta.url)), '..', p);
};

export default defineConfig({
  external: [],
  input: resolve('src/index.js'),
  output: {
    dir: resolve('dist'),
    entryFileNames: '[name]-[hash].js',
    format: 'umd',
    sourcemap: true,
  },
  plugins: [
    // -- 清除dist目录
    del({ targets: 'dist/*' }),
    // -- 支持引用json模块
    json(),
    // -- 支持引用npm模块
    nodeResolve(),
    // -- 支持引用CommonJS模块
    commonjs(),
    // -- 别名解析
    alias({
      entries: {
        '@': resolve('src'),
      },
    }),
    // -- 压缩代码
    terser(),
    // -- 处理html
    // html(),
    // -- 处理js
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
    }),
    // -- 处理css
    postcss({
      extract: true,
      minimize: false,
    }),
    // -- 本地服务
    serve({
      host: 'localhost',
      port: 3000,
      historyApiFallback: true,
      contentBase: [resolve('examples')],
    }),
  ],
});
