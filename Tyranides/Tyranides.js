/**
 * TYRANID SHADOW IN THE WARP - EFFECT SYSTEM
 * Simula o apagão e a Sombra no Warp
 */

document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.createElement('div');
    overlay.id = 'shadow-warp-overlay';
    document.body.appendChild(overlay);

    // Suavizando a frequência (Mais misterioso e menos caótico)
    const MAX_SHADOWS = 4; 

    function createShadowPatch() {
        if (document.querySelectorAll('.shadow-patch').length >= MAX_SHADOWS) return;

        const patch = document.createElement('div');
        patch.className = 'shadow-patch';
        
        // Atributos aleatórios (Tamanhos mais contidos)
        const size = Math.random() * 30 + 15; // 15vw a 45vw
        const posX = Math.random() * 100 - 10;
        const posY = Math.random() * 100 - 10;
        
        patch.style.width = size + 'vw';
        patch.style.height = size + 'vw';
        patch.style.left = posX + 'vw';
        patch.style.top = posY + 'vh';
        
        overlay.appendChild(patch);

        // Limpa após 7 segundos (Dando tempo para o fade-out suave do CSS)
        setTimeout(() => patch.remove(), 7000);
    }

    // Intervalo de geração mais espaçado
    setInterval(createShadowPatch, 2500);
});
