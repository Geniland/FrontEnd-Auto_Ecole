<template>
  <transition name="fade-slide">
    <div class="create-test-container" v-if="showContainer">
      <h2>Créer un nouveau test</h2>
      <form @submit.prevent="createTest">
        <div class="form-group">
          <label for="cours">Cours :</label>
          <select id="cours" v-model="selectedCours" required>
            <option value="" disabled selected>Sélectionnez un cours</option>
            <option v-for="cours in coursList" :key="cours.id" :value="cours.id">
              {{ cours.title }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="title">Titre :</label>
          <input type="text" id="title" v-model="title" placeholder="Entrez le titre du test" required />
        </div>

        <button type="submit" :disabled="isLoading">
          <span v-if="isLoading">Création...</span>
          <span v-else>Créer le test</span>
        </button>
      </form>

      <transition name="fade">
        <p v-if="successMessage" class="success">{{ successMessage }}</p>
      </transition>

      <transition name="fade">
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </transition>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const title = ref('');
const selectedCours = ref(null);
const successMessage = ref('');
const errorMessage = ref('');
const coursList = ref([]);
const isLoading = ref(false);
const showContainer = ref(false);

const fetchCoursList = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/cours');
    coursList.value = response.data;
  } catch (error) {
    console.error('Erreur lors du chargement des cours:', error);
  }
};

onMounted(() => {
  showContainer.value = true;
  fetchCoursList();
});

const createTest = async () => {
  isLoading.value = true;
  try {
    await axios.post('http://localhost:8000/api/test', {
      title: title.value,
      cours_id: selectedCours.value,
    });

    successMessage.value = '✅ Test créé avec succès !';
    errorMessage.value = '';
    title.value = '';
    selectedCours.value = null;
  } catch (error) {
    errorMessage.value = '❌ Une erreur est survenue. Veuillez réessayer.';
    successMessage.value = '';
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
/* --- Animations --- */
.fade-slide-enter-active {
  transition: all 0.6s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* --- Container --- */
.create-test-container {
  max-width: 500px;
  margin: 60px auto;
  padding: 30px;
  background: linear-gradient(to bottom right, #ffffff, #f0f8ff);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* --- Titles --- */
h2 {
  font-size: 2em;
  color: #2c3e50;
  margin-bottom: 25px;
}

/* --- Form Elements --- */
.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
}

select, input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1em;
  background-color: #fff;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.05);
}

/* --- Button --- */
button {
  width: 100%;
  padding: 12px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.4s ease, transform 0.2s ease;
}

button:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
}

button:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

/* --- Messages --- */
.success, .error {
  margin-top: 20px;
  font-weight: 600;
  padding: 10px;
  border-radius: 8px;
  animation: pulse 0.4s ease-in-out;
}
.success {
  color: #2ecc71;
  background-color: #eafaf1;
}
.error {
  color: #e74c3c;
  background-color: #fdecea;
}

/* --- Feedback animation --- */
@keyframes pulse {
  0% {
    transform: scale(0.95);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
