/**
 * TYRANID SHADOW IN THE WARP - EFFECT SYSTEM
 * Simula o apagão e a Sombra no Warp
 */

document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.createElement('div');
    overlay.id = 'shadow-warp-overlay';
    document.body.appendChild(overlay);

    // Aumentando a presença (O enxame está próximo)
    const MAX_SHADOWS = 6; 

    function createShadowPatch() {
        if (document.querySelectorAll('.shadow-patch').length >= MAX_SHADOWS) return;

        const patch = document.createElement('div');
        patch.className = 'shadow-patch';
        
        // Atributos aleatórios (Tamanhos maiores novamente)
        const size = Math.random() * 50 + 25; // 25vw a 75vw
        const posX = Math.random() * 100 - 20;
        const posY = Math.random() * 100 - 20;
        
        patch.style.width = size + 'vw';
        patch.style.height = size + 'vw';
        patch.style.left = posX + 'vw';
        patch.style.top = posY + 'vh';
        
        overlay.appendChild(patch);

        // Limpa após 7 segundos (Dando tempo para o fade-out suave do CSS)
        setTimeout(() => patch.remove(), 7000);
    }

    // Intervalo de geração mais rápido (1,8s)
    setInterval(createShadowPatch, 1800);
});
