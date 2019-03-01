<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <router-link class="navbar-brand" :to="{name: 'home'}">VueCalendar</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto" v-if="jwt">
          <li class="nav-item">
            <a class="nav-link" href="#about">About</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#services">Services</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#contact">Contact</a>
          </li>
          <li>
            <b-button class="btn navbar-btn ml-md-2 btn-light text-dark" @click="clickLogout">Déconnexion</b-button>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto" v-else>
          <li class="nav-item">
            <b-button class="btn navbar-btn ml-md-2 btn-light text-dark" v-b-modal.modalRegister>Inscription</b-button>
          </li>
          <li class="nav-item">
            <b-button class="btn navbar-btn ml-md-2 btn-light text-dark" v-b-modal.modalLogin>Connexion</b-button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
  props: [
    'jwt'
  ],
  methods: {
    clickLogout () {
      this.$emit('logout')
    }
  }
}
</script>
