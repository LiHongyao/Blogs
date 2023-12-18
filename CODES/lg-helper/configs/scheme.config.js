/*
 * @Author: Lee
 * @Date: 2023-08-09 16:12:58
 * @LastEditors: Lee
 * @LastEditTime: 2023-08-09 19:33:26
 * @Description:
 */
import { defineConfig } from 'rollup';
import { getBaseRollupPlugins, getPackageJSON, resolvePkgPath } from './utils';
import generatePackageJson from 'rollup-plugin-generate-package-json';

const { name, module } = getPackageJSON('lg-schemes');

// react 包的路径
const pkgPath = resolvePkgPath(name);
// react 产物路径
const pkgDistPath = resolvePkgPath(name, true);

export default defineConfig({
	input: `${pkgPath}/${module}`,
	output: {
		file: `${pkgDistPath}/index.js`,
		format: 'umd',
		name: 'Schemes'
	},
	plugins: [
		...getBaseRollupPlugins({
			typescript: {}
		}),
		generatePackageJson({
			inputFolder: pkgPath,
			outputFolder: pkgDistPath,
			baseContents: ({ name, description, version }) => ({
				name,
				description,
				version,
				main: 'index.js'
			})
		})
	]
});
