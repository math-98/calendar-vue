import Vue from 'vue'
import Home from '@/components/Home'
import Show from '@/components/Show'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: 'Accueil'
      }
    }, {
      path: '/event/:id',
      name: 'show',
      component: Show,
      meta: {
        title: 'Évènement'
      }
    }
  ]
})
