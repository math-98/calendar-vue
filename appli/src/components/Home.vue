<template>
  <section>
    <FullCalendar></FullCalendar>
  </section>
</template>

<script>
import { FullCalendar } from 'vue-full-calendar'
import 'fullcalendar/dist/locale/fr'

export default {
  name: 'Home',
  props: [
    'jwt'
  ],
  data () {
    return {
      events: [],
      config: {
        locale: 'fr'
      }
    }
  },
  components: {
    FullCalendar
  }
}
</script>
