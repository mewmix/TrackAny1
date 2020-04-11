import Api from './Api';

export default {
    getGroupTrackingData(id, timespan) {
        return Api.get(`grouptrackingdata/${id}/${timespan}`);
    },
}