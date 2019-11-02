import Resource from '../lib/resource'
import Service from './service'

class UserService extends Service {
	constructor() {
		super();
    }

    async getUsers() {
        var data = await Resource.get({
            service: 'nature',
            resource: 'article.articles',
            data: {}
        })
        return data.articles;
    }

    async getUser(id) {
        var data = await Resource.get({
            service: 'nature',
            resource: 'article.article',
            data: {
                id: id,
            }
        })
        return data;
    }

    async newUser(title, content) {
        var data = await Resource.put({
            service: 'nature',
            resource: 'article.article',
            data: {
                title: title,
                content: content,
            }
        })
        return data;
    }

    async updateUser(id, title, content) {
        var data = await Resource.post({
            service: 'nature',
            resource: 'article.article',
            data: {
                id: id,
                title: title,
                content: content,
            }
        })
        return data;
    }
}

let service = new UserService();

export default service;