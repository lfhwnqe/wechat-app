// 云函数入口文件
const cloud = require('wx-server-sdk')
// const db = wx.cloud.database()
// const userInfoDb = db.collection('users_info')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const {
    userInfo
  } = event

  return userInfo
}