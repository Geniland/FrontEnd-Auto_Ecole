<template>

<div id="app">
    <Entete/>
    <!-- <router-view /> -->
  </div>


    <div class="questions-container">
     
      <h2>Questions pour le cours {{ coursId }}</h2>
      <div v-if="questions.length > 0">
        <div v-for="question in questions" :key="question.id" class="question-card">
          <h3>{{ question.question_text }}</h3>
          
          <ul>
            <li v-for="answer in question.options" :key="answer.id">
              <label>
                <input type="radio" :name="'question-' + question.id" :value="answer.id" v-model="userAnswers[question.id]" />
                {{ answer.option_text }}
              </label>
              <!-- <button @click="deleteAnswer(question.id, answer.id)">Supprimer</button> -->
            </li>
          </ul>
        </div>
        <button @click="submitAnswers">Soumettre les réponses</button>
        <div v-if="results !== null">
          <h3>Résultats</h3>
          <ul>
            <li v-for="(isCorrect, questionId) in results" :key="questionId">
              Question {{ questionId }}: <span :class="{'correct': isCorrect, 'incorrect': !isCorrect}">{{ isCorrect ? 'Correct' : 'Incorrect' }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div v-else>
        <p>Aucune question disponible pour ce cours.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import Entete from '@/components/EnteteAcceuil.vue';
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
      questions.value = response.data;
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




  .questions-container {
    max-width: 800px;
    margin: 50px auto;
    padding: 30px;
    background-color: #f4f4f9;
    border-radius: 15px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    text-align: center;
    font-family: 'Arial', sans-serif;
  }
  
  .questions-container h2 {
    font-size: 2em;
    color: #333;
    margin-bottom: 20px;
  }
  
  .question-card {
    margin-bottom: 30px;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .question-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  
  .question-card h3 {
    font-size: 1.5em;
    color: #555;
    margin-bottom: 15px;
  }
  
  .question-card ul {
    list-style-type: none;
    padding: 0;
    text-align: left;
  }
  
  .question-card li {
    margin-bottom: 10px;
  }
  
  .question-card label {
    display: flex;
    align-items: center;
    font-size: 1.1em;
    color: #666;
  }
  
  .question-card input[type="radio"] {
    margin-right: 10px;
  }
  
  button {
    padding: 12px 25px;
    background-color: #3498db;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
    font-size: 1.1em;
    font-weight: bold;
  }
  
  button:hover {
    background-color: #2980b9;
    transform: translateY(-3px);
  }
  
  button:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.5);
  }
  
  .results {
    margin-top: 20px;
    font-size: 1.2em;
  }
  
  .correct {
    color: green;
  }
  
  .incorrect {
    color: red;
  }
  </style>
  