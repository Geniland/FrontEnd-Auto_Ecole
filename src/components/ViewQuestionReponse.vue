<template>
  <div id="app">
    
    <div class="questions-container">
      <h2>Questionnaires</h2>
      <!-- <h2>Questions pour le cours {{ coursId }}</h2> -->
      <div v-if="questions.length > 0">
        <div v-for="question in questions" :key="question.id" class="question-card">
          <h3>{{ question.question_text }}</h3>
          <!-- Affichage de l'image si elle existe -->
          <div class="image-and-options">
            <img v-if="question.image_url" :src="question.image_url" alt="Image de la question" class="question-image" />
            <ul>
              <li v-for="answer in question.options" :key="answer.id">
                <label>
                  <input type="radio" :name="'question-' + question.id" :value="answer.id" v-model="userAnswers[question.id]" />
                  {{ answer.option_text }}
                </label>
              </li>
            </ul>
          </div>
          <button @click="deleteQuestion(question.id)" class="delete-btn">Supprimer la question</button>
        </div>
        <button @click="submitAnswers" class="submit-btn">Soumettre les réponses</button>
        <div v-if="results !== null" class="results">
          <h3>Résultats</h3>
          <ul>
            <li v-for="(isCorrect, questionId) in results" :key="questionId">
               <span :class="{'correct': isCorrect, 'incorrect': !isCorrect}">{{ isCorrect ? 'Correct' : 'Incorrect' }}</span>
              <!-- Question {{ questionId }}: <span :class="{'correct': isCorrect, 'incorrect': !isCorrect}">{{ isCorrect ? 'Correct' : 'Incorrect' }}</span> -->
            </li>
          </ul>
        </div>
      </div>
      <div v-else>
        <p>Aucune question disponible pour ce cours.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import Entete from '@/components/Entete.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const coursId = ref(route.params.id);
const questions = ref([]);
const userAnswers = ref({});
const results = ref(null);

const fetchQuestions = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/api/tests/${coursId.value}/questions`);
    questions.value = response.data.map(question => ({
      ...question,
      image_url: question.image ? `http://localhost:8000/storage/${question.image}` : null
    }));
  } catch (error) {
    console.error('Failed to fetch questions:', error);
  }
};

const submitAnswers = async () => {
  try {
    const response = await axios.post('http://localhost:8000/api/submit-answers', {
      answers: userAnswers.value,
    });
    results.value = response.data;
  } catch (error) {
    console.error('Failed to submit answers:', error);
  }
};

const deleteQuestion = async (questionId) => {
  try {
    await axios.delete(`http://localhost:8000/api/tests/${coursId.value}/questions/${questionId}`);
    fetchQuestions(); // Refresh questions list
  } catch (error) {
    console.error('Failed to delete question:', error);
  }
};

const deleteAnswer = async (questionId, answerId) => {
  try {
    await axios.delete(`http://localhost:8000/api/questions/${questionId}/options/${answerId}`);
    fetchQuestions(); // Refresh questions list
  } catch (error) {
    console.error('Failed to delete answer:', error);
  }
};

onMounted(fetchQuestions);
</script>

<style scoped>
/* Style pour l'image des questions */
.question-image {
  width: 100%; /* Occupe toute la largeur du conteneur */
  max-width: 400px; /* Largeur maximale de l'image */
  height: auto; /* Hauteur automatique pour maintenir le ratio d'aspect */
  object-fit: cover; /* Maintient le ratio d'aspect et couvre le conteneur */
  border-radius: 8px; /* Coins arrondis */
  margin-top: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Conteneur pour l'image et les options */
.image-and-options {
  display: flex;
  flex-direction: column;
  align-items: center; /* Centre horizontalement les éléments */
}

/* Style du conteneur principal */
.questions-container {
  max-width: 900px;
  margin: 50px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  font-family: 'Helvetica Neue', sans-serif;
  text-align: center;
}

.questions-container h2 {
  font-size: 2.2em;
  color: #333;
  margin-bottom: 20px;
  font-weight: 600;
}

/* Style des cartes de question */
.question-card {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.question-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.question-card h3 {
  font-size: 1.6em;
  color: #444;
  margin-bottom: 15px;
  font-weight: 500;
}

/* Style des listes de réponses */
.question-card ul {
  list-style-type: none;
  padding: 0;
  text-align: left;
  margin-top: 15px;
}

.question-card li {
  margin-bottom: 12px;
}

.question-card label {
  display: flex;
  align-items: center;
  font-size: 1.2em;
  color: #555;
}

.question-card input[type="radio"] {
  margin-right: 10px;
}

/* Style des boutons */
button {
  padding: 14px 30px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  font-size: 1.1em;
  font-weight: bold;
}

button:hover {
  background-color: #0056b3;
  transform: translateY(-3px);
}

button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
}

/* Styles spécifiques pour les boutons de suppression et de soumission */
.delete-btn {
  background-color: #dc3545;
}

.delete-btn:hover {
  background-color: #c82333;
}

.submit-btn {
  background-color: #28a745;
}

.submit-btn:hover {
  background-color: #218838;
}

/* Style des résultats */
.results {
  margin-top: 20px;
  font-size: 1.3em;
}

.correct {
  color: #28a745;
}

.incorrect {
  color: #dc3545;
}
</style>
