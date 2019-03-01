<template>
  <div id="app">
    <Navigation :jwt="jwt" @logout="logout"/>
    <my-header :title="this.$route.meta.title"/>
    <div class="container">
      <login v-if="!jwt" @login="login"/>
      <router-view :jwt="jwt" v-else/>
    </div>
    <my-footer/>
  </div>
</template>

<script>
import Login from '@/components/Login'
import myHeader from '@/components/Header'
import myFooter from '@/components/Footer'
import Navigation from '@/components/Navigation'

export default {
  name: 'App',
  components: {
    Login,
    myHeader,
    myFooter,
    Navigation
  },
  mounted () {
    if (this.$cookies.isKey('vuecalendar-jwt')) {
      this.jwt = this.$cookies.get('vuecalendar-jwt')
      this.$cookies.set('vuecalendar-jwt', this.jwt)
    }
  },
  data: function () {
    return {
      jwt: ''
    }
  },
  methods: {
    login (val) {
      this.$cookies.set('vuecalendar-jwt', val)
      this.jwt = val
    },
    logout () {
      this.$cookies.remove('vuecalendar-jwt')
      this.jwt = ''
    }
  }
}
</script>
