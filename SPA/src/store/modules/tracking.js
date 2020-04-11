import Users from '../../api/Users'
import TrackingData from '../../api/TrackingData'
// import router from '../../router';

const state = {
    userData: [],
    users: [],
    groupTrackingData: []
};

const getters = {
    myProfile: state => state.userData,
    allUsers: state => state.users,
    // groupTrackingData: state => state.groupTrackingData,
    groupTrackingData: state => state.groupTrackingData.filter(user => user.userTrackingData.length > 0).sort((a, b) => (a.userTrackingData[0].unixTime < b.userTrackingData[0].unixTime) ? 1 : -1)
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
    },
    async fetchGroupTrackingData ({ commit }, [id, timeSpan]) {
        const response = await TrackingData.getGroupTrackingData(id, timeSpan);
        commit('setGroupTrackingData', response.data);
    }
};

const mutations = {
    setMyProfile: (state, profile) => {
        state.userData = profile;
    },
    setAllUsers: (state, userData) => {
        state.users = userData;
    },
    setGroupTrackingData: (state, trackingData) => {
        state.groupTrackingData = trackingData;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};