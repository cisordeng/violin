import Resource from '../lib/resource'
import Service from './service'

class CommentService extends Service {
    constructor() {
        super();
    }

    async newComment(resource_type, resource, comment, content) {
        var commentId = 0;
        if (comment && comment.id) {
            commentId = comment.id;
        }
        var data = await Resource.put({
            service: 'nature',
            resource: 'comment.comment',
            data: {
                resource_type: resource_type,
                resource_id: resource.id,
                comment_id: commentId,
                content: content,
            }
        })
        return data;
    }
}

let service = new CommentService();

export default service;