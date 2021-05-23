import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'CompteurJour',
    component: function () {
        return import('../views/compteurJour.vue')
    }
  },
  {
    path: '/semaine',
    name: 'CompteurSemaine',
    component: function () {
      return import('../views/compteurSemaine.vue')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
