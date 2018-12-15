const BASEURL = require('./../config').BASEURL

const api = {
    getUserInfo: '/userInfo'
}

Object.keys.forEach(k => {
    api[k] = BASEURL + api[k]
})
module.exports = api;