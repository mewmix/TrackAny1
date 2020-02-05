import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthHandler from './components/AuthHandler'

Vue.use(VueRouter)

export const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/oauth2/callback',
            component: AuthHandler
        },
        {
            path: '/',
            name: 'Home',
            component: () => import('./views/Home.vue')
        },
        {
            path: '/about',
            name: 'About',
            component: () => import('./views/About.vue')
        }
    ]
})