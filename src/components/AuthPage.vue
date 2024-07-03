<template>
    <div class="register-container">
      <h2>Inscription</h2>
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="name">Nom</label>
          <input type="text" id="name" v-model="name" required />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <div class="form-group">
          <label for="role">Rôle</label>
          <select id="role" v-model="role" required>
            <option value="user">Utilisateur</option>
            <option value="admin">Administrateur</option>
          </select>
        </div>
        <button type="submit">S'inscrire</button>
      </form>
      
        <router-link to="/">Connexion</router-link>
      
      <div v-if="error" class="error">{{ error }}</div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'Register',
    setup() {
      const router = useRouter();
      const name = ref('');
      const email = ref('');
      const password = ref('');
      const role = ref('user');
      const error = ref(null);
  
      const register = async () => {
        error.value = null;
        try {
          const response = await axios.post('http://localhost:8000/api/register', {
            name: name.value,
            email: email.value,
            password: password.value,
            role: role.value,
          });
          console.log('User registered:', response.data);
  
          // Redirection en fonction du rôle
          if (role.value === 'admin') {
            router.push({ name: 'Entete' }); // Rediriger vers la page Entete
          } else {
            router.push({ name: 'Home' }); // Rediriger vers la page Home
          }
        } catch (err) {
          console.error('Registration error:', err);
          error.value = 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.';
        }
      };
  
      return {
        name,
        email,
        password,
        role,
        register,
        error,
      };
    },
  };
  </script>
  
  <style scoped>
  .register-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    background-color: #f4f4f9;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .register-container h2 {
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
    text-align: left;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
  }
  
  .form-group input,
  .form-group select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #3498db;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-size: 1em;
    font-weight: bold;
  }
  
  button:hover {
    background-color: #2980b9;
  }
  
  .error {
    margin-top: 20px;
    color: red;
  }
  </style>
  