<template>
  <div class="videos-wrapper">
    <div class="header">
      <h1>🎥 Nos Vidéos</h1>
      <input type="text" v-model="searchQuery" placeholder="Rechercher une vidéo..." />
    </div>

    <div v-if="filteredVideos.length === 0" class="no-videos">
      😔 Aucune vidéo trouvée.
    </div>

    <div v-else class="video-grid">
      <div v-for="video in filteredVideos" :key="video.id" class="video-card" @click="openModal(video)">
        <img :src="getThumbnail(video.path)" alt="Aperçu vidéo" />
        <div class="overlay">
          <p>{{ video.description }}</p>
        </div>
      </div>
    </div>

    <!-- Lightbox modal -->
    <div v-if="selectedVideo" class="modal" @click.self="closeModal">
      <div class="modal-content">
        <video :src="getVideoUrl(selectedVideo.path)" controls autoplay></video>
        <p>{{ selectedVideo.description }}</p>
        <button @click="closeModal">Fermer</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const videos = ref([]);
const selectedVideo = ref(null);
const searchQuery = ref('');

const getVideoUrl = (path) => `http://localhost:8000/storage/${path}`;
const getThumbnail = (path) => `https://img.youtube.com/vi/default.jpg`; // remplace si tu génères des miniatures réelles

const openModal = (video) => selectedVideo.value = video;
const closeModal = () => selectedVideo.value = null;

const filteredVideos = computed(() => {
  return videos.value.filter(video =>
    video.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

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
.videos-wrapper {
  padding: 40px 20px;
  background: radial-gradient(circle, #adadb1, #cbcbcf);
  color: #fff;
  min-height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.header input {
  padding: 10px 15px;
  border-radius: 25px;
  border: none;
  outline: none;
  width: 300px;
  max-width: 90%;
  font-size: 1rem;
  text-align: center;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  padding-top: 20px;
}

.video-card {
  position: relative;
  cursor: pointer;
  border-radius: 15px;
  overflow: hidden;
  transition: transform 0.3s;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);
}

.video-card:hover {
  transform: scale(1.05);
}

.video-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.overlay {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  padding: 10px;
  color: #fff;
  font-size: 0.9rem;
  height: 100%;
  display: flex;
  align-items: flex-end;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.video-card:hover .overlay {
  opacity: 1;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(15, 15, 30, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #222;
  border-radius: 15px;
  padding: 20px;
  max-width: 800px;
  width: 90%;
  text-align: center;
  position: relative;
  animation: fadeIn 0.4s ease;
}

.modal-content video {
  width: 100%;
  border-radius: 10px;
}

.modal-content p {
  margin-top: 10px;
  color: #ddd;
}

.modal-content button {
  margin-top: 15px;
  background-color: #e74c3c;
  border: none;
  padding: 10px 20px;
  color: #fff;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
}

.modal-content button:hover {
  background-color: #c0392b;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.no-videos {
  text-align: center;
  font-size: 1.2rem;
  color: #bbb;
  padding: 50px 0;
}
</style>
