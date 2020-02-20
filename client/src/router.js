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
            name: 'Landing',
            component: () => import('./views/Landing.vue')
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('./views/Login.vue')
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: () => import('./views/Dashboard.vue')
        },
        {
            path: '/myprofile',
            name: 'MyProfile',
            component: () => import('./views/MyProfile.vue')
        }
    ]
})