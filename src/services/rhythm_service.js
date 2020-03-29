import Resource from '../lib/resource'
import Service from './service'

class RhythmService extends Service {
	constructor() {
		super();
    }

    async getRhythms(rhythm_set_id, page=1, count_per_page=10) {
        var data = await Resource.get({
            service: 'nature',
            resource: 'rhythm.rhythms',
            data: {
                rhythm_set_id: rhythm_set_id,
                page: page,
                count_per_page: count_per_page,
            }
        })
        return data;
    }

    async getRhythm(id) {
        var data = await Resource.get({
            service: 'nature',
            resource: 'rhythm.rhythm',
            data: {
                id: id,
            }
        })
        return data;
    }

    async getRhythmSets(page=1, count_per_page=10) {
        var data = await Resource.get({
            service: 'nature',
            resource: 'rhythm.rhythm_sets',
            data: {
                page: page,
                count_per_page: count_per_page,
            }
        })
        return data;
    }

    async getRhythmSet(id) {
        var data = await Resource.get({
            service: 'nature',
            resource: 'rhythm.rhythm_set',
            data: {
                id: id,
            }
        })
        return data;
    }
}

let service = new RhythmService();

export default service;