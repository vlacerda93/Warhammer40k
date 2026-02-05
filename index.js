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
// CONTROLE DE PERSONAGENS NA SIDEBAR (1 personagem por vez)
// ====================================
let currentChar = 0;

function changeChar(direction) {
    const display = document.getElementById('charsDisplay');
    const wrapper = display.parentElement;
    const totalChars = display.children.length;
    const slideHeight = wrapper.offsetHeight; // altura de 1 card = altura do painel

    currentChar += direction;
    if (currentChar < 0) currentChar = 0;
    if (currentChar >= totalChars) currentChar = totalChars - 1;

    display.style.transform = `translateY(-${currentChar * slideHeight}px)`;
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