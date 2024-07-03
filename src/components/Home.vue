<template>
    <header class="header">
      <h1>Auto-Ecole</h1>
      <nav>
        <ul class="nav-links">
          <li><router-link to="/Home">À propos</router-link></li>
          <li><router-link to="/Auto_Ecole">Liste des cours</router-link></li> 
          <li><router-link to="/Auto_Ecole_Test">Passer un test</router-link></li>
          <li><router-link to="/Simulation">Simulation de conduite</router-link></li>
          <li>
            <div class="user-info">
              Welcome, User
              <button @click="logout">Logout</button>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  
    <div class="intro-text">
      <p>Bienvenue dans l'application de notre auto-école, votre compagnon de confiance pour apprendre à conduire en toute sécurité. Que vous soyez débutant ou que vous cherchiez à perfectionner vos compétences, notre plateforme vous offre des cours interactifs, des tests pratiques et des simulations de conduite pour vous préparer efficacement à obtenir votre permis. Explorez nos ressources, suivez votre progression et commencez votre voyage vers la liberté de conduire en toute autonomie.</p>
    </div>
  </template>
  
  <script setup>

    const logout = () => {
    localStorage.removeItem('user');
    axios.defaults.headers.common['Authorization'] = '';
    router.push({ name: 'Login' });
    };
  
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
  
  .intro-text {
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    font-size: 1.1em;
    color: #333;
    line-height: 1.6;
  }
  
  .intro-text p {
    margin: 0;
    padding: 10px 0;
  }
  
  </style>
  