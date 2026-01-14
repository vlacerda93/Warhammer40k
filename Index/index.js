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
const charHeight = 107;
const visibleChars = 4;

function changeChar(direction) {
    const display = document.getElementById('charsDisplay');
    const totalChars = display.children.length;
    const maxScroll = Math.max(0, totalChars - visibleChars);

    currentChar += direction;

    if (currentChar < 0) currentChar = 0;
    if (currentChar > maxScroll) currentChar = maxScroll;

    display.style.transform = `translateY(-${currentChar * charHeight}px)`;
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

// AUTOPLAY (opcional - descomente se quiser testar)
/*
window.addEventListener('load', () => {
    setTimeout(() => {
        const audio = document.getElementById('heroAudio');
        const icon = document.querySelector('.play-icon');
        const btn = document.querySelector('.audio-btn');
        
        audio.play()
            .then(() => {
                icon.textContent = '⏸';
                btn.style.background = 'rgba(196, 30, 58, 0.5)';
                console.log('🎵 Autoplay iniciado!');
            })
            .catch((error) => {
                console.log('⚠️ Autoplay bloqueado pelo navegador');
            });
    }, 2000);
});
*/