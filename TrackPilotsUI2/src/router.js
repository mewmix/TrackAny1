import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('./views/About.vue')
    },
    {
      path: '/grouptrackingpage/:groupID',
      name: 'GroupTrackingPage',
      component: () => import('./views/GroupTrackingPage.vue')
    },
    {
      path: '/createuser',
      name: 'CreateUser',
      component: () => import('./views/CreateUser.vue')
    },
    {
      path: '/creategroup',
      name: 'CreateGroup',
      component: () => import('./views/CreateGroup.vue')
    },
    {
      path: '/grouppage/:groupID',
      name: 'GroupPage',
      component: () => import('./views/GroupPage.vue')
    },
    {
      path: '/grouproster/:groupID',
      name: 'GroupRoster',
      component: () => import('./views/GroupRoster.vue')
    }
  ]
})
