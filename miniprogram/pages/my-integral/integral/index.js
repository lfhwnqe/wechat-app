// promise封装
import {
  promisify,
} from '../../../utils/util.js'
import IndexApi from '../api'
// async库
import regeneratorRuntime from '../../../lib/regenerator-runtime.js'


//index.js
const app = getApp()

Page({
  data: {
    integralList: []
  },
  async onShow() {
    this.getShopList()
  },
  async getShopList() {
    // TODO 获取店铺信息
    this.setData({
      integralList: [{
        name: '超级奶茶',
        points: 500,
        id: 1
      }, {
        name: '超级奶茶1',
        points: 125,
        id: 2
      }, {
        name: '超级奶茶2',
        points: 240,
        id: 3
      }]
    })
  },
})