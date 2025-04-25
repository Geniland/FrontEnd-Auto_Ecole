<template>
  <div class="page-wrapper">
    <header class="header">
      <h1>📘 Liste des Cours</h1>
    </header>

    <section class="course-grid">
      <div class="course-card" v-for="cours in coursList" :key="cours.id">
        <div class="card-content">
          <h3>{{ cours.title }}</h3>
          <p class="description">{{ cours.description }}</p>

          <div class="actions">
            <a :href="getPdfUrl(cours.pdf_path)" target="_blank" class="btn download-btn">📄 Télécharger PDF</a>
            <router-link :to="{ name: 'TestSpecifique', params: { coursId: cours.id } }" class="btn test-btn">📝 Passer le Test</router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const coursList = ref([]);

const fetchCoursList = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/tests');
    coursList.value = response.data;
  } catch (error) {
    console.error('Failed to fetch courses:', error);
  }
};

const router = useRouter();

const logout = () => {
  localStorage.removeItem('user');
  axios.defaults.headers.common['Authorization'] = '';
  router.push({ name: 'Login' });
};

onMounted(fetchCoursList);

const getPdfUrl = (pdf_path) => {
  return `http://localhost:8000/storage/${pdf_path}`;
};
</script>

<style scoped>
.page-wrapper {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 30px 20px;
  background: #f2f5f9;
  min-height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
}

.course-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
}

.course-card {
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 350px;
  transition: transform 0.2s ease;
}

.course-card:hover {
  transform: translateY(-5px);
}

.card-content {
  padding: 25px;
  text-align: center;
}

.card-content h3 {
  font-size: 1.4rem;
  color: #34495e;
  margin-bottom: 10px;
}

.description {
  color: #666;
  font-size: 0.95rem;
  margin-bottom: 20px;
  min-height: 60px;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn {
  padding: 10px 15px;
  border-radius: 8px;
  font-weight: bold;
  text-decoration: none;
  transition: 0.3s ease;
}

.download-btn {
  background-color: #3498db;
  color: #fff;
}

.download-btn:hover {
  background-color: #2980b9;
}

.test-btn {
  background-color: #27ae60;
  color: #fff;
}

.test-btn:hover {
  background-color: #1e8449;
}

@media (max-width: 768px) {
  .card-content {
    padding: 20px 15px;
  }

  .course-card {
    max-width: 90%;
  }
}
</style>
