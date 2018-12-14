/**
 * Loading兼容封装
 */

let SDKNum = 0;


function showLoading(options) {

  if (SDKNum == 0){
    //判断系统信息
    let SDKV = wx.getSystemInfoSync().SDKVersion;
    
    if (SDKV){
      //删除 .
      SDKNum = parseInt(SDKV.split(".").join(""));
    }
  }

  //showLoading需要基础库达到 1.1.0 才能使用 
  if (SDKNum >= 110) {
    wx.showLoading({
      title: options.title,
      mask: true ,
    })
  }else{
    wx.showToast({
      icon: "loading",
      title: options.title,
      duration: 30000,
      mask: true,
    })
  }

}

function hideLoading() {

  if (SDKNum >= 110) {
    wx.hideLoading();
  }else{
    wx.hideToast();
  }

}

module.exports = {
  showLoading: showLoading,
  hideLoading: hideLoading
};