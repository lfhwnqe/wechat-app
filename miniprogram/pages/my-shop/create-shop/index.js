// promise封装
import {
  promisify,
} from '../../utils/util.js'
import IndexApi from './api'
// async库
import regeneratorRuntime from '../../lib/regenerator-runtime.js'


//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    openId: '',
    role: '',
    appId: '',
    nickName: '',
    firstLoad: true
  },
  async onLoad() {
    // await this.login()
  },
  myIntegral() {
    wx.navigateTo({
      url: 'my-integral'
    })
  },
  myShop() {
    wx.navigateTo({
      url: 'my-shop'
    })
  }
})