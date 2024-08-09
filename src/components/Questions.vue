<template>

<div id="app">
        <Entete/>
        <!-- <router-view /> -->
    </div>


    <div class="create-question-container">
      <h2>Créer une nouvelle question</h2>
      <form @submit.prevent="createQuestion" class="form">
        <div class="form-group">
          <label for="course_select">Titre Test:</label>
          <select id="course_select" v-model="selectedCourseId" @change="fetchTests">
            <option v-for="course in courses" :key="course.id" :value="course.id">{{ course.title }}</option>
          </select>
        </div>
        <!-- <div class="form-group" v-if="tests.length > 0">
          <label for="test_select">Test:</label>
          <select id="test_select" v-model="selectedTestId">
            <option v-for="test in tests" :key="test.id" :value="test.id">{{ test.title }}</option>
          </select>
        </div> -->
        <div class="form-group">
          <label for="question_text">Question:</label>
          <input type="text" id="question_text" v-model="questionText" required />
        </div>
        <div v-for="(option, index) in options" :key="index" class="form-group option-group">
          <div class="option-header">
            <label :for="'option_text_' + index">Option {{ index + 1 }}:</label>
            <button type="button" @click="removeOption(index)" class="btn-remove">X</button>
          </div>
          <input type="text" :id="'option_text_' + index" v-model="option.option_text" required />
          <label class="correct-label">
            <input type="checkbox" v-model="option.is_correct" /> Correct
          </label>
        </div>
        <button type="button" @click="addOption" class="btn-add">Ajouter une option</button>
        <button type="submit" class="btn-submit">Créer la question</button>
      </form>
      <p v-if="successMessage" class="success">{{ successMessage }}</p>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script setup>
  import Entete from '@/components/Entete.vue';
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const questionText = ref('');
  const options = ref([{ option_text: '', is_correct: false }]);
  const successMessage = ref('');
  const errorMessage = ref('');
  
  const courses = ref([]);
  const selectedCourseId = ref(null);
  const tests = ref([]);
  const selectedTestId = ref(null);
  
  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/coursTest');
      courses.value = response.data;
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    }
  };

  const logout = () => {
  localStorage.removeItem('user');
  axios.defaults.headers.common['Authorization'] = '';
  router.push({ name: 'Login' });
};
  
  const fetchTests = () => {
    const course = courses.value.find(c => c.id === selectedCourseId.value);
    tests.value = course ? course.tests : [];
  };
  
  const addOption = () => {
    options.value.push({ option_text: '', is_correct: false });
  };
  
  const removeOption = (index) => {
    options.value.splice(index, 1);
  };
  
  const createQuestion = async () => {
    if (!selectedCourseId.value) {
      errorMessage.value = "Veuillez sélectionner un test.";
      return;
    }
    
    try {
      const response = await axios.post(`http://localhost:8000/api/tests/${selectedCourseId.value}/questions`, {
        question_text: questionText.value,
        options: options.value,
      });
  
      successMessage.value = 'Question créée avec succès!';
      errorMessage.value = '';
      questionText.value = '';
      options.value = [{ option_text: '', is_correct: false }];
    } catch (error) {
      errorMessage.value = "Une erreur s'est produite lors de la création de la question.";
      successMessage.value = '';
    }
  };
  
  onMounted(fetchCourses);
  </script>
  
  <style scoped>







.user-container {
    text-align: center;
    margin: 50px;
}

.user-container button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.user-container button:hover {
    background-color: #0056b3;
}
















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






  
  /* Ajoutez vos styles ici */
  .create-question-container {
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    background-color: #A9A6A600;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .option-group {
    display: flex;
    flex-direction: column;
    background-color: #D8D9DA;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
  }
  
  .option-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
  }
  
  .option-header label {
    font-weight: bold;
  }
  
  .option-header .btn-remove {
    background-color: #e74c3c;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .correct-label {
    display: flex;
    align-items: center;
    margin-top: 10px;
  }
  
  .correct-label input[type="checkbox"] {
    margin-right: 5px;
  }
  
  .success {
    color: green;
    margin-top: 15px;
  }
  
  .error {
    color: red;
    margin-top: 15px;
  }
  
  .form {
    display: flex;
    flex-direction: column;
  }
  
  .form-group label {
    font-weight: bold;
    margin-bottom: 5px;
    display: block;
  }
  
  .form-group input[type="text"],
  .form-group select,
  .form-group textarea {
    width: calc(100% - 10px);
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  .btn-add,
  .btn-submit {
    background-color: #3498db;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
  }
  
  .btn-add:hover,
  .btn-submit:hover {
    opacity: 0.9;
  }
  </style>
  