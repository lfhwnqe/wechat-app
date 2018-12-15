import request from '../../utils/request.js'


class IndexApi {
    static getUserInfo() {
        return new Promise((resolve, reject) => {
            wx.login({
                success: (wxRes) => {
                    // 获取微信用户信息
                    wx.getUserInfo({
                        withCredentials: true,
                        success: (userRes) => {
                            let data = {
                                code: wxRes.code,
                                encryptedData: userRes.encryptedData,
                                iv: userRes.iv
                            }
                            resolve(request({
                                url: '/userInfo',
                                data
                            }))
                        },
                        reject
                    });
                },
                reject
            })
        })
    }

    static wxLogin(code) {
        return request({
            url: '/wxLogin',
            data: {
                code
            }
        })
    }
}

export default IndexApi