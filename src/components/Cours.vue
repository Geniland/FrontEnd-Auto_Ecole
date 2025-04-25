<template>
  <div class="dashboard-container">
    <div class="left-panel">
      <h1 class="app-title">📚 Auto-École Pro</h1>
      <p class="subtitle">Ajoutez facilement vos cours en quelques clics.</p>
      <img src="https://illustrations.popsy.co/gray/laptop-idea.svg" alt="Cours" class="illustration" />
    </div>

    <div class="right-panel">
      <div class="form-card">
        <h2 class="form-title">Créer un nouveau cours</h2>

        <form @submit.prevent="createCours">
          <div class="form-group">
            <label for="title">Titre</label>
            <input type="text" id="title" v-model="cours.title" placeholder="Titre du cours" />
          </div>

          <div class="form-group">
            <label for="description">Description</label>
            <textarea id="description" v-model="cours.description" placeholder="Décrivez brièvement ce cours..." rows="4"></textarea>
          </div>

          <div class="form-group">
            <label for="pdf">Fichier PDF</label>
            <input type="file" id="pdf" @change="handleFileUpload" />
          </div>

          <button type="submit" class="submit-btn">🚀 Créer le cours</button>
        </form>

        <transition name="fade">
          <p v-if="successMessage" class="success-msg">{{ successMessage }}</p>
        </transition>
        <transition name="fade">
          <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>
        </transition>
      </div>
    </div>
  </div>
</template>



<script setup>

import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const cours = ref({
  title: '',
  description: '',
  pdf: null,
});
const successMessage = ref('');
const errorMessage = ref('');

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  cours.value.pdf = file;
};

const logout = () => {
  localStorage.removeItem('user');
  axios.defaults.headers.common['Authorization'] = '';
  router.push({ name: 'Login' });
};

const createCours = async () => {
  const formData = new FormData();
  formData.append('title', cours.value.title);
  formData.append('description', cours.value.description);
  if (cours.value.pdf instanceof File) {
    formData.append('pdf', cours.value.pdf);
  }

  try {
    const response = await axios.post('http://localhost:8000/api/cours', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    successMessage.value = 'Cours créé avec succès!';
    errorMessage.value = '';
    setTimeout(() => {
      router.push({ name: 'CoursList' }); // Redirection vers la liste des cours après la création
    }, 2000);
  } catch (error) {
    errorMessage.value = 'Erreur lors de la création du cours.';
    successMessage.value = '';
  }
};
</script>

<style scoped>
.dashboard-container {
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f4ff, #ffffff);
  font-family: 'Segoe UI', sans-serif;
}

.left-panel {
  flex: 1;
  background-color: #eef3fb;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px 40px;
  text-align: center;
  border-right: 1px solid #dce3f1;
}

.app-title {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 30px;
}

.illustration {
  width: 80%;
  max-width: 400px;
  margin: 0 auto;
}

.right-panel {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

.form-card {
  width: 100%;
  max-width: 500px;
  background: #ffffff;
  padding: 35px 40px;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
}

.form-title {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 30px;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #34495e;
  font-weight: 600;
}

input[type="text"],
textarea,
input[type="file"] {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #ccc;
  border-radius: 12px;
  font-size: 1em;
  background-color: #f9f9f9;
  transition: all 0.3s ease;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #3498db;
  background-color: #fff;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
}

.submit-btn {
  width: 100%;
  padding: 14px;
  background-color: #3498db;
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  background-color: #2980b9;
  transform: scale(1.02);
}

.success-msg {
  color: #2ecc71;
  margin-top: 15px;
  text-align: center;
  font-weight: bold;
}

.error-msg {
  color: #e74c3c;
  margin-top: 15px;
  text-align: center;
  font-weight: bold;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 900px) {
  .dashboard-container {
    flex-direction: column;
  }

  .left-panel {
    border-right: none;
    border-bottom: 1px solid #dce3f1;
    padding: 30px;
  }

  .right-panel {
    padding: 20px;
  }

  .illustration {
    width: 60%;
  }
}
</style>


