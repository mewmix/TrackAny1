import api from '../../api/trackany1';
// import { router } from '../../router';

const state = {
    userData: []
};

const getters = {
    myProfile: state => state.userData
};

const actions = {
    async fetchMyProfile ({ commit }) {
        const response = await api.fetchMyProfile();
        commit('setMyProfile', response.data);
    }
};

const mutations = {
    setMyProfile: (state, profile) => {
        state.userData = profile
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};