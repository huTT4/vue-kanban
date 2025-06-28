import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Auth from '../views/Auth.vue'
import Complete from '../views/Complete.vue'

const routes = [
  {
    path: '/',
    component: Home,
    meta: {
      auth: true,
    },
  },
  {
    path: '/auth',
    name: 'auth',
    component: Auth,
    meta: {
      auth: false,
    },
  },
  {
    path: '/complete-tasks',
    component: Complete,
    meta: {
      auth: true,
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
})

export default router
