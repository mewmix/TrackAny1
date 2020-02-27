import api from '../../api/trackany1';
// import router from '../../router';

const state = {
    userData: []
};

const getters = {
    myProfile: state => state.userData
};

const actions = {
    async fetchMyProfile ({ rootState, commit }) {
        // Need to pass JWT Token and userID
        const { token, userID } = rootState.auth;

        const response = await api.fetchMyProfile(token, userID);
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