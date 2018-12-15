const BASEURL = require('./../config').BASEURL
import {
    request
} from './request'

const api = {
    getUserInfo: '/userInfo'
}

Object.keys(api).forEach(k => {
    api[k] = BASEURL + api[k]
})

const getUserInfo = (data, success, fail) => {
    return request({
        url:'',
        data,success,fail
    })
}
module.exports = {
    getUserInfo
};