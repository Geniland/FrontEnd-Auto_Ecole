<template>

    <div id="app">
    <Entete/>
    <!-- <router-view /> -->
  </div>

    <div class="videos-container">
      <h2>Liste des Vidéos</h2>
      <div v-if="videos.length === 0" class="no-videos">
        Aucune vidéo disponible.
      </div>
      <div v-else class="video-list">
        <div v-for="video in videos" :key="video.id" class="video-item">
          <video :src="getVideoUrl(video.path)" controls></video>
          <p>{{ video.description }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import Entete from '@/components/EnteteAcceuil.vue';
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const videos = ref([]);
  
  const getVideoUrl = (path) => {
    return `http://localhost:8000/storage/${path}`;
  };
  
  onMounted(async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/videos', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      videos.value = response.data;
    } catch (error) {
      console.error(error);
      alert('Erreur lors de la récupération des vidéos');
    }
  });
  </script>
  
  <style scoped>
  .videos-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .videos-container h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .video-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  
  .video-item {
    background-color: white;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  video {
    width: 100%;
    height: auto;
    border-radius: 10px;
    margin-bottom: 10px;
  }
  
  .no-videos {
    text-align: center;
    font-size: 18px;
    color: #777;
  }
  </style>
  