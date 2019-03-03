<template>
  <div id="app">
    <Navigation :jwt="jwt" @logout="logout"/>
    <my-header :title="this.$route.meta.title"/>
    <div class="container">
      <section v-if="error">
        <b-alert variant="danger" show dismissible>{{ error }}</b-alert>
      </section>
      <router-view :axios="axiosInstance" v-else-if="jwt"/>
      <login :axios="axiosInstance" @login="login" v-else/>
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
      jwt: '',
      error: ''
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
      this.axiosInstance.request({
        method: 'get',
        url: '/check-auth',
        headers: {'Authorization': 'Bearer ' + val}
      })
        .then(() => {
          this.jwt = val
        })
        .catch((error) => {
          if (error.response.status !== 401) {
            this.error = 'Une erreur est survenue lors du traitement de la requête, consultez la console pour plus d\'infos'
            console.error(error)
          }
        })
    },
    logout () {
      this.$cookies.remove('vuecalendar-jwt')
      this.jwt = ''
    }
  }
}
</script>
