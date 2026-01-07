<script>
    // CARROSSEL DE FACÇÕES
    document.addEventListener('DOMContentLoaded', () => {
        const track = document.querySelector('.factions-grid-row');
        const nextBtn = document.querySelector('.next-arrow');
        const prevBtn = document.querySelector('.prev-arrow');
        
        let position = 0;
        const moveBlock = 1000; 

        nextBtn.addEventListener('click', () => {
            if (position === 0) {
                position = moveBlock;
                track.style.transform = `translateX(-${position}px)`;
            }
        });

        prevBtn.addEventListener('click', () => {
            if (position > 0) {
                position = 0;
                track.style.transform = `translateX(0px)`;
            }
        });
    });

    // CONTROLE DE PERSONAGENS NA SIDEBAR
    let currentChar = 0;
    const charHeight = 93;
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

    // ⬇️⬇️⬇️ ADICIONA ISSO AQUI ⬇️⬇️⬇️
    // CONTROLE DO ÁUDIO
   function toggleAudio() {
    const audio = document.getElementById('heroAudio');
    const icon = document.querySelector('.play-icon');
    const btn = document.querySelector('.audio-btn');
    
    if (audio.paused) {
        audio.play();
        icon.textContent = '⏸';
        btn.style.background = 'rgba(196, 30, 58, 0.5)';
    } else {
        audio.pause();
        icon.textContent = '▶';
        btn.style.background = 'rgba(196, 30, 58, 0.2)';
    }
}

// AUTOPLAY após 2 segundos quando a página carregar
window.addEventListener('load', () => {
    setTimeout(() => {
        const audio = document.getElementById('heroAudio');
        const icon = document.querySelector('.play-icon');
        const btn = document.querySelector('.audio-btn');
        
        audio.play().then(() => {
            // Áudio começou a tocar
            icon.textContent = '⏸';
            btn.style.background = 'rgba(196, 30, 58, 0.5)';
        }).catch((error) => {
            // Navegador bloqueou o autoplay (política de segurança)
            console.log('Autoplay bloqueado pelo navegador');
        });
    }, 2000); // 2000 = 2 segundos
});
</script>
