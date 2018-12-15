// promise封装
import {
  promisify,
} from './utils/util.js'
import IndexApi from './pages/index/api'
import {
  saveGlobalAndStorageSync,
  removeGlobalAndStorageSync
} from './utils/util'
// async库
import regeneratorRuntime from './lib/regenerator-runtime.js'
const wxLogin = promisify(wx.login)
const wxCheckSession = promisify(wx.checkSession)
const app = getApp()
//app.js
App({
  onLaunch: async function () {
    await this.checkNeedLogin()
  },
  globalData: {
    nickName: '',
    avatarUrl: '',
    role: '',
    openid: '',
    session_key: ''
  },
  // 启动小程序检查session是否过期，过期则清除缓存重新登陆
  async checkNeedLogin() {
    wxCheckSession().then(_ => {
      this.getUserInfoFromStorage()
    }).catch(e => {
      console.log('error:', e);
      ['openid', 'session_key'].forEach(k => {
        removeGlobalAndStorageSync(k)
      })
      this.login()
    })
  },
  async login() {
    const result = await wxLogin()
    if (!result.code) return
    const userInfo = await IndexApi.wxLogin(result.code)
    Object.keys(userInfo).forEach(k => {
      saveGlobalAndStorageSync(k, userInfo[k])
    })
  },
  async getUserInfoFromStorage() {
    const app = getApp();
    ['openid', 'session_key'].forEach(k => {
      app.globalData[k] = wx.getStorageSync(k)
    })
  }
})