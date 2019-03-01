<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <router-link class="navbar-brand" :to="{name: 'home'}">VueCalendar</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
          <div v-if="jwt">
            <li class="nav-item">
              <a class="nav-link" href="#about">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#services">Services</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#contact">Contact</a>
            </li>
          </div>
          <div v-else>
            <li class="nav-item">
              <b-button class="btn navbar-btn ml-md-2 btn-light text-dark" v-b-modal.modalLogin>Connexion</b-button>
              <b-button class="btn navbar-btn ml-md-2 btn-light text-dark" v-b-modal.modalRegister>Inscription</b-button>
            </li>
          </div>
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
  ]
}
</script>
