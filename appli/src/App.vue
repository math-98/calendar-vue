<template>
  <div id="app">
    <Navigation :jwt="jwt" @logout="logout"/>
    <my-header :title="this.$route.meta.title"/>
    <div class="container">
      <login :axios="axiosInstance" @login="login" v-if="!jwt"/>
      <router-view :axios="axiosInstance" v-else/>
    </div>
    <my-footer/>
  </div>
</template>

<script>
import Login from '@/components/Login'
import myHeader from '@/components/Header'
import myFooter from '@/components/Footer'
import Navigation from '@/components/Navigation'
import axios from 'axios'

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
      this.login(this.$cookies.get('vuecalendar-jwt'))
    }
  },
  data: function () {
    return {
      jwt: ''
    }
  },
  computed: {
    axiosInstance: function () {
      let props = {
        baseURL: process.env.API_BASE_URL
      }
      if (this.jwt) {
        props.headers = {'Authorization': 'Bearer ' + this.jwt}
      }
      return axios.create(props)
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
