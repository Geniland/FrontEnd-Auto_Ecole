<template>
  <div class="cours-list-container">
    <h2>Liste des tests</h2>

    <input
      v-model="searchTerm"
      type="text"
      placeholder="Rechercher un test par titre..."
      class="search-bar"
    />

    <div class="cours-cards">
      <div
        v-for="cours in filteredCoursList"
        :key="cours.id"
        class="cours-card"
        :style="{ borderLeft: '5px solid ' + cours.borderColor }"
        @click="goToViewQuestionReponse(cours.id)"
      >
        <h3>{{ cours.title }}</h3>
        <p class="difficulty">Difficulté : {{ cours.difficulty }}</p>
        <div class="progress-bar-container">
          <div class="progress-bar" :style="{ width: cours.progress + '%' }"></div>
        </div>
        <p class="progress-text">{{ cours.progress }}% complété</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const coursList = ref([]);
const searchTerm = ref('');
const router = useRouter();

const colors = ['#3498db', '#27ae60', '#e67e22', '#9b59b6'];

const fetchCoursList = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/test');
    coursList.value = response.data.map(test => ({
      ...test,
      difficulty: test.difficulty || ['Facile', 'Moyen', 'Difficile'][Math.floor(Math.random() * 3)],
      progress: Math.floor(Math.random() * 100),
      borderColor: colors[Math.floor(Math.random() * colors.length)]
    }));
  } catch (error) {
    console.error('Erreur lors du chargement des tests:', error);
  }
};

const goToViewQuestionReponse = (coursId) => {
  router.push({ name: 'QuestionReponseUtilisateur', params: { id: coursId } });
};

const filteredCoursList = computed(() => {
  return coursList.value.filter(cours =>
    cours.title.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

onMounted(fetchCoursList);
</script>

<style scoped>
.cours-list-container {
  max-width: 1200px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.search-bar {
  width: 60%;
  padding: 12px;
  margin-bottom: 30px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
}

.cours-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.cours-card {
  background: linear-gradient(to bottom right, #fff, #f0f0f0);
  border-radius: 10px;
  padding: 20px;
  text-align: left;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
}

.cours-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

.cours-card h3 {
  margin-top: 0;
  font-size: 1.4em;
  color: #333;
}

.difficulty {
  color: #777;
  font-size: 0.95em;
  margin-top: 10px;
}

.progress-bar-container {
  height: 8px;
  background-color: #ddd;
  border-radius: 5px;
  margin-top: 10px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: #27ae60;
  transition: width 0.5s ease;
}

.progress-text {
  margin-top: 8px;
  font-size: 0.9em;
  color: #444;
}
</style>
