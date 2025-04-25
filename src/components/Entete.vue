<template>
  <div class="dashboard-layout">
    <!-- Animated Sidebar -->
    <transition name="slide">
      <aside v-if="sidebarOpen" class="sidebar">
        <div class="logo">
          <h2>🚗 Auto-École</h2>
        </div>
        <nav>
          <ul>
            <li><router-link to="/DashboardLayout/Apropos"><i class="fas fa-info-circle"></i> À propos</router-link></li>
            <li><router-link to="/create-cours"><i class="fas fa-book"></i> Créer un Cours</router-link></li>
            <li><router-link to="/test-cours"><i class="fas fa-align-left"></i> Créer un Test</router-link></li>
            <li><router-link to="/Create-Questions"><i class="fas fa-question-circle"></i> Questions</router-link></li>
            <li><router-link to="/CreateVideos"><i class="fas fa-video"></i> Uploader Vidéo</router-link></li>
            <li><router-link to="/Cours-List"><i class="fas fa-list"></i> Liste des Cours</router-link></li>
            <li><router-link to="/QCM"><i class="fas fa-pencil-alt"></i> Passer un Test</router-link></li>
            <li><router-link to="/ChatAdmine"><i class="fas fa-comments"></i> Chat</router-link></li>
          </ul>
        </nav>
      </aside>
    </transition>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Topbar -->
      <header class="topbar">
        <div class="menu-toggle" @click="sidebarOpen = !sidebarOpen">
          <i class="fas fa-bars"></i>
        </div>
        <div class="user-info">
          <i class="fas fa-user-circle user-icon"></i>
          <span class="user-name">{{ userName }}</span>
          <button @click="logout" class="logout-button">Déconnexion</button>
        </div>
      </header>

      <!-- Main View -->
      <main class="content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const sidebarOpen = ref(true);
const userName = ref('Utilisateur');
const router = useRouter();

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

const logout = () => {
  localStorage.removeItem('user');
  axios.defaults.headers.common['Authorization'] = '';
  router.push({ name: 'Login' });
};
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
  background-color: #f5f7fa;
}

.sidebar {
  width: 250px;
  background-color: #03414D;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 5px rgba(0,0,0,0.1);
  z-index: 100;
}

.logo h2 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 24px;
}

.sidebar nav ul {
  list-style: none;
  padding: 0;
}

.sidebar nav ul li {
  margin-bottom: 20px;
}

.sidebar nav ul li a {
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
}

.sidebar nav ul li a:hover {
  background-color: #057C8C;
  transform: translateX(5px);
}

/* Main content */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

/* Topbar */
.topbar {
  background-color: #068C98;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.menu-toggle {
  font-size: 1.5em;
  cursor: pointer;
  transition: 0.3s ease;
}

.menu-toggle:hover {
  transform: scale(1.2);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-icon {
  font-size: 1.8em;
}

.logout-button {
  background-color: #E74C3C;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s ease;
}

.logout-button:hover {
  background-color: #C0392B;
  transform: scale(1.05);
}

.content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background-color: #f1f1f1;
}

/* Animation */
.slide-enter-active, .slide-leave-active {
  transition: transform 0.4s ease, opacity 0.4s ease;
}

.slide-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
