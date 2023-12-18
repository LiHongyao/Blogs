/**
 * 精确捕获数据类型
 * @param target
 * @returns
 */
export const toRawType = (target: any): string => {
	const typeString = Object.prototype.toString.call(target);
	const dataTypeMatch = typeString.match(/\[object (\w+)\]/);
	if (dataTypeMatch) {
		return dataTypeMatch[1].toLocaleLowerCase();
	}
	return 'unknow';
};
