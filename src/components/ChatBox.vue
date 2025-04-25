<template>
  <div class="messaging-layout">
    <!-- Liste des conversations -->
    <div class="conversations-list">
      <h3>📨 Conversations</h3>
      <ul>
        <li
          v-for="user in users"
          :key="user.id"
          :class="{ active: selectedReceiverId === user.id }"
          @click="selectUser(user.id)"
        >
          {{ user.name }}
        </li>
      </ul>
    </div>

    <!-- Fenêtre de chat -->
    <div class="chat-box" v-if="selectedUser">
      <h3 class="chat-header">💬 {{ selectedUser.name }}</h3>

      <div class="messages">
        <div
          v-for="msg in messages"
          :key="msg.id"
          class="message-container"
          :class="{ sent: msg.sender_id === adminId, received: msg.sender_id !== adminId }"
        >
          <small v-if="msg.sender_id !== adminId" class="sender-name">{{ selectedUser.name }}</small>
          <p class="message-bubble">{{ msg.message }}</p>
        </div>
      </div>

      <div class="input-area">
        <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Écrire un message..." />
        <button @click="sendMessage">Envoyer</button>
      </div>
    </div>
  </div>
</template>

<script>
import Echo from 'laravel-echo';
import axios from 'axios';

export default {
  data() {
    return {
      users: [],
      messages: [],
      newMessage: '',
      selectedReceiverId: '',
      adminId: null,
      channel: null,
    };
  },
  computed: {
    selectedUser() {
      return this.users.find(user => user.id === this.selectedReceiverId) || null;
    }
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
        this.adminId = storedUser.id;
      } else {
        console.error("❌ Aucun token trouvé !");
      }
    },

    async fetchUsers() {
      try {
        const { data } = await axios.get('http://localhost:8000/api/userChat');
        this.users = data;
      } catch (error) {
        console.error("❌ Erreur lors du chargement des utilisateurs :", error);
      }
    },

    async fetchMessages() {
      if (!this.selectedReceiverId) return;
      try {
        const { data } = await axios.get(`http://localhost:8000/api/messages/${this.selectedReceiverId}`);
        this.messages = data;
      } catch (error) {
        console.error("❌ Erreur lors de la récupération des messages :", error);
      }
    },

    async sendMessage() {
      if (!this.selectedReceiverId || !this.newMessage.trim()) return;
      try {
        const { data } = await axios.post('http://localhost:8000/api/messages', {
          message: this.newMessage,
          receiver_id: this.selectedReceiverId,
        });

        this.messages.push(data.message);
        this.newMessage = '';
      } catch (error) {
        console.error("❌ Erreur d'envoi :", error.response?.data || error);
      }
    },

    selectUser(id) {
      this.selectedReceiverId = id;
      this.fetchMessages();
      this.listenForNewMessages();
    },

    listenForNewMessages() {
      if (!this.selectedReceiverId) return;

      if (this.channel) {
        this.channel.stopListening('MessageSent');
      }

      this.channel = Echo.private(`chat.${this.selectedReceiverId}`)
        .listen('MessageSent', (event) => {
          this.messages.push(event.message);
        });
    }
  },
  watch: {
    messages() {
      this.$nextTick(() => {
        const container = this.$el.querySelector('.messages');
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    }
  }
};
</script>

<style scoped>
.messaging-layout {
  display: flex;
  height: 90vh;
  max-width: 1000px;
  margin: auto;
  background: #f2f2f2;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

/* LISTE DES CONVERSATIONS */
.conversations-list {
  width: 30%;
  background: #ffffff;
  border-right: 1px solid #ddd;
  padding: 20px;
  overflow-y: auto;
}

.conversations-list h3 {
  margin-bottom: 15px;
  color: #333;
}

.conversations-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.conversations-list li {
  padding: 10px 15px;
  margin-bottom: 10px;
  cursor: pointer;
  border-radius: 8px;
  background: #f8f8f8;
  transition: background 0.3s;
}

.conversations-list li:hover,
.conversations-list li.active {
  background: #007bff;
  color: white;
}

/* FENÊTRE DE CHAT */
.chat-box {
  width: 70%;
  display: flex;
  flex-direction: column;
  background: white;
}

.chat-header {
  background: #007bff;
  color: white;
  padding: 15px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 15px;
  display: flex;
  flex-direction: column;
}

.message-container {
  display: flex;
  margin: 5px 0;
  max-width: 75%;
}

.sent {
  align-self: flex-end;
  animation: slideInRight 0.3s ease-out;
}

.received {
  align-self: flex-start;
  animation: slideInLeft 0.3s ease-out;
}

.message-bubble {
  background: #ececec;
  padding: 12px 15px;
  border-radius: 25px;
  font-size: 14px;
  word-break: break-word;
  line-height: 1.4;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.sent .message-bubble {
  background: #dcf8c6;
}

.sender-name {
  font-size: 11px;
  color: #777;
  margin-bottom: 3px;
}

.input-area {
  display: flex;
  padding: 10px;
  border-top: 1px solid #ddd;
}

.input-area input {
  flex: 1;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #ccc;
  font-size: 14px;
}

.input-area button {
  margin-left: 10px;
  padding: 10px 15px;
  border: none;
  border-radius: 20px;
  background: #007bff;
  color: white;
  cursor: pointer;
}

.input-area button:hover {
  background: #0056b3;
}

/* Animations */
@keyframes slideInLeft {
  from {
    transform: translateX(-30px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideInRight {
  from {
    transform: translateX(30px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
