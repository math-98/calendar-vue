<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <router-link class="navbar-brand" :to="{name: 'home'}">VueCalendar</router-link>
      <b-button class="navbar-toggler" v-b-toggle.toolbarCollapse>
        <span class="navbar-toggler-icon"></span>
      </b-button>
      <b-collapse class="navbar-collapse" id="toolbarCollapse">
        <ul class="navbar-nav ml-auto">
          <template v-if="jwt">
            <li class="nav-item">
              <router-link class="nav-link" :to="{name: 'add'}">Ajouter</router-link>
            </li>
            <li>
              <a class="nav-link" href="#" @click="clickLogout">Déconnexion</a>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <a class="nav-link" href="#" v-b-modal.modalRegister>Inscription</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" v-b-modal.modalLogin>Connexion</a>
            </li>
          </template>
        </ul>
      </b-collapse>
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
