/* 
   LIGHTBOX SYSTEM - WARHAMMER 40K CODEX
   Permite ampliar imagens ao clicar e fechar ao clicar fora.
*/

document.addEventListener('DOMContentLoaded', () => {
    // Cria o overlay do Lightbox
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    document.body.appendChild(lightbox);

    // Estilos do Lightbox (injetados via JS para garantir funcionamento)
    Object.assign(lightbox.style, {
        position: 'fixed',
        zIndex: '10000',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        display: 'none',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'zoom-out'
    });

    const img = document.createElement('img');
    Object.assign(img.style, {
        maxWidth: '90%',
        maxHeight: '90%',
        boxShadow: '0 0 50px rgba(255, 255, 255, 0.1)',
        border: '3px solid #333',
        borderRadius: '5px',
        transition: 'transform 0.3s ease'
    });
    lightbox.appendChild(img);

    // Seleciona todas as imagens que devem ser ampliáveis
    // Galeria, Armas (tech/warp info), Armaduras e Final Leader
    const targetSelectors = [
        '.traitor-card img', '.cadre-card img', '.necron-card img', '.organism-card img', '.gallery-card img', '.eldar-card img',
        '.warp-img-box img', '.tech-img-box img', '.gauss-img-box img', '.feature-img-box img',
        '.legacy-block img', '.legacy-chamber img', '.legacy-banner img', '.legacy-container img',
        'img[alt="Commander Shadowsun"]', 'img[alt="Huron Blackheart"]', 'img[alt="Szarekh"]', 'img[alt="Guilliman"]'
    ];

    document.addEventListener('click', (e) => {
        // Verifica se o elemento clicado é uma imagem dentro dos nossos seletores
        const isExpandable = targetSelectors.some(selector => e.target.closest(selector));
        
        if (isExpandable && e.target.tagName === 'IMG') {
            img.src = e.target.src;
            lightbox.style.display = 'flex';
            // Adiciona um leve brilho conforme a facção (opcional: detecção de cor)
            img.style.borderColor = getComputedStyle(e.target).borderColor || '#555';
        }
    });

    // Fecha ao clicar no fundo ou na imagem
    lightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    // Fecha com a tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') lightbox.style.display = 'none';
    });
});
