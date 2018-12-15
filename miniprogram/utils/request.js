/**
 * 请求方法封装
 */

// 弹出框
const hideLoading = require('./modal.js').hideLoading;
import {
    $wuxDialog,
    $wuxToptips
} from '../components/wux';

/**
 * 请求方法
 * 
 * @options {json}     请求参数
 *   @options.url       {string}   请求地址
 *   @options.data      {json}     请求数据
 *   @options.header    {json}     请求头
 *   @options.method    {string}   请求方法，默认POST
 *   @options.dataType  {string}   数据类型，默认json
 *   @options.success   {function} 成功回调
 *   @options.fail      {function} 失败回调
 *   @options.complete  {function} 请求完成回调
 */
function request2(options = {}) {

    // 请求URL格式化
    let url = '';
    if (options.method + '' == 'GET') {
        // GET请求URL
        for (let key in options.data) {
            url += key + '=' + options.data[key] + '&';
        }

        if (url) {
            url = url.slice(0, -1);
        }
    }

    if (options.url && url) {
        if (options.url.indexOf('?') > -1) {
            url = '&' + url;
        } else {
            url = '?' + url;
        }
    }

    url = options.url + url;

    // 发出请求
    return new Promise((resolve, reject) => {
        wx.request({
            url,
            data: JSON.stringify(options.data || {}),
            header: options.header || buildHeader(),
            method: options.method || 'POST',
            dataType: options.dataType || 'json',
            success: (res) => {
                const app = getApp();
                // log
                devConsoleLog('请求地址:');
                devConsoleLog(options.url);
                devConsoleLog('请求参数:');
                devConsoleLog(options);

                // http状态错误
                if (res.statusCode + '' != '200') {

                    // log
                    devConsoleLog('HTTP状态码错误：');
                    devConsoleLog(res);


                    // 二次请求失败后提示失败
                    $wuxToptips.show({
                        icon: 'cancel',
                        timer: 3000,
                        text: '获取数据失败，请重试',
                    })

                    // 失败回调
                    return reject(res)

                } else {

                    // 返回码错误
                    if (res.data && res.data['code'] != '0' || (url.indexOf('order/create') > -1 && res.data && res.data.data && res.data.data.status == -1)) {

                        // log
                        devConsoleLog('返回失败CODE：');
                        devConsoleLog(res);

                        // 登录失效，跳转重新登录
                        if (res.data.code == "9004") {
                            app.globalData.sid = '';
                            app.globalData.uid = '';
                            app.globalData.ouid = '';
                            app.globalData.wxUserInfo = null;
                            app.globalData.oilUserInfo = null;

                            try {
                                wx.removeStorageSync('sid');
                                wx.removeStorageSync('uid');
                                wx.removeStorageSync('ouid');
                                wx.removeStorageSync('wxUserInfo');
                                wx.removeStorageSync('oilUserInfo');
                            } catch (e) {}

                            return $wuxDialog.alert({
                                content: '登录失效，请重新登录',
                                onConfirm: () => {
                                    return wx.reLaunch({
                                        url: '/pages/index/index'
                                    })
                                }
                            })
                        }


                        if (res.data.data && (url.indexOf('station/detail') >= 0 || url.indexOf('order/query_car_list') >= 0)) {
                            // 如果在scan页面。不抛错误
                        }

                        // 错误提示
                        else if (res.data.data && url.indexOf('/order/verify_password') == -1 && url.indexOf('/order/create' == -1)) {
                            $wuxToptips.show({
                                icon: 'cancel',
                                timer: 3000,
                                text: res.data.data,
                            })
                        } else if (res.data.code == '9005' && res.data.error_msg) {
                            $wuxToptips.show({
                                icon: 'cancel',
                                timer: 3000,
                                text: res.data.error_msg,
                            })
                        } else {
                            $wuxToptips.show({
                                icon: 'cancel',
                                timer: 3000,
                                text: res.data.error_msg,
                            })
                            hideLoading()
                        }

                        return reject(res)
                    } else {

                        // log
                        devConsoleLog('请求成功：');
                        devConsoleLog(res);

                        return resolve(res.data || res)
                    }
                }
            },
            fail: (err) => {

                // log
                devConsoleLog('请求地址:');
                devConsoleLog(options.url);
                devConsoleLog('请求参数:');
                devConsoleLog(options);
                devConsoleLog('发起请求失败：');
                devConsoleLog(err);

                // 错误提示
                $wuxToptips.show({
                    icon: 'cancel',
                    timer: 3000,
                    text: '请求超时，请检查网络后重试'
                })

                return reject(err)
            },
            complete: options.complete
        });
    })
}

/**
 * 开发环境输出数据到终端
 */
function devConsoleLog(data) {
    if (getApp().globalData.env != 'prod') {
        console.log(data);
    }
}

/**
 * 生成header
 */
function buildHeader() {

    // 获取用户唯一标识，可能失效，失效后将出现错误unlogin触发重新登录
    let header = {
        'content-type': 'application/json',
        'sid': getApp().globalData.sid,
        'uid': getApp().globalData.uid,
        'ouid': getApp().globalData.ouid
    };

    return header;
}

module.exports = request2;