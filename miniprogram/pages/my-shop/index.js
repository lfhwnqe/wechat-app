// promise封装
import {
  promisify,
} from '../../utils/util.js'
import ShopApi from './api'
// async库
import regeneratorRuntime from '../../lib/regenerator-runtime.js'


//index.js
const app = getApp()

Page({
  data: {
    openid: '',
    shopInfo: null
  },
  async onLoad() {
    await this.checkHasShop(this.data.openid)
  },
  async getOpenid() {
    const openid = wx.getStorageSync('openid');
    this.setData({
      openid
    })
  },
  async checkHasShop() {
    await this.getOpenid()
    const shopInfo = await ShopApi.checkHasShop(this.data.openid)
    if (!shopInfo) {
      wx.navigateTo({
        url: 'create-shop/index'
      })
      return
    }
    this.setData({
      shopInfo
    })
  }
})