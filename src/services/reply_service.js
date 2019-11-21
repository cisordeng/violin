import Resource from '../lib/resource'
import Service from './service'

class ReplyService extends Service {
    constructor() {
        super();
    }

    async newReply(resource_type, resource_id, reply, content) {
        var replyId = 0;
        if (reply && reply.id) {
            replyId = reply.id;
        }
        var data = await Resource.put({
            service: 'dolphin',
            resource: 'reply.reply',
            data: {
                resource_type: resource_type,
                resource_id: resource_id,
                reply_id: replyId,
                content: content,
            }
        })
        return data;
    }

    async getReplies(resource_type, resource_id, page=1, count_per_page=10) {
        var data = await Resource.get({
            service: 'dolphin',
            resource: 'reply.replies',
            data: {
                filters: JSON.stringify({
                    resource_type: resource_type,
                    resource_id: resource_id,
                }),
                page: page,
                count_per_page: count_per_page,
            }
        })
        return data;
    }
}

let service = new ReplyService();

export default service;