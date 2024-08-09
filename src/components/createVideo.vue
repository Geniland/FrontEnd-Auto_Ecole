<template>
    <div id="app">
        <Entete/>
        <!-- <router-view /> -->
    </div>

    <div class="upload-video-container">
      <h2>Télécharger une Vidéo</h2>
      <form @submit.prevent="uploadVideo">
        <div class="form-group">
          <label for="video">Vidéo :</label>
          <input type="file" id="video" @change="handleFileUpload" required>
        </div>
        <div class="form-group">
          <label for="description">Description :</label>
          <textarea id="description" v-model="description" required></textarea>
        </div>
        <button type="submit">Télécharger</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import Entete from '@/components/Entete.vue';
  import { ref } from 'vue';
  import axios from 'axios';
  
  const videoFile = ref(null);
  const description = ref('');
  
  const handleFileUpload = (event) => {
    videoFile.value = event.target.files[0];
  };
  
  const uploadVideo = async () => {
    if (!videoFile.value) {
      alert('Veuillez sélectionner une vidéo.');
      return;
    }
  
    const formData = new FormData();
    formData.append('video', videoFile.value);
    formData.append('description', description.value);
  
    try {
      const response = await axios.post('http://localhost:8000/api/upload-video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Vidéo téléchargée avec succès');
      // Reset form
      videoFile.value = null;
      description.value = '';
    } catch (error) {
      console.error(error);
      alert('Erreur lors du téléchargement de la vidéo');
    }
  };
  </script>
  
  <style scoped>
  .upload-video-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .upload-video-container h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #068C98;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }
  
  button:hover {
    background-color: #005f67;
  }
  </style>
  