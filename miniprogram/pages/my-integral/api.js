import request from '../../utils/request.js'


class IndexApi {
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