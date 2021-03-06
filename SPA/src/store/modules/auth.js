import router from '../../router';
import qs from 'qs';
import jwt from 'jsonwebtoken';


const state = {
    token: window.localStorage.getItem('trackany1_token'),
    userID: window.localStorage.getItem('trackany1_user_id')
};

const getters = {
    isLoggedIn: (state) => {
        if (state.token != null && state.userID != null) {
            return true
        } else {
            return false
        }
    }
};

const actions = {
    finalizeLogin: ({ commit }, hash) => {
        const query = qs.parse(hash.replace('#', ''));  // This takes the entire query string from url and parses it into an object called query
        const decoded = jwt.decode(query.access_token)

        commit('setToken', { token: query.access_token, userID: decoded.id })
        router.push(`/membermap/${decoded.id}`);
    },
    logout: ({ commit }) => {
        commit('deleteToken');
        router.push('/login');
    },
    autoLogin: ({getters, state}) => {
        if(getters.isLoggedIn) {    // This action will be called by app.js on application start and if the user is logged in it will redirect to dashboard instead of home page
            // router.push(`/membermap/${state.userID}`);  // This might render url navigation useless but for now this works
            // console.log("The user is already logged in on application start")
        }
    }
};

const mutations = {
    setToken: (state, tokenData) => {
        const { token, userID } = tokenData;
        state.token = token;
        state.userID = userID;
        window.localStorage.setItem('trackany1_token', token);
        window.localStorage.setItem('trackany1_user_id', userID);
    },
    deleteToken: (state) => {
        state.token = null;
        state.userID = null;
        window.localStorage.removeItem('trackany1_token');
        window.localStorage.removeItem('trackany1_user_id');
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};