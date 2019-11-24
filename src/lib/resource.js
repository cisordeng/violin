import Vue from 'vue';

let API_SERVER = 'http://devapi.cisor.cn' // 开发环境
let API_SECRET = '7d736a2822f8c005a8f034b477b23f27'
let DEFAULT_PARAMS = {}
let Resource = {
    API_SERVER: API_SERVER,

    query(options) {
        if (options.url) {
            return this.gateaway(options);
        }
        let service = options.service;
        let resource = options.resource.replace(/\./g, '/');
        let data = options.data;
        Object.assign(data, DEFAULT_PARAMS);

        let url = `${API_SERVER}/${service}/${resource}/`;

        let sid = localStorage.getItem('sid');
        if (sid) {
            data['token'] = sid;
        }

        let timestamp = (new Date()).getTime().toString();
        data['timestamp'] = timestamp.slice(0, 10);
        let sortedKeys = Object.keys(data).sort();
        let sortedParamsList = [];
        for (let i in sortedKeys) {
            sortedParamsList.push(`${sortedKeys[i]}=${encodeURIComponent(data[sortedKeys[i]])}`);
        }
        let sortedParamsStr = sortedParamsList.join('&');
        data['sign'] = md5(API_SECRET + sortedParamsStr);


        let paramsList = [];
        for (let key in data) {
            let value = data[key];
            paramsList.push(`${key}=${encodeURIComponent(value)}`);
        }
        if (options.method === "GET") {
            url += `?${paramsList.join('&')}`;
        }

        return new Promise((resolve, reject) => {
            Vue.http.options.emulateJSON = true;
            Vue.http[options.method.toLocaleLowerCase()](url, data).then(resp => {
                if (resp.data.code === 200) {
                    resolve(resp.data.data);
                } else {
                    reject(resp.data);
                }
            }, resp => {
                reject(resp.data);
            });
        })
    },

    gateaway(options) {
        let url = options.url;
        let method = options.method;
        let body = options.body || {};
        let params = options.data || {};
        let headers = options.headers || {};
        if (options.method === "GET") {
            return new Promise((resolve, reject) => {
                Vue.http.options.emulateJSON = true;
                Vue.http[options.method.toLocaleLowerCase()](url, {
                    params: params,
                }).then(resp => {
                    resolve(resp.data);
                }, resp => {
                    reject(resp.data);
                });
            })
        }
        return new Promise((resolve, reject) => {
            Vue.http[options.method.toLocaleLowerCase()](url, body, {
                headers: headers,
                method: method,
                params: params,
            }).then(resp => {
                resolve(resp.data);
            }, resp => {
                reject(resp.data);
            });
        })
    },

    get(options) {
        options.method = 'GET'
        return this.query(options)
    },

    put(options) {
        options.method = 'PUT'
        return this.query(options)
    },

    post(options) {
        options.method = 'POST'
        return this.query(options)
    },

    delete(options) {
        options.method = 'DELETE'
        return this.query(options)
    }
}

export default Resource;