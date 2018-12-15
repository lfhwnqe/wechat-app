// promise封装
import {
  promisify,
  request,
} from '../../utils/util.js'
// async库
import regeneratorRuntime from '../../lib/regenerator-runtime.js'

const wxDb = wx.cloud.database()
const wxCallFunction = promisify(wx.cloud.callFunction)
const wxGetuserInfo = promisify(wx.getUserInfo)
const wxNavigateTo = promisify(wx.reLaunch)

const userInfoDb = wxDb.collection('users_info')
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
    console.log('hello')
  },
})