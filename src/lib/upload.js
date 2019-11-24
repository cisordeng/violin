import Vue from 'vue';
import Resource from '../lib/resource';

let Uploader = {
    async upload(file) {
        let params = {
            key: 'dd2c7ddfe71b46370096200e2cc254b3',
            image: file,
        };
        let formData = new FormData();
        for (let key in params) {
            formData.append(key,params[key]);
        }
        let resp = await Resource.post({
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            url: `https://api.imgbb.com/1/upload`,
            body: formData,
        });
        if (resp.success) {
            return resp.data.image.url;
        } else {
            console.log('upload fail');
        }
    },

}

export default Uploader;