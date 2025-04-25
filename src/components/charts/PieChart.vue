<template>
    <Pie :data="chartData" :options="chartOptions" />
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import { Pie } from 'vue-chartjs'
  import {
    Chart as ChartJS,
    Title, Tooltip, Legend,
    ArcElement
  } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, ArcElement)
  
  // Données réactives
  const chartData = ref({
    labels: ['Cours', 'Exercices', 'Vidéos', 'Utilisateurs'],
    datasets: [{
      label: 'Répartition',
      data: [0, 0, 0, 0],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      hoverOffset: 8
    }]
  })
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right'
      },
      title: {
        display: true,
        text: 'Répartition globale'
      }
    }
  }
  
  // Chargement des statistiques depuis l'API
  onMounted(async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
  
      const response = await axios.get('http://localhost:8000/api/statistiques')
      const stats = response.data
  
      // Mise à jour complète des données (très important pour la réactivité)
      chartData.value = {
        labels: ['Cours', 'Exercices', 'Vidéos', 'Utilisateurs'],
        datasets: [{
          label: 'Répartition',
          data: [
            stats.cours,
            stats.exercices,
            stats.videos,
            stats.users
          ],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
          hoverOffset: 8
        }]
      }
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques :', error)
    }
  })
  </script>
  