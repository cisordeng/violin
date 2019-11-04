import Resource from '../lib/resource'
import Service from './service'

class ArticleService extends Service {
    constructor() {
        super();
    }

    async getArticles(page=1, count_per_page=10) {
        var data = await Resource.get({
            service: 'nature',
            resource: 'article.articles',
            data: {
                page: page,
                count_per_page: count_per_page,
            }
        })
        return data;
    }

    async getArticle(id) {
        var data = await Resource.get({
            service: 'nature',
            resource: 'article.article',
            data: {
                id: id,
            }
        })
        return data;
    }

    async newArticle(title, content) {
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

    async updateArticle(id, title, content) {
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

let service = new ArticleService();

export default service;