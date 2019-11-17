import Resource from '../lib/resource'
import Service from './service'

class WordService extends Service {
    constructor() {
        super();
    }

    async getWords(page=1, count_per_page=10) {
        var data = await Resource.get({
            service: 'nature',
            resource: 'word.words',
            data: {
                page: page,
                count_per_page: count_per_page,
            }
        })
        return data;
    }

    async getWord(id) {
        var data = await Resource.get({
            service: 'nature',
            resource: 'word.word',
            data: {
                id: id,
            }
        })
        return data;
    }

    async newWord(content) {
        var data = await Resource.put({
            service: 'nature',
            resource: 'word.word',
            data: {
                content: content,
            }
        })
        return data;
    }

    async updateWord(id, content) {
        var data = await Resource.post({
            service: 'nature',
            resource: 'word.word',
            data: {
                id: id,
                content: content,
            }
        })
        return data;
    }

    async newWordComment(word, comment, content) {
        var commentId = 0;
        if (comment && comment.id) {
            commentId = comment.id;
        }
        var data = await Resource.put({
            service: 'nature',
            resource: 'comment.comment',
            data: {
                resource_type: 'word.word',
                resource_id: word.id,
                comment_id: commentId,
                content: content,
            }
        })
        return data;
    }
}

let service = new WordService();

export default service;