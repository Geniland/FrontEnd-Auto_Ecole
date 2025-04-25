<template>
    <Bar :data="chartData" :options="chartOptions" />
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import { Bar } from 'vue-chartjs'
  import {
    Chart as ChartJS,
    Title, Tooltip, Legend,
    BarElement, CategoryScale, LinearScale
  } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
  const chartData = ref({
    labels: ['Cours', 'Exercices', 'Vidéos', 'Utilisateurs'],
    datasets: [{
      label: 'Données',
      data: [0, 0, 0, 0],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
    }]
  })
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Statistiques en barres'
      }
    }
  }
  
  onMounted(async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
  
      const response = await axios.get('http://localhost:8000/api/statistiques')
      const stats = response.data
  
      // 🔥 Cloner entièrement l'objet chartData pour déclencher la réactivité
      chartData.value = {
        labels: ['Cours', 'Exercices', 'Vidéos', 'Utilisateurs'],
        datasets: [{
          label: 'Données',
          data: [
            stats.cours,
            stats.exercices,
            stats.videos,
            stats.users
          ],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
        }]
      }
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques :', error)
    }
  })
  </script>
  