<template>
  <div id="dashboard-layout">
    <Entete />
    <!-- <main class="dashboard-content">
      <router-view />
    </main> -->
  </div>
</template>

<script setup>
import Entete from '@/components/Entete.vue'
</script>

<style scoped>
#dashboard-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.dashboard-content {
  background-color: #f0f0f0;
  padding: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* 👈 IMPORTANT */
}
</style>
