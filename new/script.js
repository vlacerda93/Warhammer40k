    // Partículas de fundo (opcionalmente incremente)
    document.addEventListener('DOMContentLoaded', function () {
      for(let i=0; i<55; i++){
        let p = document.createElement('div');
        p.className = 'particle';
        p.style.position = 'absolute';
        p.style.left = `${Math.random()*100}vw`;
        p.style.top = `${Math.random()*100}vh`;
        p.style.width = `${Math.random()*2+1}px`;
        p.style.height = p.style.width;
        p.style.background = '#fff';
        p.style.opacity = '.08';
        p.style.borderRadius = '50%';
        p.style.filter = 'blur(0.7px)';
        p.style.animation = `float ${10+Math.random()*20}s linear infinite`;
        p.style.animationDelay = `${Math.random()*20}s`;
        document.getElementById('galaxy-bg').appendChild(p);
      }
      // Animação typing no título
      const title = "WARHAMMER 40,000";
      typeWriter(document.getElementById("typed"), title, 90);
    });

    function typeWriter(element, text, speed){
      let i = 0;
      function type(){
        if(i < text.length){
          element.innerHTML += text.charAt(i);
          i++;
          setTimeout(type,speed);
        }
      }
      element.innerHTML = "";
      type();
    }
