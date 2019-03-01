import Vue from 'vue'
import Home from '@/components/Home'
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
      },
      header_title: 'Router title',
      header_text: 'Router text'
    }
  ]
})
