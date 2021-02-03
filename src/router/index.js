import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Novelties from '../views/Novelties.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/movies',
    name: 'Movies',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Movies.vue')
  },
  {
    path: '/novelties',
    name: 'Novelties',
    component: Novelties
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
