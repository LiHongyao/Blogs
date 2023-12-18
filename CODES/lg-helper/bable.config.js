/*
 * @Author: Lee
 * @Date: 2023-08-09 16:53:11
 * @LastEditors: Lee
 * @LastEditTime: 2023-08-09 17:14:37
 * @Description:
 */
export default {
	presets: [
		[
			'@babel/preset-env',
			{
				useBuiltIns: 'usage',
				corejs: 3,
				modules: false
			}
		],
		'@babel/preset-typescript'
	]
};
