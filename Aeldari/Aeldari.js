document.addEventListener("DOMContentLoaded", () => {
    const container = document.createElement('div');
    container.id = 'aeldari-effects-container';
    document.body.appendChild(container);

    // Limitador de partículas (Aumentado para maior visibilidade)
    const MAX_FEATHERS = 25; 
    const MAX_SMOKE = 15; // Mais fumaça

    function createFeather() {
        if (!document.body.classList.contains('theme-asuryani')) return;
        if (document.querySelectorAll('.feather').length >= MAX_FEATHERS) return;

        const feather = document.createElement('div');
        feather.className = 'feather';
        
        const startX = Math.random() * 100;
        const drift = (Math.random() - 0.5) * 30; // Balanço mais amplo
        
        feather.style.left = startX + 'vw';
        feather.style.setProperty('--drift', drift + 'vw');
        feather.style.animationDuration = (Math.random() * 5 + 5) + 's';
        
        container.appendChild(feather);
        feather.addEventListener('animationend', () => feather.remove());
    }

    function createJumpscare() {
        if (!document.body.classList.contains('theme-drukhari')) return;
        if (document.querySelectorAll('.drukhari-jumpscare').length > 0) return;

        const skull = document.createElement('div');
        skull.className = 'drukhari-jumpscare';
        
        // Pode usar um emoji ou uma imagem de caveira assustadora
        skull.innerHTML = '💀';
        
        // Posição aleatória na tela
        const startX = Math.random() * 80 + 10;
        const startY = Math.random() * 80 + 10;
        
        skull.style.left = startX + 'vw';
        skull.style.top = startY + 'vh';
        
        container.appendChild(skull);
        
        // Remove após a animação
        skull.addEventListener('animationend', () => skull.remove());
    }

    // Geração dinâmica
    setInterval(createFeather, 700);
    // Jumpscare não pode ser tão frequente, senão fica chato. Vamos pôr a cada 4 a 8 segundos aleatoriamente
    setInterval(() => {
        if (Math.random() > 0.5) createJumpscare();
    }, 4000);
});
