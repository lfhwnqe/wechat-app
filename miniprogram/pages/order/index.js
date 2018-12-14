//index.js
const app = getApp();
// promise封装
import { promisify, request } from '../../utils/util.js';
// async库
import regeneratorRuntime from '../../lib/regenerator-runtime.js';

const wxDb = wx.cloud.database();
const wxCallFunction = promisify(wx.cloud.callFunction);
const wxGetuserInfo = promisify(wx.getUserInfo);

const userInfoDb = wxDb.collection('users_info');

//input.js
Page({
  data: {
    totalAmount: '0', // 计算后的总价
    focus: false,
    inputValue: ''
  },
  // 提交订单，成功后增加订单信息，信息包括时间。客户端查询到最后订单时间比扫码时间更晚，则跳到成功页面
  async uploadOrder() {
    console.log('upload order');
  },
  bindButtonTap: function() {
    this.setData({
      focus: true
    });
  },
  bindKeyInput: function(e) {
    this.setData({
      inputValue: e.detail.value
    });
  },
  bindReplaceInput: function(e) {
    var value = e.detail.value;
    var pos = e.detail.cursor;
    if (pos != -1) {
      //光标在中间
      var left = e.detail.value.slice(0, pos);
      //计算光标的位置
      pos = left.replace(/11/g, '2').length;
    }

    //直接返回对象，可以对输入进行过滤处理，同时可以控制光标的位置
    return {
      value: value.replace(/11/g, '2'),
      cursor: pos
    };

    //或者直接返回字符串,光标在最后边
    //return value.replace(/11/g,'2'),
  }
});
