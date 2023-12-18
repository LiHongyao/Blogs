/*
 * @Author: Lee
 * @Date: 2023-08-10 19:57:47
 * @LastEditors: Lee
 * @LastEditTime: 2023-08-10 20:08:23
 * @Description:
 */
import { defineConfig } from 'rollup';

export default defineConfig({
  external: ['lodash'],
  input: 'src/index.js',
  output: [
    {
      file: 'dist/iife/bundle.js',
      format: 'iife',
      name: 'Test',
      globals: {
        lodash: 'lodash',
      },
    },
    {
      file: 'dist/cjs/bundle.js',
      format: 'cjs',
    },
    {
      file: 'dist/amd/bundle.js',
      format: 'amd',
      amd: {
        id: 'Test',
      },
    },

    {
      file: 'dist/esm/bundle.js',
      format: 'esm',
    },

    {
      file: 'dist/umd/bundle.js',
      format: 'umd',
      name: 'Test',
      globals: {
        lodash: 'lodash',
      },
      amd: {
        id: 'Test',
      },
    },
    {
      file: 'dist/system/bundle.js',
      format: 'system',
    },
  ],
});
