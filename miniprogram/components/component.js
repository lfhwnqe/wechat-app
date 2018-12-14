/**
 * 模块化组件
 * @param {Object} options 			配置项
 * @param {String} options.scope 	组件的命名空间
 * @param {Object} options.data  	组件的动态数据
 * @param {Object} options.methods 	组件的事件函数
 */
class Component {
    constructor(options = {}) {

        // 将options里面的属性转成对象options属性
        Object.assign(this, {
            options,
        });

        // 调取初始化
        this.__init()
    }

    /**
     * 初始化
     */
    __init() {

        // 获取当前页面对象为当前对象的page属性
        this.page = getCurrentPages()[getCurrentPages().length - 1];

        // 将页面对象的setData方法绑定this环境为页面对象并赋值为对象的方法setData
        this.setData = this.page.setData.bind(this.page);

        // 初始化组件状态
        this.__initState();
    }

    /**
     * 初始化组件状态
     */
    __initState() {

        // 初始化数据
        this.options.data && this.__initData();

        // 初始化方法
        this.options.methods && this.__initMethods();
    }

    /**
     * 绑定组件动态数据
     */
    __initData() {

        // 获取命名空间和参数数据
        const scope = this.options.scope;
        const data = this.options.data;

        // 利用private属性_data保存数据
        this._data = {};

        // 筛选非函数类型，更改参数中函数的 this 指向为当前组件
        if (!this.isEmptyObject(data)) {
            for (let key in data) {
                if (data.hasOwnProperty(key)) {
                    if (typeof data[key] === `function`) {
                        data[key] = data[key].bind(this)
                    } else {
                        this._data[key] = data[key]
                    }
                }
            }
        }

        // 将数据同步到 page.data 上面方便渲染组件
        this.page.setData({
            [`${scope}`]: this._data,
        })
    }

    /**
     * 绑定组件事件函数
     */
    __initMethods() {

        // 获取命名空间和方法数据
        const scope = this.options.scope;
        const methods = this.options.methods;

        // 筛选函数类型
        if (!this.isEmptyObject(methods)) {
            for (let key in methods) {
                if (methods.hasOwnProperty(key) && typeof methods[key] === `function`) {
                    this[key] = methods[key] = methods[key].bind(this)

                    // 将 methods 内的方法重命名并挂载到 page 上面，否则 template 内找不到事件
                    this.page[`${scope}.${key}`] = methods[key]

                    // 将方法名同步至 page.data 上面，方便在模板内使用 {{ method }} 方式绑定事件
                    this.setData({
                        [`${scope}.${key}`]: `${scope}.${key}`,
                    })
                }
            }
        }
    }

    /**
     * 获取组件的 data 数据
     */
    getComponentData() {

        // 在页面里获取当前的组件数据
        let data = this.page.data;
        let name = this.options.scope && this.options.scope.split('.');

        name.forEach((n, i) => {
            data = data[n]
        });

        return data;
    }

    /**
     * 判断 object 是否为空
     */
    isEmptyObject(e) {
        for (let t in e)
            return !1
        return !0
    }

    /**
     * 设置元素显示
     */
    setVisible(className = `weui-animate-fade-in`) {
        this.setData({
            [`${this.options.scope}.animateCss`]: className,
            [`${this.options.scope}.visible`]: !0,
        })
    }

    /**
     * 设置元素隐藏
     */
    setHidden(className = `weui-animate-fade-out`, timer = 300) {
        this.setData({
            [`${this.options.scope}.animateCss`]: className,
        })
        setTimeout(() => {
            this.setData({
                [`${this.options.scope}.visible`]: !1,
            })
        }, timer)
    }
}

export default Component