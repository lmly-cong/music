import Vue from 'vue'
import VueRouter from 'vue-router'
import Music from '@/components/Music'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'Music',
      component: Music
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
