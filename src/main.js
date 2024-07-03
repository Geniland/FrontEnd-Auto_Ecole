// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';

const app = createApp(App);

const user = JSON.parse(localStorage.getItem('user'));
if (user && user.token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
}

app.use(router);
app.mount('#app');


// createApp(App).use(router).mount('#app')
