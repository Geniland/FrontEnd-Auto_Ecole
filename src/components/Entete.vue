<template>
  <div id="app">
    <header class="header">
      <h1>Auto-Ecole</h1>
      <nav>
        <ul class="nav-links">
         
          <li><router-link to="/Apropos">À propos</router-link></li>
          <li><router-link to="/create-cours">Création de Cours</router-link></li>
          <li><router-link to="/test-cours">Création de Textes</router-link></li>
          <li><router-link to="/Create-Questions">Création de Questions</router-link></li>
          <li><router-link to="/CreateVideos">Uplaoder une video</router-link></li>


          <li><router-link to="/Cours-List">Liste des cours</router-link></li> 
          <li><router-link to="/QCM">Passer un text</router-link></li>

          <li><router-link to="/Simulation">Simulation de conduite</router-link></li>
          
          
          
          
          
        </ul>
      </nav>
      <div class="user-info">
          <i class="fas fa-user user-icon"></i> 
          <span class="user-name">{{ userName }}</span>
          <button @click="logout" class="logout-button">Déconnexion</button>
        </div>
    </header>
    
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const userName = ref('User');

onMounted(async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    const response = await axios.get('http://localhost:8000/api/user');
    userName.value = response.data.name;
  } else {
    router.push({ name: 'Login' });
  }
});

export default {
  name: 'App',
  methods: {
      logout() {
          localStorage.removeItem('user');
          axios.defaults.headers.common['Authorization'] = '';
          this.$router.push({ name: 'Login' });
      }
  }
}
</script>

<style scoped>



.user-container {
  text-align: center;
  margin: 50px;
}

.user-container button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.user-container button:hover {
  background-color: #0056b3;
}



.user-name {
  color: #fff;
  font-weight: bold;
}

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

.logout-button {
  padding: 8px 15px;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.logout-button:hover {
  background-color: #ff4b4b;
}

/* Effet de transition pour le bouton de déconnexion */
.logout-button {
  transition: all 0.3s ease;
}

.logout-button:hover {
  transform: scale(1.1);
}

</style>
