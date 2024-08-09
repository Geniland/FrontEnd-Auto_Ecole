<template>

  <div id="app">
    <Entete/>
    <!-- <router-view /> -->
  </div>

  <div class="background-video-container">
    <video autoplay muted loop class="background-video">
      Votre navigateur ne supporte pas la balise vidéo.
    </video>
  </div>

  <div class="content">
    <div class="intro-text">
      <p>Bienvenue dans l'application de notre auto-école, votre compagnon de confiance pour apprendre à conduire en toute sécurité. Que vous soyez débutant ou que vous cherchiez à perfectionner vos compétences, notre plateforme vous offre des cours interactifs, des tests pratiques et des simulations de conduite pour vous préparer efficacement à obtenir votre permis. Explorez nos ressources, suivez votre progression et commencez votre voyage vers la liberté de conduire en toute autonomie.</p>
    </div>
  </div>

  <footer>
    <div class="footer">
      <p>Copyright © 2024 Auto-Ecole. Tous droits réservés.</p>
      <p>Contact : +228 93462153</p>
      <p>Email : GenilandeE@gmail.com</p>
      <p>Localisation : Localise moi</p>
    </div>
  </footer>
</template>

<script setup>

import Entete from '@/components/EnteteAcceuil.vue';


// export default {
//   name: 'App',
//   components: {
//     Entete
//   }
// }

import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const userName = ref('User')

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
/* Styles inchangés */
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

.user-info .user-icon {
  font-size: 1.5em;
}

.background-video-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
}

.background-video {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: translate(-50%, -50%);
  z-index: -1;
}

.content {
  position: relative;
  z-index: 1;
}

.intro-text {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-size: 1.1em;
  color: #333;
  line-height: 1.6;
}

.intro-text p {
  margin: 0;
  padding: 10px 0;
}

.footer {
  background-color: #2C3E50B6;
  color: white;
  text-align: center;
  padding: 20px;
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  font-family: Arial, sans-serif;
}

.footer p {
  margin: 5px 0;
}

.footer a {
  color: #ecf0f1;
  text-decoration: none;
}

.footer a:hover {
  text-decoration: underline;
}
</style>
