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
            <!-- <li>
            <div class="user-info">
              Welcome, User
              <button @click="logout">Logout</button>
            </div>
          </li> -->
          </ul>
        </nav>
      </header>
  <div class="create-test-container">
    <h2>Créer un nouveau test</h2>
    <form @submit.prevent="createTest">
      <div class="form-group">
        <label for="cours">Cours:</label>
        <select id="cours" v-model="selectedCours" required>
          <option v-for="cours in coursList" :key="cours.id" :value="cours.id">{{ cours.title }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="title">Titre:</label>
        <input type="text" id="title" v-model="title" required />
      </div>
      
      <button type="submit">Créer le test</button>
    </form>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const title = ref('');
const selectedCours = ref(null);
const successMessage = ref('');
const errorMessage = ref('');
const coursList = ref([]);

const fetchCoursList = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/cours');
    coursList.value = response.data; // Assuming the API returns an array of courses with `id` and `title` fields
  } catch (error) {
    console.error('Failed to fetch courses:', error);
  }
};

onMounted(fetchCoursList);

const createTest = async () => {
  try {
    const response = await axios.post('http://localhost:8000/api/test', {
      title: title.value,
      cours_id: selectedCours.value,
    });

    successMessage.value = 'Test créé avec succès!';
    errorMessage.value = '';
    title.value = '';
    selectedCours.value = null;
  } catch (error) {
    errorMessage.value = 'Une erreur s\'est produite lors de la création du test.';
    successMessage.value = '';
  }

  const logout = () => {
  localStorage.removeItem('user');
  axios.defaults.headers.common['Authorization'] = '';
  router.push({ name: 'Login' });
};
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
.create-test-container {
  max-width: 500px;
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

select, input {
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
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #2980b9;
}

.success {
  color: green;
  margin-top: 20px;
}

.error {
  color: red;
  margin-top: 20px;
}
</style>
