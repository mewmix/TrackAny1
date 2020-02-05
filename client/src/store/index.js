import Vuex from 'vuex';
import Vue from 'vue';
import auth from './modules/auth';
import tracking from './modules/tracking';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        tracking
    }
});