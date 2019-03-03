<template>
  <section>
    <b-modal
      id="modalLogin"
      ref="modalLogin"
      title="Connexion"
      @ok="submitLogin"
    >
      <b-alert variant="danger" show dismissible v-if="error">{{ error }}</b-alert>
      <form @submit.stop.prevent="submitLogin">
        <b-form-group label="Nom d'utilisateur" label-for="usernameLogin">
          <b-form-input id="usernameLogin" type="text" placeholder="Entrez votre nom" v-model="username" required/>
        </b-form-group>
        <b-form-group label="Mot de passe" label-for="passwordLogin">
          <b-form-input id="passwordLogin" type="password" placeholder="Entrez votre mot de passe" v-model="password" required/>
        </b-form-group>
        <b-button class="col-12" type="submit" variant="primary" v-if="!transmiting">Envoyer</b-button>
      </form>
      <div slot="modal-footer"></div>
    </b-modal>
    <b-modal
      id="modalRegister"
      ref="modalRegister"
      title="Inscription"
      @ok="submitRegister"
    >
      <b-alert variant="success" show dismissible v-if="success">{{ success }}</b-alert>
      <b-alert variant="danger" show dismissible v-if="error">{{ error }}</b-alert>
      <form @submit.stop.prevent="submitRegister">
        <b-form-group label="Nom d'utilisateur" label-for="usernameRegister">
          <b-form-input id="usernameRegister" type="text" placeholder="Entrez votre nom" v-model="username" required/>
        </b-form-group>
        <b-form-group label="Mot de passe" label-for="passwordRegister">
          <b-form-input id="passwordRegister" type="password" placeholder="Entrez votre mot de passe" v-model="password" required/>
        </b-form-group>
        <b-form-group label="Confirmation du mot de passe" label-for="confirmPasswordRegister">
          <b-form-input id="confirmPasswordRegister" type="password" placeholder="Confirmez votre mot de passe" v-model="password_confirm" required/>
        </b-form-group>
        <b-button class="col-12" type="submit" variant="primary" v-if="!transmiting">Envoyer</b-button>
      </form>
      <div slot="modal-footer"></div>
    </b-modal>
    <div class="text-center">
      <div class="mb-3">
        <i class="fas fa-user-lock" style="font-size: 150px; margin: auto"></i>
      </div>
      <h1>Authentification nécessaire</h1>
      <p>Vous devez vous connecter pour accéder à cette section</p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Login',
  props: [
    'axios'
  ],
  data () {
    return {
      'error': '',
      'username': '',
      'password': '',
      'password_confirm': '',
      'success': '',
      'transmiting': false
    }
  },
  methods: {
    clearFields () {
      this.transmiting = false
      this.error = ''
      this.username = ''
      this.password = ''
      this.password_confirm = ''
    },
    submitLogin (evt) {
      if (!this.transmiting) {
        evt.preventDefault()
        this.transmiting = true

        var params = new URLSearchParams()
        params.append('username', this.username)
        params.append('password', this.password)

        this.axios.request({
          method: 'post',
          url: '/login',
          data: params
        })
          .then((response) => {
            this.transmiting = false
            this.$emit('login', response.data.jwt)
            console.log(response)
          })
          .catch((error) => {
            switch (error.response.status) {
              case 401:
                this.error = 'Identifiant ou mot de passe incorrect'
                break
              default:
                this.error = 'Une erreur est survenue lors du traitement de la requête, consultez la console pour plus d\'infos'
                break
            }
            console.error(error)
            this.transmiting = false
          })
      }
    },
    submitRegister (evt) {
      if (!this.transmiting) {
        evt.preventDefault()
        if (this.password === this.password_confirm) {
          this.transmiting = true

          var params = new URLSearchParams()
          params.append('username', this.username)
          params.append('password', this.password)

          this.axios.request({
            method: 'post',
            url: '/register',
            data: params
          })
            .then((response) => {
              this.transmiting = false
              this.success = 'Inscription effectuée avec succès, vous pouvez désormais vous connecter'
              console.log(response)

              this.clearFields()
            })
            .catch((error) => {
              switch (error.response.status) {
                case 403:
                  this.error = 'Un compte existe déjà avec ce nom d\'utilisateur'
                  break
                default:
                  this.error = 'Une erreur est survenue lors du traitement de la requête, consultez la console pour plus d\'infos'
                  break
              }
              console.error(error)
              this.transmiting = false
            })
        } else {
          this.error = 'La confirmation du mot de passe diffère du mot de passe original'
        }
      }
    }
  }
}
</script>
