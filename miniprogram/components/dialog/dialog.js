import Component from '../component'
const hideLoading = require('../../utils/modal.js').hideLoading;

export default {
	/**
	 * 默认参数
	 */
  setDefaults() {
    return {
      title: '',
      content: '',
      buttons: [],
      cancel:false
    }
  },
	/**
	 * 默认数据
	 */
  data() {
    return {
      onCancel() { },
      cancelText: `取消`,
      cancelType: `weui-dialog__btn_cancel`,
      onConfirm() { },
      confirmText: `确定`,
      confirmType: `weui-dialog__btn_confirm`,
    }
  },
	/**
	 * 显示dialog组件
	 * @param {Object} opts 配置项
	 * @param {String} opts.title 提示标题
	 * @param {String} opts.content 提示文本
	 * @param {Boolean} opts.verticalButtons 是否显示垂直按钮布局
	 * @param {Array} opts.buttons 按钮
	 * @param {String} opts.buttons.text 按钮的文字
	 * @param {String} opts.buttons.type 按钮的类型
	 * @param {Boolean} opts.buttons.bold 是否加粗按钮的文字
	 * @param {Function} opts.buttons.onTap 按钮的点击事件
	 */
  open(opts = {}) {
    hideLoading();
    opts.lines = opts.content ? opts.content.split('||') : [];
    const options = Object.assign({ animateCss: '', visible: !1 }, this.setDefaults(), opts)

    // 实例化组件
    const component = new Component({
      scope: `$wux.dialog`,
      data: options,
      methods: {
        /**
         * 隐藏
         */
        hide(cb) {
          if (this.removed) return !1
          this.removed = !0
          this.setHidden()
          setTimeout(() => typeof cb === `function` && cb(), 300)
        },
				/**
				 * 显示
				 */
        show() {
          if (this.removed) return !1
          this.setVisible()
        },
				/**
				 * 按钮点击事件
				 */
        buttonTapped(e) {
          const index = e.currentTarget.dataset.index
          const button = options.buttons[index]
          this.hide(() => button && typeof button.onTap === `function` && button.onTap(e))
        }
      },
    })

    component.show()

    return component.hide
  },
	/**
	 * 显示dialog组件
	 * @param {Object} opts 配置项
	 * @param {String} opts.title 提示标题
	 * @param {String} opts.content 提示文本
	 * @param {String} opts.confirmText 确定按钮的文字，默认为"确定"
	 * @param {String} opts.confirmType 确定按钮的类型
	 * @param {Function} opts.onConfirm 确定按钮的点击事件
	 */
  alert(opts = {}) {
    return this.open(Object.assign({
      buttons: [
        {
          text: opts.confirmText || this.data().confirmText,
          type: opts.confirmType || this.data().confirmType,
          onTap(e) {
            typeof opts.onConfirm === `function` && opts.onConfirm(e)
          },
        },
      ],
    }, opts))
  },
	/**
	 * 显示dialog组件
	 * @param {Object} opts 配置项
	 * @param {String} opts.title 提示标题
	 * @param {String} opts.content 提示文本
	 * @param {String} opts.confirmText 确定按钮的文字，默认为"确定"
	 * @param {String} opts.confirmType 确定按钮的类型
	 * @param {Function} opts.onConfirm 确定按钮的点击事件
	 * @param {String} opts.cancelText 取消按钮的文字，默认为"取消"
	 * @param {String} opts.cancelType 取消按钮的类型
	 * @param {Function} opts.onCancel 取消按钮的点击事件
	 */
  confirm(opts = {}) {
    return this.open(Object.assign({
      buttons: [
        {
          text: opts.cancelText || this.data().cancelText,
          type: opts.cancelType || this.data().cancelType,
          onTap(e) {
            typeof opts.onCancel === `function` && opts.onCancel(e)
          },
        },
        {
          text: opts.confirmText || this.data().confirmText,
          type: opts.confirmType || this.data().confirmType,
          onTap(e) {
            typeof opts.onConfirm === `function` && opts.onConfirm(e)
          },
        },
      ],
    }, opts))
  },

  confirmTwo(opts = {}) {
    return this.open(Object.assign({
      buttons: [
        {
          text: opts.confirmText || this.data().confirmText,
          type: opts.confirmType || this.data().confirmType,
          onTap(e) {
            typeof opts.onConfirm === `function` && opts.onConfirm(e)
          },
        },
        {
          text: opts.cancelText || this.data().cancelText,
          type: opts.cancelType || this.data().cancelType,
          onTap(e) {
            typeof opts.onCancel === `function` && opts.onCancel(e)
          },
        }
      ],
    }, opts))
  },

  promit(opts = {}) {
    return this.open(Object.assign({
      buttons: [
        {
          text: opts.cancelText || this.data().cancelText,
          type: opts.cancelType || this.data().cancelType,
          onTap(e) {
            typeof opts.onCancel === `function` && opts.onCancel(e)
          },
        },
        {
          text: opts.confirmText || this.data().confirmText,
          type: opts.confirmType || this.data().confirmType,
          onTap(e) {
            typeof opts.onConfirm === `function` && opts.onConfirm(e)
          },
        },
      ],
    }, opts))
  },
}