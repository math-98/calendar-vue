<template>
  <section>
    <loading v-if="transmiting"/>
    <template v-else>
      <b-alert variant="danger" show dismissible v-if="error">{{ error }}</b-alert>
      <h1>{{ this.event.title }}</h1>
      Du {{ this.event.start }} au {{ this.event.end }}<br/>
      <br/>
      {{ this.event.description }}<br/>
      <br/>
      <b-button variant="danger" class="btn-block" disabled v-if="transmiting">
        <b-spinner small type="grow"/>
        Chargement...
      </b-button>
      <b-button class="btn-block" variant="danger" @click="deleteEvent" v-else>Supprimer</b-button>
    </template>
  </section>
</template>

<script>
import Loading from '@/components/Loading'
import moment from 'moment'

export default {
  name: 'Show',
  components: {
    Loading
  },
  props: [
    'axios'
  ],
  mounted () {
    this.transmiting = true
    this.axios.request({
      method: 'get',
      url: '/get/' + this.$route.params.id
    })
      .then((response) => {
        console.log(response)
        this.transmiting = false
        this.error = ''
        this.event = response.data.event
        this.$nextTick(() => {
          if (this.event.allDay) {
            this.event.start = moment(this.event.start).format('dddd D MMMM Y')
            this.event.end = moment(this.event.end).format('dddd D MMMM Y')
          } else {
            this.event.start = moment(this.event.start).format('dddd D MMMM Y HH:mm')
            this.event.end = moment(this.event.end).format('dddd D MMMM Y HH:mm')
          }
        })
      })
      .catch((error) => {
        this.error = 'Une erreur est survenue lors du traitement de la requête, consultez la console pour plus d\'infos'
        console.error(error)
        this.transmiting = false
      })
  },
  data () {
    return {
      event: undefined,
      error: '',
      transmiting: false
    }
  },
  methods: {
    deleteEvent () {
      this.transmiting = true
      this.axios.request({
        method: 'get',
        url: 'delete/' + this.event.id
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
    }
  }
}
</script>
