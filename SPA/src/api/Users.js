import Api from './Api';

const END_POINT = 'users';

export default {
    all() {
        return Api.get(END_POINT);
    },
    single(id) {
        return Api.get(`${END_POINT}/${id}`);
    },
    delete(id) {
        return Api.delete(`${END_POINT}/${id}`);
    },
    update(id, data) {
        return Api.put(`${END_POINT}/${id}`, data);
    }
}
