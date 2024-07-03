<template>
    <div id="app">
      <header class="header">
        <h1>Auto-Ecole</h1>
        <nav>
          <ul class="nav-links">
           
            <li><router-link to="/Apopos">À propos</router-link></li>
            <li><router-link to="/create-cours">Création de Cours</router-link></li>
            <li><router-link to="/test-cours">Création de Textes</router-link></li>
            <li><router-link to="/Create-Questions">Création de Questions</router-link></li>


            <li><router-link to="/Cours-List">Liste des cours</router-link></li> 
            <li><router-link to="/QCM">Passer un text</router-link></li>

            <li><router-link to="/Simulation">Simulation de conduite</router-link></li>
            
            
            
            
          
          </ul>
        </nav>
        
      </header>
      
    </div>
  </template>
  
  <script>
  export default {
    name: 'App',
    methods: {
        logout() {
            localStorage.removeItem('user');
            axios.defaults.headers.common['Authorization'] = '';
            this.$router.push({ name: 'Login' });
        }
    }
  }
  </script>
  
  <style scoped>



.user-container {
    text-align: center;
    margin: 50px;
}

.user-container button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.user-container button:hover {
    background-color: #0056b3;
}





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
  </style>
  