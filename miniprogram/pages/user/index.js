//index.js
const app = getApp();
// promise封装
import { promisify, request } from '../../utils/util.js';
// async库
import regeneratorRuntime from '../../lib/regenerator-runtime.js';
import drawQrcode from '../../lib/weapp.qrcode.min.js';

const wxDb = wx.cloud.database();
const wxCallFunction = promisify(wx.cloud.callFunction);
const wxGetuserInfo = promisify(wx.getUserInfo);

const userInfoDb = wxDb.collection('users_info');

Page({
  data: {
    nickName: '',
    showCode: false,
    openId: ''
  },
  onLoad: async function() {
    await this.setData({
      nickName: app.globalData.nickName,
      openId: app.globalData.openId
    });
  },
  // 展示二维码，并且设置计时器开始轮询，查询到后端生成订单，跳转到展示结果页面
  async showCode() {
    this.setData({
      showCode: true
    });

    drawQrcode({
      width: 200,
      height: 200,
      canvasId: 'myQrcode',
      text: `${this.data.openId}`
    });
  }
});
