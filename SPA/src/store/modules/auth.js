import { router } from '../../router';
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

        // Save the token and user ID to local stroage
        commit('setToken', query.access_token);
        commit('setUserID', decoded.id)
        window.localStorage.setItem('trackany1_token', query.access_token);
        window.localStorage.setItem('trackany1_user_id', decoded.id);
        router.push('/dashboard');
    },
    logout: ({ commit }) => {
        commit('setToken', null);
        window.localStorage.removeItem('trackany1_token');
        commit('setUserID', null);
        window.localStorage.removeItem('trackany1_user_id');
        router.push('/login');
    },
};

const mutations = {
    setToken: (state, token) => {
        state.token = token;
    },
    setUserID: (state, userID) => {
        state.userID = userID;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};