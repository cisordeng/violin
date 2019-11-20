import Resource from '../lib/resource'
import Service from './service'

class ReplyService extends Service {
    constructor() {
        super();
    }

    async newReply(resource_type, resource, reply, content) {
        var replyId = 0;
        if (reply && reply.id) {
            replyId = reply.id;
        }
        var data = await Resource.put({
            service: 'dolphin',
            resource: 'reply.reply',
            data: {
                resource_type: resource_type,
                resource_id: resource.id,
                reply_id: replyId,
                content: content,
            }
        })
        return data;
    }
}

let service = new ReplyService();

export default service;