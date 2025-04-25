<template>
  <div class="login-wrapper">
    <div class="login-container">
      <h2>Inscription</h2>
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="name">Nom :</label>
          <div class="input-group">
            <i class="fa fa-user"></i>
            <input
              type="text"
              id="name"
              v-model="name"
              placeholder="Entrez votre nom"
              required
              @focus="addFocus('name')"
              @blur="removeFocus('name')"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="email">Email :</label>
          <div class="input-group">
            <i class="fa fa-envelope"></i>
            <input
              type="email"
              id="email"
              v-model="email"
              placeholder="Entrez votre email"
              required
              @focus="addFocus('email')"
              @blur="removeFocus('email')"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="password">Mot de passe :</label>
          <div class="input-group">
            <i class="fa fa-lock"></i>
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="Entrez votre mot de passe"
              required
              @focus="addFocus('password')"
              @blur="removeFocus('password')"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="secret_code">Code administrateur (facultatif) :</label>
          <div class="input-group">
            <i class="fa fa-key"></i>
            <input
              type="password"
              id="secret_code"
              v-model="secret_code"
              placeholder="Laisser vide si utilisateur"
              @focus="addFocus('secret_code')"
              @blur="removeFocus('secret_code')"
            />
          </div>
        </div>

        <button type="submit">S'inscrire</button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>

      <div class="navigation-buttons">
        <router-link to="/login">
          <button class="auth-button">Connexion</button>
        </router-link>
        <router-link to="/">
          <button class="home-button">Accueil</button>
        </router-link>
      </div>
    </div>
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
    const secret_code = ref('');
    const error = ref(null);

    const addFocus = (field) => {
      document.getElementById(field)?.classList.add('focused');
    };

    const removeFocus = (field) => {
      document.getElementById(field)?.classList.remove('focused');
    };

    const register = async () => {
      error.value = null;
      try {
        const response = await axios.post('http://localhost:8000/api/register', {
          name: name.value,
          email: email.value,
          password: password.value,
          secret_code: secret_code.value,
        });

        const user = {
          token: response.data.access_token,
          role: response.data.role,
        };

        localStorage.setItem('user', JSON.stringify(user));
        axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

        if (user.role === 'admin') {
          router.push({ name: 'Apropos' });
        } else if (user.role === 'user') {
          router.push({ name: 'Home' });
        } else {
          router.push({ name: 'Dashboard' });
        }

      } catch (err) {
        console.error('Erreur inscription :', err);
        error.value = "Une erreur est survenue lors de l'inscription. Veuillez réessayer.";
      }
    };

    return {
      name,
      email,
      password,
      secret_code,
      error,
      register,
      addFocus,
      removeFocus,
    };
  }
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');

:root {
  --primary: #4facfe;
  --secondary: #00f2fe;
  --text: #ffffff;
  --input-bg: rgba(255, 255, 255, 0.15);
  --glass-bg: rgba(255, 255, 255, 0.05);
  --border: rgba(255, 255, 255, 0.3);
  --error: #e74c3c;
}

.login-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to right, #43cea2, #185a9d);
  height: 100vh;
  padding: 20px;
}

.login-container {
  width: 100%;
  max-width: 400px;
  padding: 40px;
  background: var(--glass-bg);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid var(--border);
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  animation: fadeIn 0.8s ease-in-out;
  color: var(--text);
}

h2 {
  text-align: center;
  font-size: 2em;
  margin-bottom: 30px;
  letter-spacing: 1px;
}

.form-group {
  margin-bottom: 20px;
}

.input-group {
  position: relative;
}

.input-group i {
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  color: white;
  opacity: 0.6;
}

input {
  width: 100%;
  padding: 12px 15px 12px 40px;
  border: none;
  border-radius: 10px;
  background: var(--input-bg);
  color: white;
  font-size: 1em;
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 0 2px var(--secondary);
}

input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

button {
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 10px;
  font-size: 1.1em;
  font-weight: bold;
  background: linear-gradient(to right, var(--primary), var(--secondary));
  color: white;
  margin-top: 10px;
  cursor: pointer;
  transition: 0.3s ease;
}

button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 242, 254, 0.4);
}

.error {
  color: var(--error);
  margin-top: 15px;
  text-align: center;
  font-weight: bold;
}

.navigation-buttons {
  margin-top: 25px;
  display: flex;
  gap: 10px;
}

.navigation-buttons button {
  flex: 1;
  padding: 12px;
  border-radius: 10px;
  font-size: 1em;
  border: none;
  color: white;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.15);
  transition: background 0.3s ease, transform 0.3s ease;
}

.navigation-buttons button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
}

.auth-button {
  background-color: rgba(26, 188, 156, 0.7);
}

.home-button {
  background-color: rgba(52, 152, 219, 0.7);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@media (max-width: 500px) {
  .login-container {
    padding: 25px;
  }

  h2 {
    font-size: 1.6em;
  }

  .navigation-buttons {
    flex-direction: column;
  }
}
</style>
