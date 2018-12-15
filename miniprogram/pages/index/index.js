// promise封装
import {
  promisify,
} from '../../utils/util.js'
import IndexApi from './api'
import {
  saveGlobalAndStorageSync
} from '../../utils/util'
// async库
import regeneratorRuntime from '../../lib/regenerator-runtime.js'
const wxLogin = promisify(wx.login)


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
  // async login() {
  //   const result = await wxLogin()
  //   if (!result.code) return
  //   const userInfo = await IndexApi.wxLogin(result.code)
  //   Object.keys(userInfo).forEach(k => {
  //     saveGlobalAndStorageSync(k, userInfo[k])
  //   })
  // },
  async getUserInfo() {
    // const userInfo = await IndexApi.getUserInfo()
    // console.log('userInfo==>>', userInfo)
  }
})