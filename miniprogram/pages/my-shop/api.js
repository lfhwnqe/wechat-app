import request from '../../utils/request.js'


class ShopApi {
    static checkHasShop(openid) {
        return Promise.resolve({
            name: '百年老店'
        })
    }
}

export default ShopApi