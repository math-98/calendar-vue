<template>
  <section>
    <b-alert variant="danger" show dismissible v-if="error">{{ error }}</b-alert>
    <FullCalendar ref="calendar" :events="events" :config="calendar_config" @event-selected="eventClick"></FullCalendar>
    <b-modal
      id="modalEvent"
      ref="modalEvent"
      v-if="this.selected_event"
      :title="this.selected_event.title"
    >
      Du {{ this.selected_event.start }} au {{ this.selected_event.end }}<br/>
      <br/>
      {{ this.selected_event.description }}<br/>
      <br/>
      <router-link :to="{ name: 'show', params: { id: this.selected_event.id }}" class="btn btn-block btn-primary">Voir</router-link>
      <b-button class="col-12" variant="danger" @click="deleteSelected" v-if="!transmiting">Supprimer</b-button>
      <div slot="modal-footer"></div>
    </b-modal>
  </section>
</template>

<script>
import { FullCalendar } from 'vue-full-calendar'
import 'fullcalendar/dist/locale/fr'
import moment from 'moment'

export default {
  name: 'Home',
  components: {
    FullCalendar
  },
  props: [
    'axios'
  ],
  mounted () {
    this.axios.request({
      method: 'get',
      url: '/list'
    })
      .then((response) => {
        console.log(response)
        this.transmiting = false
        this.error = ''
        this.events = response.data.events
      })
      .catch((error) => {
        this.error = 'Une erreur est survenue lors du traitement de la requête, consultez la console pour plus d\'infos'
        console.error(error)
        this.transmiting = false
      })
  },
  data () {
    return {
      events: [],
      selected_event: undefined,
      calendar_config: {
        themeSystem: 'bootstrap4'
      },
      error: '',
      transmiting: false
    }
  },
  methods: {
    eventClick (val) {
      this.selected_event = val
      this.selected_event.start = moment(this.selected_event.start).format('dddd D MMMM Y HH:mm')
      this.selected_event.end = moment(this.selected_event.end).format('dddd D MMMM Y HH:mm')
      this.$nextTick(() => {
        this.$refs.modalEvent.show()
      })
    },
    deleteSelected () {
      this.transmiting = true
      this.axios.request({
        method: 'get',
        url: 'delete/' + this.selected_event.id
      })
        .then((response) => {
          console.log(response)
          this.$refs.calendar.$emit('remove-event', this.selected_event)
          this.transmiting = false
          this.$refs.modalEvent.hide()
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
