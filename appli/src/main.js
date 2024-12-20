// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import BootstrapVue from 'bootstrap-vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@fortawesome/fontawesome-free/css/all.css'
import './assets/css/scrolling-nav.css'
import 'fullcalendar/dist/fullcalendar.css'

Vue.config.productionTip = false
Vue.use(require('vue-cookies'))
Vue.use(BootstrapVue)

router.beforeEach((to, from, next) => {
  document.title = to.meta.title + ' - VueCalendar'

  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
