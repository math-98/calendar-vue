<template>
  <section>
    <b-alert variant="danger" show dismissible v-if="error">{{ error }}</b-alert>
    <b-form @submit="onSubmit">
      <b-form-group label="Titre">
        <b-form-input v-model="title" required placeholder="Entrez un titre" />
      </b-form-group>

      <b-form-group label="Description">
        <b-form-textarea v-model="description" required placeholder="Entrez une description" />
      </b-form-group>

      <b-form-group>
        <b-form-checkbox id="allDayCheckbox" v-model="allDay" @change="checkAllDay">Toute la journée</b-form-checkbox>
      </b-form-group>

      <b-form-group label="Début">
        <b-form-input type="date" v-model="startDate" required/>
        <b-form-input type="time" v-model="startTime" v-if="!allDay"/>
      </b-form-group>

      <b-form-group label="Fin">
        <b-form-input type="date" v-model="endDate" required/>
        <b-form-input type="time" v-model="endTime" v-if="!allDay"/>
      </b-form-group>

      <b-button type="submit" variant="primary" class="col-12" v-if="!transmiting">Envoyer</b-button>
    </b-form>
  </section>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Add',
  props: [
    'axios'
  ],
  data () {
    return {
      'title': '',
      'description': '',
      'startDate': '',
      'startTime': '',
      'endDate': '',
      'endTime': '',
      'allDay': false,
      'transmiting': false,
      'error': ''
    }
  },
  methods: {
    checkAllDay () {
      this.endDate = ''
      this.endTime = ''
    },
    onSubmit () {
      let startDateTime = this.startDate
      if (this.startTime) {
        startDateTime += 'T' + this.startTime
      }
      let startMoment = moment(startDateTime)

      let endDateTime = this.endDate
      if (this.endTime) {
        endDateTime += 'T' + this.endTime
      }
      let endMoment = moment(endDateTime)

      if (startMoment.isValid() && endMoment.isValid()) {
        if (startMoment.isBefore(endMoment)) {
          var params = new URLSearchParams()
          params.append('title', this.title)
          params.append('description', this.description)
          params.append('start', startMoment.format())
          params.append('end', endMoment.format())
          params.append('allDay', this.allDay)

          this.axios.request({
            method: 'post',
            url: '/add',
            data: params
          })
            .then((response) => {
              console.log(response)
              this.$router.push({name: 'home'})
            })
            .catch((error) => {
              this.error = 'Une erreur est survenue lors du traitement de la requête, consultez la console pour plus d\'infos'
              console.error(error)
              this.transmiting = false
            })
        } else {
          this.error = 'La date de fin doit être supérieur à celle de début'
        }
      } else {
        this.error = 'Vous devez saisir des dates valides'
      }
    }
  }
}
</script>
