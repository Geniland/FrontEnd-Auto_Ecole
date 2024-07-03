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
      <h2>Liste des cours</h2>
      <div class="cours-cards">
        <div v-for="cours in coursList" :key="cours.id" class="cours-card">
          <h3>{{ cours.title }}</h3>
          <p>{{ cours.description }}</p>
          <a :href="getPdfUrl(cours.pdf_path)" target="_blank">Télécharger le PDF</a>
         
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  
  const router = useRouter();
  const coursList = ref([]);
  
  const fetchCoursList = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/cours');
      coursList.value = response.data; // Assuming the API returns an array of courses with `id`, `title`, `description`, and `pdf` fields
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    }
  };

  const logout = () => {
  localStorage.removeItem('user');
  axios.defaults.headers.common['Authorization'] = '';
  router.push({ name: 'Login' });
};
  
  onMounted(fetchCoursList);
  
  const getPdfUrl = (pdf_path) => {
    return `http://localhost:8000/storage/${pdf_path}`; // Adjust this path based on your storage setup
  };


  
  const deleteCours = async (coursId) => {
    try {
      await axios.delete(`http://localhost:8000/api/cours/${coursId}`);
      coursList.value = coursList.value.filter(cours => cours.id !== coursId);
    } catch (error) {
      console.error('Failed to delete course:', error);
    }
  };
  
  const goToUpdateCours = (coursId) => {
    // Exemple avec l'ID uniquement
  router.push({ name: 'MiseAjours', params: { id: coursId } });
  
  };
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
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .cours-cards {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .cours-card {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding: 20px;
    background-color: #fff;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    text-align: left;
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
  
  .button-group {
    margin-top: 10px;
  }
  
  .button-group button {
    padding: 10px 20px;
    margin-right: 10px;
    border: none;
    border-radius: 5px;
    font-size: 1em;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .button-group button:nth-child(1) {
    background-color: #e74c3c;
    color: white;
  }
  
  .button-group button:nth-child(1):hover {
    background-color: #c0392b;
  }
  
  .button-group button:nth-child(2) {
    background-color: #f39c12;
    color: white;
  }
  
  .button-group button:nth-child(2):hover {
    background-color: #e67e22;
  }
  </style>
  