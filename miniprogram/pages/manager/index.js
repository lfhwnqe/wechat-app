//index.js
const app = getApp();
// promise封装
import {
    promisify,
    request
} from '../../utils/util.js';
// async库
import regeneratorRuntime from '../../lib/regenerator-runtime.js';

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
    onLoad: async function () {
        await this.setData({
            nickName: app.globalData.nickName,
            openId: app.globalData.openId
        });
    },
    // 扫描二维码 根据扫描信息跳到对订单页面，填入对应信息
    async scanCode() {
        console.log('scan code')

    }
});