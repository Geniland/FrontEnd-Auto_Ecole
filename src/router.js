// src/router.js

import { createRouter, createWebHistory } from 'vue-router';
import CreateCours from '@/components/Cours.vue';
import Test from '@/components/Test.vue';
import Apropos from '@/components/Apropos.vue';
import CoursList from '@/components/CoursListe.vue';
import Questions from '@/components/Questions.vue';
import QCM from '@/components/QCM.vue';
import QuestionReponse from '@/components/ViewQuestionReponse.vue';
import MiseAjours from '@/components/MiseAjours.vue';
import Auto_Ecole from '@/components/Auto_Ecole.vue';
import Auto_Ecole_Test from '@/components/Auto_Ecole_Test.vue';
import QuestionReponseUtilisateur from '@/components/QuestionReponseUtilisateur.vue';
import TestSpecifique from '@/components/TestSpecifique.vue';
import Login from './components/ConnexionPage.vue';
import Home from './components/Home.vue';
import Authentification from './components/AuthPage.vue';
import Presentation from './components/PagePresentation.vue';
import CoursVideo from './components/CoursVideo.vue';
import ViewVideos from './components/CoursVideo.vue';
import CreateVideos from './components/createVideo.vue';


const routes = [

  { path: '/videos', component: ViewVideos },

  { path: '/CreateVideos', component: CreateVideos },

  

  {
    path: '/TestSpecifique/:coursId', name: 'TestSpecifique', component: TestSpecifique 
  },

  

  {
    path: '/CoursVideo',
    name: 'CoursVideo',
    component: CoursVideo
  },
   {
     path: '/Apropos',
     name: 'Apropos',
     component: Apropos
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
    component: Test, meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: '/Cours-List',
    name: 'CoursList',
    component: CoursList, meta: { requiresAuth: true, role: 'admin' }
  }
  ,
  {
    path: '/Create-Questions',
    name: 'Questions',
    component: Questions, meta: { requiresAuth: true, role: 'admin' }
  }
  ,
  {
    path: '/QCM',
    name: 'QCM',
    component: QCM, meta: { requiresAuth: true, role: 'admin' }
  }

  ,
  {
    path:  '/QuestionReponse/:id',
    name: 'QuestionReponse',
    component: QuestionReponse, meta: { requiresAuth: true, role: 'admin' }
  }
  ,
  {
    path: '/MiseAjours/:id',
    name: 'MiseAjours',
    component: MiseAjours , meta: { requiresAuth: true, role: 'admin' }
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

  { path: '/login', name: 'Login', component: Login },
  
  { path: '/', name: 'Presentation', component: Presentation },

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
