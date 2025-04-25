<template>
  <div :class="['app', isDark ? 'dark-theme' : 'light-theme']">
    <!-- Loader -->
    <div v-if="loading" class="loader-container">
      <div class="spinner"></div>
    </div>

    <!-- Particules -->
    <div id="particles-js"></div>

    <!-- Gradient animé derrière tout -->
    <div class="background-gradient"></div>

    <!-- Vidéo sous le contenu principal -->
    <div class="content-background">
      <video autoplay muted loop playsinline class="background-video">
        <source src="/videos/video.mp4" type="video/mp4">
        Ton navigateur ne supporte pas la vidéo HTML5.
      </video>
    </div>

    <!-- Contenu principal -->
    <div class="content">
      <!-- <button class="theme-toggle" @click="toggleTheme">
        {{ isDark ? '☀️ Mode Jour' : '🌙 Mode Nuit' }}
      </button> -->

      <div class="intro-text animated-fade-in">
        <h1>Bienvenue !</h1>
        <p>
          Explorez nos ressources, suivez votre progression, et commencez votre voyage vers la liberté de conduire en toute autonomie.
        </p>
        <!-- <button class="start-button">Commencer</button> -->
      </div>
    </div>

    <!-- Footer -->
    <footer class="footer animated-slide-up">
      <div class="footer-content">
        <p>&copy; 2024 Auto-Ecole. Tous droits réservés.</p>
        <div class="contact-info">
          <p>📞 +228 93462153</p>
          <p>✉️ GenilandeE@gmail.com</p>
          <p>📍 Localise moi</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const userName = ref('User');
const loading = ref(true);
const isDark = ref(false);

const logout = () => {
  localStorage.removeItem('token');
  axios.defaults.headers.common['Authorization'] = '';
  router.push({ name: 'Login' });
};

const toggleTheme = () => {
  isDark.value = !isDark.value;
};

onMounted(async () => {
  setTimeout(() => {
    loading.value = false;
  }, 2000);

  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    const response = await axios.get('http://localhost:8000/api/user');
    userName.value = response.data.name;
  } else {
    router.push({ name: 'Login' });
  }

  // Charger particles.js
  import('particles.js').then((particlesJS) => {
    particlesJS.default.load('particles-js', '/particles.json');
  });
});
</script>

<style scoped>
/* Loader, Spinner... (pareil) */

/* Particles */
#particles-js {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -30;
}

/* Background gradient animé */
.background-gradient {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(-45deg, #00c3ff, #ffff1c, #00ff6a, #ff4b2b);
  background-size: 400% 400%;
  animation: gradientBG 15s ease infinite;
  z-index: -40;
}

@keyframes gradientBG {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Vidéo en fond */
.content-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -10;
}

.background-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.6);
}

/* Themes */
.light-theme {
  --overlay-bg: rgba(255, 255, 255, 0.7);
  --text-color: #333333;
  --btn-bg: #00B894;
}

.dark-theme {
  --overlay-bg: rgba(0, 0, 0, 0.6);
  --text-color: #f5f5f5;
  --btn-bg: #6366f1;
}

/* Content avec gradient animé + superposition semi-transparente */
.content {
  position: relative;
  min-height: 100vh;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--text-color);
  z-index: 1;
  background: inherit;
  overflow: hidden;
}

.content::before {
  content: "";
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  background: var(--overlay-bg);
  backdrop-filter: blur(8px);
  z-index: -1;
}

/* Intro text */
.intro-text {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px;
  max-width: 800px;
  text-align: center;
  transition: transform 0.3s;
}

.intro-text:hover {
  transform: scale(1.03);
}

/* Buttons, Footer... (pareil) */

/* Animations */
.animated-fade-in {
  animation: fadeIn 2s ease forwards;
}

.animated-slide-up {
  animation: slideUp 2s ease forwards;
}

@keyframes fadeIn {
  0% { opacity: 0; transform: scale(0.95); }
  100% { opacity: 1; transform: scale(1); }
}

@keyframes slideUp {
  0% { transform: translateY(100%); }
  100% { transform: translateY(0); }
}

/* Footer */
.footer {
  width: 100%;
  background: rgba(44, 62, 80, 0.85);
  color: #ecf0f1;
  padding: 20px 10px;
  font-size: 0.9em;
  margin-top: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  bottom: 0;
  z-index: 2;
}

.footer-content {
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 0 20px;
}

.footer-content p {
  margin: 0;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.contact-info p {
  margin: 0;
}

/* Responsive footer */
@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    text-align: center;
  }
  .contact-info {
    align-items: center;
  }
}

</style>
