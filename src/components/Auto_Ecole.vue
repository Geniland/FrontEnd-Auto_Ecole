<template>
    <div id="app">
    <Entete/>
    <!-- <router-view /> -->
  </div>
  <div class="container">
    <div class="item" v-for="cours in coursList" :key="cours.id">
      <h3>{{ cours.title }}</h3>
      <p>{{ cours.description }}</p>
      <a :href="getPdfUrl(cours.pdf_path)" target="_blank">Télécharger le PDF</a>
      <p><router-link :to="{ name: 'TestSpecifique', params: { coursId: cours.id } }">Test</router-link></p>
      
    </div>
  </div>
  
</template>

<script setup>
import Entete from '@/components/EnteteAcceuil.vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import axios from 'axios';

const coursList = ref([]);

const fetchCoursList = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/cours');
    coursList.value = response.data; // Assuming the API returns an array of courses with `id`, `title`, `description`, and `pdf` fields
  } catch (error) {
    console.error('Failed to fetch courses:', error);
  }
};

const router = useRouter();  // Initialiser router

const logout = () => {
  localStorage.removeItem('user');  // Supprimer les informations de l'utilisateur du stockage local
  axios.defaults.headers.common['Authorization'] = '';  // Supprimer le header d'autorisation
  router.push({ name: 'Login' });  // Rediriger vers la page de connexion
};

onMounted(fetchCoursList);

const getPdfUrl = (pdf_path) => {
  return `http://localhost:8000/storage/${pdf_path}`; // Adjust this path based on your storage setup
};
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.item {
  flex: 1 1 calc(33.333% - 20px); /* 3 items per row with a gap */
  box-sizing: border-box;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.item h3 {
  margin-top: 0;
}

.item a {
  display: inline-block;
  margin-top: 10px;
  padding: 10px 20px;
  color: #fff;
  background-color: #3498db;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.item a:hover {
  background-color: #2980b9;
}

.header {
  background-color: rgba(4, 152, 21, 0.559);
  padding: 20px;
  margin: 0px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.71);
  position: relative;
  top: 0;
  width: 100%;
  z-index: 1000;
}

.header h1 {
  margin: 0;
  font-size: 2.5em;
  color: #333;
}

.nav-links {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 10px;
}

.nav-links li {
  display: inline;
}

.nav-links a {
  text-decoration: none;
  color: #FFFFFF;
  font-weight: bold;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.nav-links a:hover {
  background-color: #007bff;
  color: #fff;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-info button {
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.user-info button:hover {
  background-color: #0056b3;
}

</style>
