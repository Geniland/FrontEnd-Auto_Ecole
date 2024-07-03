<template>
   <header class="header">
        <h1>Auto-Ecole</h1>
        <nav>
          <ul class="nav-links">
           
            <li><router-link to="/Home">À propos</router-link></li>
            <li><router-link to="/Auto_Ecole">Liste des cours</router-link></li> 
            <li><router-link to="/Auto_Ecole_Test">Passer un text</router-link></li>
            <li><router-link to="/Simulation">Simulation de conduite</router-link></li>
            <li>
            <div class="user-info">
              Welcome, User
              <button @click="logout">Logout</button>
            </div>
          </li>
          </ul>
        </nav>
      </header>

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
    background-color: #f8f8f8;
    padding: 20px;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .header h1 {
    margin: 0;
    font-size: 2em;
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
    color: #333;
    font-weight: bold;
  }
  
  .section {
    padding: 20px;
    border-bottom: 1px solid #ddd;
  }
  
  .section h2 {
    font-size: 1.5em;
    margin-bottom: 10px;
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
  