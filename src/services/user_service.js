import Resource from '../lib/resource'
import Service from './service'

class UserService extends Service {
	constructor() {
		super();
    }

    async loginUser(name, password) {
        var data = await Resource.put({
            service: 'nature',
            resource: 'account.login_user',
            data: {
                name: name,
                password: password,
            }
        })
        if (data) {
            localStorage.setItem('sid', data["sid"]);
        }
        return data;
    }

    isLogined() {
        if (localStorage.getItem('sid')) {
            return true;
        } else {
            return false;
        }
    }
}

let service = new UserService();

export default service;