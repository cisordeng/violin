import Resource from '../lib/resource'
import Service from './service'

class UserService extends Service {
	constructor() {
		super();
    }

    async registerUser(name, password, type) {
        var data = await Resource.put({
            service: 'leo',
            resource: 'user.user',
            data: {
                name: name,
                password: password,
                avatar: '',
                type: type,
            }
        })
        return data;
    }

    async loginUser(name, password, type) {
        var data = await Resource.put({
            service: 'leo',
            resource: 'user.login',
            data: {
                name: name,
                password: password,
                type: type,
            }
        })
        if (data) {
            localStorage.setItem('sid', data["sid"]);
        }
        return data;
    }

    async isLogined(type) {
        let sid = localStorage.getItem('sid');
        if (!sid) {
            return false;
        } else {
            var data = await Resource.put({
                service: 'leo',
                resource: 'user.valid_type',
                data: {
                    type: type,
                }
            })
            return data['is_valid'];
        }
    }
}

let service = new UserService();

export default service;