//index.js
const app = getApp();
// promise封装
import {
    promisify,
    request
} from '../../utils/util.js';
// async库
import regeneratorRuntime from '../../lib/regenerator-runtime.js';
import drawQrcode from '../../lib/weapp.qrcode.min.js';

const wxDb = wx.cloud.database();
const wxCallFunction = promisify(wx.cloud.callFunction);
const wxGetuserInfo = promisify(wx.getUserInfo);

const userInfoDb = wxDb.collection('users_info');

// pages/result/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 清除错误信息并返回对应角色主页
  async backToHome(){
    console.log('go home')
  }
})