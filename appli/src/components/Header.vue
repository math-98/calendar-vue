<template>
  <header class="bg-primary text-white">
    <div class="container text-center">
      <h1>{{ title }}</h1>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: [
    'title'
  ]
}
</script>
