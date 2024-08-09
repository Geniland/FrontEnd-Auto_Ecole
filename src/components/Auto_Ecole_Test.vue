<template>
    <div id="app">
    <Entete/>
    <!-- <router-view /> -->
  </div>

    <div class="cours-list-container">
      <h2>Liste des tests</h2>
      <div class="cours-cards">
        <div v-for="cours in coursList" :key="cours.id" class="cours-card" @click="goToViewQuestionReponse(cours.id)">
          <h3>{{ cours.title }}</h3>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import Entete from '@/components/EnteteAcceuil.vue';
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  
  const coursList = ref([]);
  const router = useRouter();
  
  const fetchCoursList = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/test');
      coursList.value = response.data; // Assuming the API returns an array of courses with `id` and `title`
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    }
  };
  
  const goToViewQuestionReponse = (coursId) => {
    router.push({ name: 'QuestionReponseUtilisateur', params: { id : coursId } });
  };

  const logout = () => {
  localStorage.removeItem('user');
  axios.defaults.headers.common['Authorization'] = '';
  router.push({ name: 'Login' });
};
  
  onMounted(fetchCoursList);
  </script>
  
  <style scoped>



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





  .cours-list-container {
    max-width: 1200px;
    margin: 50px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .cours-cards {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }
  
  .cours-card {
    flex: 1 1 calc(30% - 20px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding: 20px;
    background-color: #fff;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    text-align: left;
    cursor: pointer;
  }
  
  .cours-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  
  .cours-card h3 {
    margin-top: 0;
    font-size: 1.5em;
    color: #333;
  }
  
  .cours-card p {
    color: #666;
    margin: 10px 0;
    font-size: 1em;
  }
  
  .cours-card a {
    display: inline-block;
    margin-top: 10px;
    padding: 10px 20px;
    color: #fff;
    background-color: #3498db;
    border-radius: 5px;
    text-decoration: none;
    transition: background-color 0.3s ease;
  }
  
  .cours-card a:hover {
    background-color: #2980b9;
  }
  </style>
  