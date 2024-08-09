<template>
  <div id="app">
    <header class="header">
      <div class="header-container">
        <h1>Auto-Ecole</h1>
        <nav>
          <ul class="nav-links">
            <li><router-link to="/Home">À propos</router-link></li>
            <li><router-link to="/Auto_Ecole">Liste des cours</router-link></li>
            <li><router-link to="/CoursVideo">Cours vidéo</router-link></li>
            <li><router-link to="/Auto_Ecole_Test">Passer un test</router-link></li>
            <li><router-link to="/Simulation">Simulation de conduite</router-link></li>
          </ul>
        </nav>
        <div class="user-info">
          <i class="fas fa-user user-icon"></i> 
          <span class="user-name">{{ userName }}</span>
          <button @click="logout" class="logout-button">Déconnexion</button>
        </div>
      </div>
    </header>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const userName = ref('User');

const logout = () => {
  localStorage.removeItem('token');
  axios.defaults.headers.common['Authorization'] = '';
  router.push({ name: 'Login' });
};

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
</script>

<style scoped>
/* Ajoutez une transition pour les liens de navigation */
.nav-links a {
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  padding: 10px 15px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.nav-links a:hover {
  background-color: #00A3CC;
  color: #fff;
  border-radius: 5px;
}

/* Améliorer le style de l'en-tête */
.header {
  background-color: #068C98;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.header h1 {
  font-size: 2.5em;
  color: #fff;
  margin: 0;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 15px;
  margin: 0;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-icon {
  font-size: 1.5em;
  color: #fff;
}

.user-name {
  color: #fff;
  font-weight: bold;
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
