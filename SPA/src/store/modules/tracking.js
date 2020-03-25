import Users from '../../api/Users'
// import router from '../../router';

const state = {
    userData: [],
    users: []
};

const getters = {
    myProfile: state => state.userData,
    allUsers: state => state.users
};

const actions = {
    async fetchMyProfile ({ rootState, commit }) {
        // Need to pass userID
        const { userID } = rootState.auth;

        const response = await Users.single(userID);
        commit('setMyProfile', response.data);
    },
    async fetchAllUsers ({ commit }) {
        const response = await Users.all();
        commit('setAllUsers', response.data);

    }
};

const mutations = {
    setMyProfile: (state, profile) => {
        state.userData = profile;
    },
    setAllUsers: (state, userData) => {
        state.users = userData;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};