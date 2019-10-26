import Resource from '../lib/resource'
import Service from './service'

class RhythmService extends Service {
	constructor() {
		super();
    }

    async getRhythmSets() {
        var data = await Resource.get({
            service: 'nature',
            resource: 'rhythm.rhythm_sets',
            data: {}
        })
        return data.rhythm_sets;
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