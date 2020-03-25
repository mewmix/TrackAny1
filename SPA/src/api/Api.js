// https://forum.vuejs.org/t/how-to-access-vuex-store-from-a-js-module/10124/5
// https://github.com/qirolab/learn-vuex-with-basic-ecommerce-example/blob/master/vuex-tutorial/

import axios from 'axios';
import store from '../store';

const Api = axios.create({
    baseURL: 'https://api.trackany1.com/api/v1',
    timeout: 10000,
    // headers: {
    //     Authorization: `Bearer ${store.state.auth.token}`
    // }
});

const authentication = Api.interceptors.request.use((config) => {
    // We are importing store before it is populated.
    // We intercept the request and use the current apiKey
    config.headers = { 'Authorization': `Bearer ${store.state.auth.token}` }
    return config
})

export default Api;