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

    // Inicializa banco de dados fraco (localStorage)
    let usersDB = JSON.parse(localStorage.getItem('wh40k_users')) || {};
    let messagesDB = JSON.parse(localStorage.getItem('wh40k_messages')) || [
        { type: 'system', text: 'Conexão Astropática Estabelecida. Bem-vindo ao Canal Vox.', time: new Date().toLocaleTimeString() }
    ];
    let currentUser = localStorage.getItem('wh40k_currentUser');

    function renderMessages() {
        chatMessages.innerHTML = '';
        messagesDB.forEach(msg => {
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
        });
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function checkLoginStatus() {
        if (currentUser) {
            loginSection.classList.add('hidden');
            chatSection.classList.remove('hidden');
            currentUserDisplay.textContent = `Identidade Confirmada: ${currentUser}`;
            renderMessages();
        } else {
            loginSection.classList.remove('hidden');
            chatSection.classList.add('hidden');
        }
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const user = usernameInput.value.trim();
        const pass = passwordInput.value.trim();

        if (user && pass) {
            // Se o usuário não existe, a gente cadastra. Se existe, checa a senha.
            if (!usersDB[user]) {
                usersDB[user] = pass;
                localStorage.setItem('wh40k_users', JSON.stringify(usersDB));
            } else if (usersDB[user] !== pass) {
                loginError.textContent = 'Código de autorização inválido. A Inquisição foi alertada.';
                return;
            }

            // Login com sucesso
            loginError.textContent = '';
            currentUser = user;
            localStorage.setItem('wh40k_currentUser', currentUser);
            
            // Adiciona mensagem de sistema sobre entrada
            messagesDB.push({
                type: 'system',
                text: `O usuário [${currentUser}] adentrou a rede Vox.`,
                time: new Date().toLocaleTimeString()
            });
            localStorage.setItem('wh40k_messages', JSON.stringify(messagesDB));

            usernameInput.value = '';
            passwordInput.value = '';
            checkLoginStatus();
        }
    });

    logoutBtn.addEventListener('click', () => {
        messagesDB.push({
            type: 'system',
            text: `O usuário [${currentUser}] encerrou sua transmissão.`,
            time: new Date().toLocaleTimeString()
        });
        localStorage.setItem('wh40k_messages', JSON.stringify(messagesDB));
        
        currentUser = null;
        localStorage.removeItem('wh40k_currentUser');
        checkLoginStatus();
    });

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = messageInput.value.trim();
        if (text) {
            messagesDB.push({
                type: 'user',
                author: currentUser,
                text: text,
                time: new Date().toLocaleTimeString()
            });
            localStorage.setItem('wh40k_messages', JSON.stringify(messagesDB));
            messageInput.value = '';
            renderMessages();
        }
    });

    // Check status on load
    checkLoginStatus();
    
    // Atualiza a cada 2 segundos para ver mensagens de outras abas (opcional)
    setInterval(() => {
        if (currentUser) {
            const newMsgs = JSON.parse(localStorage.getItem('wh40k_messages')) || [];
            if (newMsgs.length !== messagesDB.length) {
                messagesDB = newMsgs;
                renderMessages();
            }
        }
    }, 2000);
});
