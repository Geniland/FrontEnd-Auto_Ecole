<template>
  <header class="header">
        <h1>Auto-Ecole</h1>
        <nav>
          <ul class="nav-links">
           
            <li><router-link to="/Apopos">À propos</router-link></li>
            <li><router-link to="/create-cours">Création de Cours</router-link></li>
            <li><router-link to="/test-cours">Création de Textes</router-link></li>
            <li><router-link to="/Create-Questions">Création de Questions</router-link></li>


            <li><router-link to="/Cours-List">Liste des cours</router-link></li> 
            <li><router-link to="/QCM">Passer un text</router-link></li>

            <li><router-link to="/Simulation">Simulation de conduite</router-link></li>
          </ul>
        </nav>
      </header>
      
  <div class="update-cours-container">
    <h2>Mettre à jour le cours</h2>
    <form @submit.prevent="saveCours">
      <div class="form-group">
        <label for="title">Titre:</label>
        <input type="text" id="title" v-model="cours.title" required />
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea id="description" v-model="cours.description" required></textarea>
      </div>
      <div class="form-group">
        <label for="pdf">PDF:</label>
        <input type="file" id="pdf" @change="handleFileUpload" />
      </div>
      <button type="submit">Mettre à jour le cours</button>
    </form>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();

const cours = ref({
  id: null,
  title: '',
  description: '',
  pdf_path: null,
});
const successMessage = ref('');
const errorMessage = ref('');

const fetchCoursDetails = async () => {
  const courseId = route.params.id;
  try {
    const response = await axios.get(`http://localhost:8000/api/cours/${courseId}`);
    cours.value = response.data;
  } catch (error) {
    console.error('Failed to fetch cours details:', error);
    errorMessage.value = 'Erreur lors de la récupération des détails du cours.';
  }
};

const logout = () => {
  localStorage.removeItem('user');
  axios.defaults.headers.common['Authorization'] = '';
  router.push({ name: 'Login' });
};

onMounted(fetchCoursDetails);

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  cours.value.pdf_path = file;
};

const saveCours = async () => {
  const formData = new FormData();
  formData.append('title', cours.value.title);
  formData.append('description', cours.value.description);
  if (cours.value.pdf_path instanceof File) {
    formData.append('pdf', cours.value.pdf_path);
  }

  try {
    await axios.post(`http://localhost:8000/api/cours/${cours.value.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-HTTP-Method-Override': 'PUT'
      }
    });
    successMessage.value = 'Cours mis à jour avec succès!';
    errorMessage.value = '';
    setTimeout(() => {
      router.push({ name: 'CoursList' });
    }, 2000);
  } catch (error) {
    errorMessage.value = 'Erreur lors de la mise à jour du cours.';
    successMessage.value = '';
  }
  
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
.create-cours-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  margin-bottom: 20px;
  font-size: 1.8em;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

input, textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 1em;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #2980b9;
}

.success {
  color: green;
}

.error {
  color: red;
}

.update-cours-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  margin-bottom: 20px;
  font-size: 1.8em;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

input, textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 1em;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #2980b9;
}

.success {
  color: green;
}

.error {
  color: red;
}
</style>
