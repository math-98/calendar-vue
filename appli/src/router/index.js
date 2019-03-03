import Vue from 'vue'
import Home from '@/components/Home'
import Add from '@/components/Add'
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
      path: '/event/add',
      name: 'add',
      component: Add,
      meta: {
        title: 'Ajouter un évènement'
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
