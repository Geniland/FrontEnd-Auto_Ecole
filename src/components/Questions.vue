<template>
  <div id="app">
    <div class="create-question-container glass-effect">
      <h2>📝 Créer une nouvelle question</h2>
      <form @submit.prevent="createQuestion" class="form">
        <div class="form-group">
          <label for="course_select">📚 Titre Test:</label>
          <select id="course_select" v-model="selectedCourseId" @change="fetchTests">
            <option v-for="course in courses" :key="course.id" :value="course.id">{{ course.title }}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="question_text">❓ Question:</label>
          <input type="text" id="question_text" v-model="questionText" required />
        </div>

        <div class="form-group">
          <label for="question_image">🖼️ Image de la Question:</label>
          <input type="file" id="question_image" @change="onFileChange" />
          <div v-if="previewImage" class="image-preview">
            <img :src="previewImage" alt="Preview" />
          </div>
        </div>

        <transition-group name="fade" tag="div">
          <div v-for="(option, index) in options" :key="index" class="form-group option-group">
            <div class="option-header">
              <label :for="'option_text_' + index">🧩 Option {{ index + 1 }}</label>
              <button type="button" @click="removeOption(index)" class="btn-remove">X</button>
            </div>
            <input type="text" :id="'option_text_' + index" v-model="option.option_text" required />
            <label class="correct-label">
              <input type="checkbox" v-model="option.is_correct" />
              <span :class="{'badge-correct': option.is_correct}">Correct</span>
            </label>
          </div>
        </transition-group>

        <button type="button" @click="addOption" class="btn-add">➕ Ajouter une option</button>
        <button type="submit" class="btn-submit" :disabled="loading">
          <span v-if="loading">⏳ Création...</span>
          <span v-else>✅ Créer la question</span>
        </button>
      </form>

      <p v-if="successMessage" class="success">{{ successMessage }}</p>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const questionText = ref('');
const options = ref([{ option_text: '', is_correct: false }]);
const successMessage = ref('');
const errorMessage = ref('');
const image = ref(null);
const previewImage = ref(null);
const loading = ref(false);

const courses = ref([]);
const selectedCourseId = ref(null);
const tests = ref([]);

const onFileChange = (event) => {
  const file = event.target.files[0];
  image.value = file;
  previewImage.value = URL.createObjectURL(file);
};

const fetchCourses = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/coursTest');
    courses.value = response.data;
  } catch (error) {
    console.error('Failed to fetch courses:', error);
  }
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

  const formData = new FormData();
  formData.append('question_text', questionText.value);
  if (image.value) formData.append('image', image.value);

  options.value.forEach((option, index) => {
    formData.append(`options[${index}][option_text]`, option.option_text);
    formData.append(`options[${index}][is_correct]`, option.is_correct ? '1' : '0');
  });

  loading.value = true;
  try {
    const response = await axios.post(`http://localhost:8000/api/tests/${selectedCourseId.value}/questions`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    successMessage.value = '🎉 Question créée avec succès!';
    errorMessage.value = '';
    questionText.value = '';
    options.value = [{ option_text: '', is_correct: false }];
    image.value = null;
    previewImage.value = null;
  } catch (error) {
    errorMessage.value = "❌ Une erreur s'est produite lors de la création de la question.";
    successMessage.value = '';
  } finally {
    loading.value = false;
  }
};

onMounted(fetchCourses);

</script>

<style scoped>

.form-group{
  padding-top: 10%;
}
.create-question-container {
  max-width: 650px;
  margin: 50px auto;
  padding: 25px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.glass-effect {
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.image-preview img {
  max-width: 100%;
  margin-top: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.option-group {
  background-color: #f5f5f5;
  border-left: 5px solid #3498db;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 10px;
  transition: all 0.3s ease-in-out;
}

.option-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-remove {
  background-color: crimson;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.badge-correct {
  background-color: limegreen;
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  margin-left: 5px;
}

.btn-add, .btn-submit {
  margin-top: 15px;
  background-color: #2980b9;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-add:hover, .btn-submit:hover {
  background-color: #2471a3;
}

.success {
  color: green;
  font-weight: bold;
  margin-top: 15px;
}

.error {
  color: red;
  font-weight: bold;
  margin-top: 15px;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

</style>
