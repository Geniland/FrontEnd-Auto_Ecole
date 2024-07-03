<template>
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Login</button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </form>

    <buttom><router-link to="/Authentification">Authentification</router-link></buttom>
      

    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'Login',
    data() {
      return {
        email: '',
        password: '',
        errorMessage: ''
      };
    },
    methods: {
      async login() {
        try {
          const response = await axios.post('http://localhost:8000/api/login', {
            email: this.email,
            password: this.password
          });
  
          const user = {
            token: response.data.access_token,
            role: response.data.role // Récupérer le rôle de la réponse de l'API
          };
  
          localStorage.setItem('user', JSON.stringify(user)); // Stocker l'utilisateur dans localStorage
          axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
  
          // Rediriger en fonction du rôle
          if (user.role === 'admin') {
            this.$router.push({ name: 'Entete' });
          } else if (user.role === 'user') {
            this.$router.push({ name: 'Home' });
          } else {
            // Redirection par défaut si le rôle n'est pas reconnu
            this.$router.push({ name: 'Dashboard' });
          }
        } catch (error) {
          this.errorMessage = 'Invalid login details';
        }
      }
    }
  };
  </script>
  
  <style scoped>
  router-link {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

  .login-container {
    max-width: 400px;
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
  
  input {
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
  
  .error {
    color: red;
  }
  </style>
