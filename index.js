document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.factions-grid-row');
    const nextBtn = document.querySelector('.next-arrow');
    const prevBtn = document.querySelector('.prev-arrow');
    
    let position = 0;
    // 1000px é o valor aproximado para pular 4 cards de uma vez
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