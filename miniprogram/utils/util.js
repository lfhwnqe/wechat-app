import request from './request.js'
import api from './api.js'
/**
 * px转rpx
 */
function px2rpx(pxValue) {
  const app = getApp();
  if (!app.globalData.windowWidth) {
    try {
      const res = wx.getSystemInfoSync()
      app.globalData.windowWidth = res.windowWidth;
      app.globalData.windowHeight = res.windowHeight;
    } catch (e) {}
  }

  return app.globalData.windowWidth ? Number(pxValue) / Number(app.globalData.windowWidth) * 750 : 0;
}

/**
 * rpx转px
 */
function rpx2px(rpxValue) {
  const app = getApp();
  if (!app.globalData.windowWidth) {
    try {
      const res = wx.getSystemInfoSync()
      app.globalData.windowWidth = res.windowWidth;
      app.globalData.windowHeight = res.windowHeight;
    } catch (e) {}
  }

  return app.globalData.windowWidth ? Number(rpxValue) / 750 * Number(app.globalData.windowWidth) : 0;
}

const promisify = (api) => {
  return (options, ...params) => {
    return new Promise((resolve, reject) => {
      api(Object.assign({}, options, {
        success: resolve,
        fail: reject
      }), ...params);
    });
  }
}
// 保存storage和app
const saveGlobalAndStorageSync = (key, data = {}) => {
  const app = getApp();
  wx.setStorageSync(key, data)
  app.globalData[key] = data
}
// 删除缓存与app内变量
const removeGlobalAndStorageSync = (key) => {
  const app = getApp();
  wx.removeStorageSync(key)
  app.globalData[key] = null
}

module.exports = {
  px2rpx,
  rpx2px,
  promisify,
  request,
  api,
  saveGlobalAndStorageSync,
  removeGlobalAndStorageSync
}