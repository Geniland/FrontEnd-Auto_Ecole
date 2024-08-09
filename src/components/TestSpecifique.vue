<template>
    <div id="app">
      <Entete/>
      <div class="tests-container">
        <h2>Liste des tests</h2>
        <div class="cours-list-container"> 
          <div  class="cours-cards">
            <h3 @click="goToViewQuestionReponse(testsListid)">{{ testsList }}</h3>
          </div>
        </div>
      </div>
    </div>
</template>
  
  <script setup>
  import Entete from '@/components/EnteteAcceuil.vue';
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  
  const testsList = ref([]);
  const testsListid = ref('');
  const route = useRoute();
  const router = useRouter();
  
  const fetchCourseTests = async () => {
    const coursId = route.params.coursId;
    try {
      const response = await axios.get(`http://localhost:8000/api/test/${coursId}`);
      testsList.value = response.data.title; // Assuming the API returns a course with a `tests` array
      testsListid.value = response.data.id; // Assuming the API returns a course with a `tests` array
      console.log(testsList.value);
    } catch (error) {
      console.error('Failed to fetch course tests:', error);
    }
  };
  
  const goToViewQuestionReponse = (testId) => {
    router.push({ name: 'QuestionReponseUtilisateur', params: { id : testId } });
  };
  
  onMounted(fetchCourseTests);
  </script>
  
  <style scoped>
  .tests-container {
    text-align: center;
  }
  
  .cours-list-container {
    max-width: 1200px;
    margin: 50px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .cours-cards {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding: 20px;
    background-color: #fff;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
    margin-bottom: 20px;
  }
  
  .cours-cards h3 {
    margin-top: 0;
    font-size: 1.5em;
    color: #333;
  }
  
  .cours-cards:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  </style>
  