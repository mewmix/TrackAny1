// import { router } from '../../router';
// import api from '../../api/trackany1';
// import qs from 'qs';


const state = {
    // token: window.localStorage.getItem('imgur_token')
};

const getters = {
    // isLoggedIn: (state) => {
    //     return !!state.token // !! will return true or false if the value is null or not
    // }

};

const actions = {
    // logout: ({ commit }) => {
    //     commit('setToken', null);
    //     window.localStorage.removeItem('imgur_token');
    // },
    // login: () => {
    //     api.login();
    // },
    // finalizeLogin: ({ commit }, hash) => {
    //     const query = qs.parse(hash.replace('#', ''));  // This takes the entire query string from url and parses it into an object called query
        
    //     commit('setToken', query.access_token);
    //     window.localStorage.setItem('imgur_token', query.access_token);
        
    //     router.push('/');
    // }
};

const mutations = {
    // setToken: (state, token) => {
    //     state.token = token;
    // }
};

export default {
    state,
    getters,
    actions,
    mutations
};