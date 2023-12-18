/*
 * @Author: Lee
 * @Date: 2023-08-09 16:16:02
 * @LastEditors: Lee
 * @LastEditTime: 2023-08-09 19:33:12
 * @Description:
 */

// 文件管理相关
import path from 'path';
import fs from 'fs';

import ts from '@rollup/plugin-typescript';
import cjs from '@rollup/plugin-commonjs';
import del from 'rollup-plugin-delete';
import { babel } from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';

const pkgPath = path.resolve(__dirname, '../packages');
const distPath = path.resolve(__dirname, '../libs');

/**
 * 解析包路径
 * @param {*} pkgName
 * @param {*} isDist
 * @returns
 */
export function resolvePkgPath(pkgName, isDist) {
	if (isDist) {
		return `${distPath}/${pkgName}`;
	}
	return `${pkgPath}/${pkgName}`;
}

/**
 * 读取package.json文件
 * @param {*} pkgName
 * @returns
 */
export function getPackageJSON(pkgName) {
	const path = `${resolvePkgPath(pkgName)}/package.json`;
	const str = fs.readFileSync(path, { encoding: 'utf8' });
	return JSON.parse(str);
}

export function getBaseRollupPlugins({ typescript = {} }) {
	return [
		del({ targets: 'libs/*' }),
		cjs(),
		ts(typescript),
		babel({
			extensions: ['.js', '.ts'],
			exclude: 'node_modules/**',
			babelHelpers: 'bundled'
		})
	];
}
