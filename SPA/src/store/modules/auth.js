import router from '../../router';
import api from '../../api/trackany1';
import qs from 'qs';
import jwt from 'jsonwebtoken';


const state = {
    token: window.localStorage.getItem('trackany1_token'),   // On initial load we will look to see if we have a token
    userID: window.localStorage.getItem('trackany1_user_id')  // On initial load we will look to see if we have a user id
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
    loginWithFacebook: () => {
        api.loginWithFacebook();
    },
    loginWithGoogle: () => {
        api.loginWithGoogle();
    },
    finalizeLogin: ({ commit }, hash) => {
        const query = qs.parse(hash.replace('#', ''));  // This takes the entire query string from url and parses it into an object called query
        const decoded = jwt.decode(query.access_token)

        commit('setToken', { token: query.access_token, userID: decoded.id })
        router.push('/basicmap');
    },
    logout: ({ commit }) => {
        commit('deleteToken');
        router.push('/login');
    },
    autoLogin: ({getters}) => {
        if(getters.isLoggedIn) {    // This action will be called by app.js on application start and if the user is logged in it will redirect to dashboard instead of home page
            router.push('/basicmap');  // This might render url navigation useless but for now this works
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