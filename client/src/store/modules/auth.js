import { router } from '../../router';
import api from '../../api/trackany1';
import qs from 'qs';


const state = {
    token: window.localStorage.getItem('trackany1_token')   // On initial load we will look to see if we have a token
};

const getters = {
    isLoggedIn: (state) => {
        return !!state.token // !! will return true or false if the value is null or not
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

        // NEED TO VERIFY JWT HERE BEFORE SAVING THE ACCESS_TOKEN !!!

        commit('setToken', query.access_token);
        window.localStorage.setItem('trackany1_token', query.access_token);

        router.push('/');
    },
    logout: ({ commit }) => {
        commit('setToken', null);
        window.localStorage.removeItem('trackany1_token');
    },
};

const mutations = {
    setToken: (state, token) => {
        state.token = token;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};