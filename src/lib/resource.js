let API_SERVER = 'http://localhost' // 开发环境
let Resource = {
    API_SERVER: API_SERVER,

    query (options) {
        let isGET = options.method === 'GET'
        
        let header = {
            'Accept': 'application/json',
            'Authorization': ''
        }

        let url = null;
        let data = null;
        if (isGET) {
            url = getUrl(options.resource, options.data, options.service)
            data = {}
        } else {
        let _method = {}
        if (options.data.hasOwnProperty('_method')) {
            _method = {'_method':options.data['_method']}
            delete options['_method']
        }
        url = getUrl(options.resource, _method, options.service)
        data = options.data
        header['content-type'] = 'application/x-www-form-urlencoded';
        }

        console.debug(`[resource] ${options.method} ${url}`);
        return new Promise((resolve, reject) => {
        wx.request({
            url: url,
            method: options.method,
            data: data,
            header: header,
            success: res => {
        console.log('return from server')
            if (res.statusCode === 200) {
                let businessData = res.data.data;
                if (res.data.code == 200) {
                resolve(businessData, res.data);
                } else {
                res.isBusinessError = true
                reject(res)
                }
            } else {
                res.isBusinessError = false
                reject(res);
            }
            },
            fail: res => {
            res.isBusinessError = false
            reject(res);  
            }
        })
        })
    },

    get (options) {
        options.method = 'GET'
        return this.query(options)
    },

    put (options) {
        options.method = 'POST'
        options.data['_method'] = 'put'
        return this.query(options)
    },

    post (options) {
        options.method = 'POST'
        return this.query(options)
    },

    delete (options) {
        options.method = 'POST'
        options.data['_method'] = 'delete'
        return this.query(options)
    }
}