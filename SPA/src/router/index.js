import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthHandler from '../components/AuthHandler'
import store from '../store'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',    // This is super important! DO NOT FORGET HISTORY MODE !!!
  routes: [
    {
      path: '/oauth2/callback',
      name: 'AuthHandler',
      component: AuthHandler
    },
    {
      path: '/',
      name: 'Landing',
      component: () => import('../views/Landing.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/explore',
      name: 'Explore',
      component: () => import('../views/Explore.vue')
    },
    {
      path: '/members/:id',
      name: 'MemberProfile',
      component: () => import('../views/MemberProfile.vue')
    },
    {
      path: '/mydevices',
      name: 'MyDevices',
      component: () => import('../views/MyDevices.vue')
    },
    {
      path: '/membermap/:id',
      name: 'MemberMap',
      component: () => import('../views/MemberMap.vue')
    },
    {
      path: '/creategroup',
      name: 'CreateGroup',
      component: () => import('../views/CreateGroup.vue')
    },
    {
      path: '/groupmap/:id',
      name: 'GroupMap',
      component: () => import('../views/GroupMap.vue')
    }
  ]
})

const openRoutes = ['Landing', 'Login', 'AuthHandler']

router.beforeEach((to, from, next) => {
  if (openRoutes.includes(to.name)) {  // If route is public
    // console.log(store.getters.isLoggedIn);
    next()
  } else if (store.getters.isLoggedIn == true) { // If user is signed in
    // console.log(store.getters.isLoggedIn);
    next()
  } else {
    next('/login')
  }
})

export default router