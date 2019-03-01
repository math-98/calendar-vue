<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    if (this.$cookies.isKey('vuecalendar-jwt')) {
      this.jwt = this.$cookies.get('vuecalendar-jwt')
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
    }
  }
}
</script>
