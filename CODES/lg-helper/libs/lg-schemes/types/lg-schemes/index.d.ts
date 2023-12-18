interface PushOptions {
    query?: Record<string, any>;
    needHeader?: 0 | 1;
    appBack?: 0 | 1;
}
declare class HSchemes {
    private __SCHEME;
    private __BASE;
    private static instance;
    private constructor();
    /**
     * 获取Scheme单例实例对象
     * @returns 返回实例对象
     */
    static defaultSchemes(): HSchemes;
    /**
     * 全局配置项，你应该在项目初始化时调用config进行配置。
     *
     * @param scheme scheme地址，只需要配置前缀，如：ddou://www.d-dou.com
     * @param base 二级目录地址
     */
    config(scheme: string, base?: string): void;
    /**
     * 跳转H5页面
     *
     * @param path H5路由
     * @param options  可选项
     */
    push(path: string, options?: PushOptions): void;
    /**
     * 切换原生tab页
     * @param index
     */
    switchTab(index: number): void;
    /**
     * 跳转原生页面
     *
     * @param path
     */
    jump(path: string, params?: Record<string, any>): void;
    /**
     * 原生打开外部浏览器
     * @param url 资源地址
     */
    openBrowser(url: string): void;
}
declare const Schemes: HSchemes;
export default Schemes;
