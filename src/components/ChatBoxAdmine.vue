<template>
  <div class="admin-chat">
    <h2>📩 Messages des utilisateurs</h2>
    
    <div class="user-list">
      <h3>👥 Utilisateurs</h3>
      <ul>
        <li v-for="user in users" 
            :key="user.id" 
            :class="{ active: selectedUser && selectedUser.id === user.id }"
            @click="selectUser(user)">
          {{ user.name }}
        </li>
      </ul>
    </div>

    <div v-if="selectedUser" class="chat-box">
      <h3>💬 Discussion avec {{ selectedUser.name }}</h3>
      <div class="messages">
        <div v-for="msg in messages" :key="msg.id">
          <p :class="{'sent': msg.sender_id === adminId, 'received': msg.sender_id !== adminId}">
            {{ msg.message }}
          </p>
        </div>
      </div>

      <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Écrire un message..." />
      <button @click="sendMessage">Envoyer</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: [], 
      selectedUser: null,
      messages: [],
      newMessage: '',
      adminId: null, 
    };
  },
  mounted() {
    this.initializeAxios();
    this.fetchUsers();
  },
  methods: {
    initializeAxios() {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser && storedUser.token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${storedUser.token}`;
        this.adminId = storedUser.id; // Récupère l'ID de l'admin connecté
      } else {
        console.error("❌ Aucun token trouvé !");
      }
    },

    async fetchUsers() {
      try {
        const { data } = await axios.get('http://localhost:8000/api/users');
        this.users = data;
      } catch (error) {
        console.error("❌ Erreur lors du chargement des utilisateurs :", error);
      }
    },

    async selectUser(user) {
      this.selectedUser = user;
      await this.fetchMessages(user.id);
    },

    async fetchMessages(receiverId) {
      try {
        const { data } = await axios.get(`http://localhost:8000/api/messages/${receiverId}`);
        this.messages = data;
      } catch (error) {
        console.error("❌ Erreur lors de la récupération des messages :", error);
      }
    },

    async sendMessage() {
      if (!this.newMessage.trim() || !this.selectedUser) return;

      try {
        const { data } = await axios.post('http://localhost:8000/api/messages', {
          message: this.newMessage,
          receiver_id: this.selectedUser.id
        });

        this.messages.push(data.message);
        this.newMessage = '';
      } catch (error) {
        console.error("❌ Erreur d'envoi :", error.response?.data || error);
      }
    }
  }
};
</script>

<style scoped>
.admin-chat {
  width: 600px;
  margin: auto;
  text-align: center;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
}

.user-list ul {
  list-style: none;
  padding: 0;
}

.user-list li {
  cursor: pointer;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  transition: background 0.3s;
}

.user-list li.active {
  background: #d1e7ff;
  font-weight: bold;
}

.chat-box {
  margin-top: 20px;
}

.messages {
  height: 200px;
  overflow-y: auto;
  border: 1px solid #ddd;
  padding: 10px;
  background: white;
}

.sent {
  text-align: right;
  color: blue;
}

.received {
  text-align: left;
  color: green;
}

input {
  width: calc(100% - 80px);
  padding: 8px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 8px 15px;
  margin-top: 10px;
  border: none;
  background: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: #0056b3;
}
</style>
