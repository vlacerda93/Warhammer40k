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

    function createSplinter() {
        if (!document.body.classList.contains('theme-drukhari')) return;
        if (document.querySelectorAll('.splinter-particle').length >= 20) return;

        const splinter = document.createElement('div');
        splinter.className = 'splinter-particle';
        
        // Random start position (either left or right side)
        const isFromLeft = Math.random() > 0.5;
        const startY = Math.random() * 100;
        
        splinter.style.top = startY + 'vh';
        splinter.style.left = isFromLeft ? '-5vw' : '105vw';
        
        // Direction and speed
        const duration = Math.random() * 0.5 + 0.3; // Very fast (0.3s to 0.8s)
        const angle = isFromLeft ? (Math.random() * 20 - 10) : (Math.random() * 20 + 170); // Shoot across
        
        splinter.style.transform = `rotate(${angle}deg)`;
        
        // Dark green / purple poison color
        const isPoison = Math.random() > 0.5;
        splinter.style.background = isPoison ? '#00ff44' : '#b000ff';
        splinter.style.boxShadow = `0 0 8px ${isPoison ? '#00ff44' : '#b000ff'}`;
        
        // Animation using CSS variables to pass distance
        splinter.style.setProperty('--travel-dist', isFromLeft ? '110vw' : '-110vw');
        splinter.style.animation = `shootSplinter ${duration}s linear forwards`;

        container.appendChild(splinter);
        splinter.addEventListener('animationend', () => splinter.remove());
    }

    // Geração dinâmica
    setInterval(createFeather, 700);
    setInterval(createSplinter, 200); // Tiros rápidos constantes
});
