import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, push, onValue, set, get, child } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAQybI6CkLgTKWjePtl9brADqgT6wvXe_w",
  authDomain: "warhammer-vox.firebaseapp.com",
  databaseURL: "https://warhammer-vox-default-rtdb.firebaseio.com",
  projectId: "warhammer-vox",
  storageBucket: "warhammer-vox.firebasestorage.app",
  messagingSenderId: "195415547013",
  appId: "1:195415547013:web:2134b7721218c1953e9dec",
  measurementId: "G-LKED38YVTP"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

document.addEventListener('DOMContentLoaded', () => {
    const loginSection = document.getElementById('login-section');
    const chatSection = document.getElementById('chat-section');
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginError = document.getElementById('login-error');
    
    const currentUserDisplay = document.getElementById('current-user-display');
    const logoutBtn = document.getElementById('logout-btn');
    
    const chatMessages = document.getElementById('chat-messages');
    const chatForm = document.getElementById('chat-form');
    const messageInput = document.getElementById('message-input');

    let currentUser = localStorage.getItem('wh40k_currentUser');

    const usersRef = ref(db, 'users');
    const messagesRef = ref(db, 'messages');

    function renderMessage(msg) {
        const msgEl = document.createElement('div');
        
        if (msg.type === 'system') {
            msgEl.className = 'message system';
            msgEl.innerHTML = `<span class="msg-text">${msg.text}</span>`;
        } else {
            const isSelf = msg.author === currentUser;
            msgEl.className = `message ${isSelf ? 'self' : 'other'}`;
            msgEl.innerHTML = `
                <span class="msg-author">${msg.author}</span>
                <span class="msg-text">${msg.text}</span>
                <span class="msg-time">${msg.time}</span>
            `;
        }
        
        chatMessages.appendChild(msgEl);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function checkLoginStatus() {
        if (currentUser) {
            loginSection.classList.add('hidden');
            chatSection.classList.remove('hidden');
            currentUserDisplay.textContent = `Identidade Confirmada: ${currentUser}`;
            
            // Listen to real-time messages from Firebase
            onValue(messagesRef, (snapshot) => {
                chatMessages.innerHTML = ''; // Limpa antes de renderizar
                const data = snapshot.val();
                if (data) {
                    const msgsArray = Object.values(data);
                    msgsArray.forEach(msg => renderMessage(msg));
                }
            });
        } else {
            loginSection.classList.remove('hidden');
            chatSection.classList.add('hidden');
        }
    }

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const user = usernameInput.value.trim();
        const pass = passwordInput.value.trim();

        if (user && pass) {
            // Evita caracteres inválidos no Firebase path
            const safeUser = user.replace(/[.#$[\]]/g, '_');
            const userRef = child(usersRef, safeUser);
            const snapshot = await get(userRef);
            
            if (snapshot.exists()) {
                const dbPass = snapshot.val().password;
                if (dbPass !== pass) {
                    loginError.textContent = 'Código de autorização inválido. A Inquisição foi alertada.';
                    return;
                }
            } else {
                // Cadastra novo usuário
                await set(userRef, { password: pass });
            }

            // Login com sucesso
            loginError.textContent = '';
            currentUser = safeUser;
            localStorage.setItem('wh40k_currentUser', currentUser);
            
            push(messagesRef, {
                type: 'system',
                text: `O usuário [${currentUser}] adentrou a rede Vox.`,
                time: new Date().toLocaleTimeString()
            });

            usernameInput.value = '';
            passwordInput.value = '';
            checkLoginStatus();
        }
    });

    logoutBtn.addEventListener('click', () => {
        if (currentUser) {
            push(messagesRef, {
                type: 'system',
                text: `O usuário [${currentUser}] encerrou sua transmissão.`,
                time: new Date().toLocaleTimeString()
            });
        }
        
        currentUser = null;
        localStorage.removeItem('wh40k_currentUser');
        checkLoginStatus();
        window.location.reload(); // Recarrega para limpar as conexões do Firebase
    });

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = messageInput.value.trim();
        if (text) {
            push(messagesRef, {
                type: 'user',
                author: currentUser,
                text: text,
                time: new Date().toLocaleTimeString()
            });
            messageInput.value = '';
        }
    });

    // Ao iniciar
    checkLoginStatus();
});
