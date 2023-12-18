/*
 * @Author: Lee
 * @Date: 2023-08-09 15:08:53
 * @LastEditors: Lee
 * @LastEditTime: 2023-08-09 18:51:44
 * @Description:
 */
interface PushOptions {
	// 携带参数
	query?: Record<string, any>;
	// 是否需要原生实现导航栏（默认：0）
	needHeader?: 0 | 1;
	// 是否需要原生返回（默认：1）
	appBack?: 0 | 1;
}

class HSchemes {
	private __SCHEME: string = '';
	private __BASE: string = '';
	// 构造单例
	private static instance: HSchemes;
	private constructor() {}

	/**
	 * 获取Scheme单例实例对象
	 * @returns 返回实例对象
	 */
	public static defaultSchemes() {
		if (!this.instance) {
			this.instance = new HSchemes();
		}
		return this.instance;
	}

	/**
	 * 全局配置项，你应该在项目初始化时调用config进行配置。
	 *
	 * @param scheme scheme地址，只需要配置前缀，如：ddou://www.d-dou.com
	 * @param base 二级目录地址
	 */
	public config(scheme: string, base: string = '') {
		if (base && !/^\//.test(base)) {
			base = `/${base}`;
		}
		this.__SCHEME = scheme;
		this.__BASE = base;
	}

	/**
	 * 跳转H5页面
	 *
	 * @param path H5路由
	 * @param options  可选项
	 */
	public push(path: string, options: PushOptions = {}) {
		const SCHEME_PUSH = `${this.__SCHEME}/push`;
		// 解构参数
		const { query, needHeader = 0, appBack = 1 } = options;
		// 处理url
		let url: string;
		// 如果连接以http开头，则直接赋值
		if (/^http/.test(path)) {
			url = path;
		} else {
			url = `${window.location.origin}${this.__BASE}${path}?needHeader=${needHeader}&appBack=${appBack}`;
			// 判断是否存在query参数，如果存在，则做拼接处理
			if (query) {
				Object.keys(query).forEach((key) => {
					url += `&${key}=${query[key]}`;
				});
			}
		}
		// 处理scheme地址
		const schemeHref = `${SCHEME_PUSH}?url=${encodeURIComponent(url)}`;
		// 执行跳转
		window.location.href = schemeHref;
	}

	/**
	 * 切换原生tab页
	 * @param index
	 */
	public switchTab(index: number) {
		const SCHEME_SWITCH = `${this.__SCHEME}/switch`;
		window.location.href = `${SCHEME_SWITCH}?index=${index}`;
	}

	/**
	 * 跳转原生页面
	 *
	 * @param path
	 */
	public jump(path: string, params?: Record<string, any>) {
		const SCHEME_JUMP = `${this.__SCHEME}/jump`;
		// 拼接scheme
		let schemeHref = `${SCHEME_JUMP}${path}`;
		// 判断原生页面是否需要参数
		if (params) {
			schemeHref += '?';
			Object.keys(params).forEach((key) => {
				schemeHref += `${key}=${params[key]}&`;
			});
			schemeHref = schemeHref.slice(0, -1);
		}
		window.location.href = schemeHref;
	}
	/**
	 * 原生打开外部浏览器
	 * @param url 资源地址
	 */
	public openBrowser(url: string) {
		const SCHEME_BROWSER = `${this.__SCHEME}/browser`;
		window.location.href = `${SCHEME_BROWSER}?url=${encodeURIComponent(url)}`;
	}
}

const Schemes = HSchemes.defaultSchemes();
export default Schemes;
