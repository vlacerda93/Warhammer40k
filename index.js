// ====================================
// CONTROLE DE PÁGINAS DAS FACÇÕES
// ====================================
let currentPage = 0;
const totalPages = 2;

function changePage(direction) {
    const display = document.getElementById('factionsDisplay');
    currentPage += direction;

    if (currentPage < 0) currentPage = 0;
    if (currentPage >= totalPages) currentPage = totalPages - 1;

    display.style.transform = `translateX(-${currentPage * 50}%)`;
}

// ====================================
// CONTROLE DE PERSONAGENS NA SIDEBAR
// ====================================
let currentChar = 0;
function changeChar(direction) {
    const display = document.getElementById('charsDisplay');
    const totalChars = display.children.length;
    const visibleChars = 1;
    
    // Calcula a altura dinâmica (altura do card + margem inferior)
    const firstCard = display.children[0];
    const cardStyle = window.getComputedStyle(firstCard);
    const cardHeightWithMargin = firstCard.offsetHeight + parseInt(cardStyle.marginBottom);

    currentChar += direction;

    const maxScroll = Math.max(0, totalChars - visibleChars);
    if (currentChar < 0) currentChar = 0;
    if (currentChar > maxScroll) currentChar = maxScroll;

    display.style.transform = `translateY(-${currentChar * cardHeightWithMargin}px)`;
}

// CONTROLE DO ÁUDIO
function toggleAudio() {
    const audio = document.getElementById('heroAudio');
    const icon = document.querySelector('.play-icon');
    const btn = document.querySelector('.audio-btn');

    if (audio.paused) {
        audio.play()
            .then(() => {
                icon.textContent = '⏸';
                btn.style.background = 'rgba(196, 30, 58, 0.5)';
                console.log('✅ Áudio tocando!');
            })
            .catch((error) => {
                console.error('❌ Erro ao tocar áudio:', error);
            });
    } else {
        audio.pause();
        icon.textContent = '▶';
        btn.style.background = 'rgba(196, 30, 58, 0.2)';
        console.log('⏸ Áudio pausado');
    }
}

// ====================================
// SCROLL REVEAL (VISÃO 2026)
// ====================================
document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));
    
    // Pequeno delay para a Hero section se revelar no topo
    setTimeout(() => {
        const hero = document.getElementById('inicio');
        if (hero) hero.classList.add('active');
    }, 500);
});