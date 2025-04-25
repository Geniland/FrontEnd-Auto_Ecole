<template>
  <div  id="app">
    
    <div class="upload-video-container">
      <h2>Télécharger une Vidéo</h2>
      <form @submit.prevent="uploadVideo">
        <div class="form-group">
          <label for="video">Vidéo :</label>
          <input 
            type="file" 
            id="video" 
            @change="handleFileUpload" 
            accept="video/*" 
            required
          >
        </div>
        <div class="form-group">
          <label for="description">Description :</label>
          <textarea id="description" v-model="description" required></textarea>
        </div>
        <button type="submit">Télécharger</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import Entete from '@/components/Entete.vue';
import { ref } from 'vue';
import axios from 'axios';

const videoFile = ref(null); // Définition de videoFile
const description = ref('');

const handleFileUpload = (event) => {
  videoFile.value = event.target.files[0]; // Capture du fichier
};

const uploadVideo = async () => {
  if (!videoFile.value) {
    alert('Veuillez sélectionner une vidéo.');
    return;
  }

  const formData = new FormData();
  formData.append('video', videoFile.value, videoFile.value.name); // Ajout du fichier à formData
  formData.append('description', description.value);

  try {
    const response = await axios.post(
      'http://localhost:8000/api/uploadV',
      formData,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          // Ne pas spécifier 'Content-Type' !
        },
      }
    );
    alert('Vidéo téléchargée avec succès');
    videoFile.value = null; // Réinitialisation
    description.value = '';
  } catch (error) {
    console.error('Erreur:', error.response?.data);
    alert('Erreur lors du téléchargement');
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
