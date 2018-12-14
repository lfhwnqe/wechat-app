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
    await this.getUserInfo()
    await this.checkuserInfo()
    await wxNavigateTo({
      url: `/pages/${this.data.role}/index`
    })
    await this.setData({
      firstLoad: false
    })
  },
  async onShow() {
    if (this.data.firstLoad) return
    await wxNavigateTo({
      url: `/pages/${this.data.role}/index`
    })
  },

  // 获取当前用户openId和appId
  async getUserInfo() {
    const loginInfo = await wxCallFunction({
      name: 'get_userinfo'
    })
    const wxInfo = await wxGetuserInfo()
    const {
      userInfo,
    } = wxInfo
    const {
      nickName,
      avatarUrl
    } = userInfo
    const {
      openId,
      appId,
    } = loginInfo.result
    await this.setData({
      openId,
      appId,
      avatarUrl,
      nickName
    });
    app.globalData.nickName = nickName
    app.globalData.openId = openId
    app.globalData.avatarUrl = avatarUrl
  },
  // 获取当前账户角色，第一次登陆的用户则创建用户信息
  async checkuserInfo() {
    const thisUser = await userInfoDb.where({
      _openid: this.data.openId
    }).get()
    // 没有用户信息，创建用户
    if (thisUser.data.length < 1) {
      await userInfoDb.add({
        data: {
          appId: this.data.appId,
          role: 'user',
          totalAmount: 0,
          lastBuyTime: ''
        }
      })
    }
    const role = thisUser.data.length < 1 ? 'user' : thisUser.data[0].role
    app.globalData.role = role
    await this.setData({
      role: role
    })
  },

  // getLocation: function () {
  //   wx.getLocation({
  //     type: 'wgs84',
  //     success: (res) => {
  //       var latitude = res.latitude // 纬度
  //       var longitude = res.longitude // 经度
  //       console.log('latitude==>>', latitude, 'longitude==>>', longitude)
  //       this.setData({
  //         latitute: latitude,
  //         longitude: longitude
  //       })
  //     }
  //   })
  // },
  // changeHello: function () {
  //   this.setData({
  //     msg: 'bye-bye'
  //   })
  // },
  // cloudTodo() {
  //   wx.cloud.callFunction({
  //     // 云函数名称
  //     name: 'todos',
  //     success: (res) => {
  //       console.log(res.result.data) // 3
  //       this.setData({
  //         todos: res.result.data
  //       })
  //     },
  //     fail: console.error
  //   })
  // },
  // onLoad: function () {
  //   if (!wx.cloud) {
  //     wx.redirectTo({
  //       url: '../chooseLib/chooseLib',
  //     })
  //     return
  //   }

  //   // 获取用户信息
  //   wx.getSetting({
  //     success: res => {
  //       if (res.authSetting['scope.userInfo']) {
  //         // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
  //         wx.getUserInfo({
  //           success: res => {
  //             this.setData({
  //               avatarUrl: res.userInfo.avatarUrl,
  //               userInfo: res.userInfo
  //             })
  //           }
  //         })
  //       }
  //     }
  //   })
  // },

  // onGetUserInfo: function (e) {
  //   if (!this.logged && e.detail.userInfo) {
  //     console.log('e==>>', e)
  //     this.setData({
  //       logged: true,
  //       avatarUrl: e.detail.userInfo.avatarUrl,
  //       userInfo: e.detail.userInfo
  //     })
  //   }
  // },

  // onGetOpenid: function () {
  //   // 调用云函数
  //   wx.cloud.callFunction({
  //     name: 'login',
  //     data: {},
  //     success: res => {
  //       console.log('[云函数] [login] user openid: ', res.result.openid)
  //       app.globalData.openid = res.result.openid
  //       wx.navigateTo({
  //         url: '../userConsole/userConsole',
  //       })
  //     },
  //     fail: err => {
  //       console.error('[云函数] [login] 调用失败', err)
  //       wx.navigateTo({
  //         url: '../deployFunctions/deployFunctions',
  //       })
  //     }
  //   })
  // },

  // // 上传图片
  // doUpload: function () {
  //   // 选择图片
  //   wx.chooseImage({
  //     count: 1,
  //     sizeType: ['compressed'],
  //     sourceType: ['album', 'camera'],
  //     success: function (res) {

  //       wx.showLoading({
  //         title: '上传中',
  //       })

  //       const filePath = res.tempFilePaths[0]

  //       // 上传图片
  //       const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
  //       wx.cloud.uploadFile({
  //         cloudPath,
  //         filePath,
  //         success: res => {
  //           console.log('[上传文件] 成功：', res)

  //           app.globalData.fileID = res.fileID
  //           app.globalData.cloudPath = cloudPath
  //           app.globalData.imagePath = filePath

  //           wx.navigateTo({
  //             url: '../storageConsole/storageConsole'
  //           })
  //         },
  //         fail: e => {
  //           console.error('[上传文件] 失败：', e)
  //           wx.showToast({
  //             icon: 'none',
  //             title: '上传失败',
  //           })
  //         },
  //         complete: () => {
  //           wx.hideLoading()
  //         }
  //       })

  //     },
  //     fail: e => {
  //       console.error(e)
  //     }
  //   })
  // },

})