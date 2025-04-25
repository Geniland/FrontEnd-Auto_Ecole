<template>
  <div class="dashboard">
    <h2 class="title">Bienvenue sur le tableau de bord</h2>

    <div class="stats">
      <div class="stat-card">
        <h3>{{ stats.cours }}</h3>
        <p>Cours créés</p>
      </div>
      <div class="stat-card">
        <h3>{{ stats.exercices }}</h3>
        <p>Exercices créés</p>
      </div>
      <div class="stat-card">
        <h3>{{ stats.videos }}</h3>
        <p>Vidéos uploadées</p>
      </div>
      <div class="stat-card">
        <h3>{{ stats.utilisateurs }}</h3>
        <p>Utilisateurs inscrits</p>
      </div>
    </div>

    <div class="charts">
      <BarChart />
      <PieChart />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import BarChart from '@/components/charts/BarChart.vue'
import PieChart from '@/components/charts/PieChart.vue'

const stats = ref({
  cours: 0,
  exercices: 0,
  videos: 0,
  utilisateurs: 0
})

onMounted(async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'))
    axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`

    const res = await axios.get('http://localhost:8000/api/statistiques')
    stats.value = {
      cours: res.data.cours,
      exercices: res.data.exercices,
      videos: res.data.videos,
      utilisateurs: res.data.users
    }
  } catch (error) {
    console.error('Erreur lors du chargement des statistiques:', error)
  }
})
</script>

<style scoped>
.dashboard {
  padding: 2rem;
  background-color: #f8f8f8;
  font-family: 'Segoe UI', sans-serif;
}
.title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  font-weight: bold;
}
.stats {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 3rem;
}
.stat-card {
  background-color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  min-width: 150px;
  margin: 1rem;
}
.stat-card h3 {
  font-size: 2rem;
  color: #068C98;
}
.charts {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
}
</style>
