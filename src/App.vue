<template>
  <div id="app">
    <!-- <Entete/> -->
    <router-view />
  </div>
</template>

<script>
import Entete from './components/Entete.vue';

export default {
  name: 'App',
  components: {
    Entete
  }
}
</script>