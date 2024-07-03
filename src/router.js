// src/router.js

import { createRouter, createWebHistory } from 'vue-router';
import CreateCours from '@/components/Cours.vue';
import Test from '@/components/Test.vue';
import CoursList from '@/components/CoursListe.vue';
import Questions from '@/components/Questions.vue';
import QCM from '@/components/QCM.vue';
import QuestionReponse from '@/components/ViewQuestionReponse.vue';
import MiseAjours from '@/components/MiseAjours.vue';
import Auto_Ecole from '@/components/Auto_Ecole.vue';
import Auto_Ecole_Test from '@/components/Auto_Ecole_Test.vue';
import QuestionReponseUtilisateur from '@/components/QuestionReponseUtilisateur.vue';
import Entete from './components/Entete.vue';
import Login from './components/ConnexionPage.vue';
import Home from './components/Home.vue';
import Authentification from './components/AuthPage.vue';



const routes = [
  // {
  //   path: '/create-cours',
  //   name: 'CreateCours',
  //   component: CreateCours
  // },
   {
     path: '/Entete',
     name: 'Entete',
     component: Entete
   },
   ,
   {
     path: '/Authentification',
     name: 'Authentification',
     component: Authentification
   },
   {
    path: '/Home',
    name: 'Home',
    component: Home
  },
  {
    path: '/test-cours',
    name: 'Test',
    component: Test
  },
  {
    path: '/Cours-List',
    name: 'CoursList',
    component: CoursList
  }
  ,
  {
    path: '/Create-Questions',
    name: 'Questions',
    component: Questions
  }
  ,
  {
    path: '/QCM',
    name: 'QCM',
    component: QCM
  }

  ,
  {
    path:  '/QuestionReponse/:id',
    name: 'QuestionReponse',
    component: QuestionReponse
  }
  ,
  {
    path: '/MiseAjours/:id',
    name: 'MiseAjours',
    component: MiseAjours
  }
  ,
  {
    path: '/Auto_Ecole',
    name: 'Auto_Ecole',
    component: Auto_Ecole
  }
  ,
  {
    path: '/Auto_Ecole_Test',
    name: 'Auto_Ecole_Test',
    component: Auto_Ecole_Test
  }
  ,
  {
    path: '/QuestionReponseUtilisateur/:id',
    name: 'QuestionReponseUtilisateur',
    component: QuestionReponseUtilisateur
  },

  { path: '/', name: 'Login', component: Login },
  { path: '/create-cours', name: 'CreateCourse', component: CreateCours, meta: { requiresAuth: true, role: 'admin' } },

 
  // Ajoutez d'autres routes ici si nécessaire
];





const router = createRouter({
    history: createWebHistory(),
    routes,
  });


  router.beforeEach((to, from, next) => {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!user) {
        next({ name: 'Login' });
      } else {
        if (to.matched.some(record => record.meta.role && record.meta.role !== user.role)) {
          next({ name: 'Entete' });
        } else {
          next();
        }
      }
    } else {
      next();
    }
  });

export default router;
