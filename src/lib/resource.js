import Vue from 'vue';

let API_SERVER = 'http://devapi.cisor.cn' // 开发环境
let Resource = {
    API_SERVER: API_SERVER,

    query (options) {
        let service = options.service;
        let resource = options.resource.replace(/\./g, '/');
        let data = options.data;

        let url = `${API_SERVER}/${service}/${resource}/`;
        if (options.method === "GET") {
            url += "?";
            for (let key in data) {
                let value = data[key];
                url += `${key}=${value}`;
            }
            // url = url.trim('&');
        }

        return new Promise((resolve, reject) => {
            Vue.http[options.method.toLocaleLowerCase()](url, data).then(resp =>{
                if (resp.data.code === 200) {
                    resolve(resp.data);
                } else {
                    reject(resp.data);
                }
            }, resp => {
                reject(resp.data);
            });  
        })
    },

    get (options) {
        options.method = 'GET'
        return this.query(options)
    },

    put (options) {
        options.method = 'PUT'
        return this.query(options)
    },

    post (options) {
        options.method = 'POST'
        return this.query(options)
    },

    delete (options) {
        options.method = 'DELETE'
        return this.query(options)
    }
}

export default Resource;