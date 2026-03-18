/**
 * AELDARI EFFECTS SYSTEM
 * Divino (Asuryani) & Profano (Drukhari)
 */

document.addEventListener("DOMContentLoaded", () => {
    const container = document.createElement('div');
    container.id = 'aeldari-effects-overlay';
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

    function createSmoke() {
        if (!document.body.classList.contains('theme-drukhari')) return;
        if (document.querySelectorAll('.smoke-particle').length >= MAX_SMOKE) return;

        const smoke = document.createElement('div');
        smoke.className = 'smoke-particle';
        
        const startX = Math.random() * 100;
        smoke.style.left = startX + 'vw';
        smoke.style.animationDuration = (Math.random() * 6 + 6) + 's';
        
        // CORES MAIS ESCURAS E PROFUNDAS (Drukhari Dark Style)
        const isGreen = Math.random() > 0.5;
        smoke.style.background = isGreen 
            ? 'radial-gradient(circle, rgba(0, 50, 20, 0.8) 0%, rgba(0, 20, 5, 0.4) 60%, transparent 85%)' 
            : 'radial-gradient(circle, rgba(30, 0, 50, 0.8) 0%, rgba(10, 0, 20, 0.4) 60%, transparent 85%)';

        container.appendChild(smoke);
        smoke.addEventListener('animationend', () => smoke.remove());
    }

    // Geração dinâmica
    setInterval(createFeather, 700);
    setInterval(createSmoke, 800); // Mais rápido!
});
