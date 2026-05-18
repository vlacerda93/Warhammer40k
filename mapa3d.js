window.mapa3dInitialized = false;

window.initMapa3D = function() {
    const container = document.getElementById('canvas-3d');
    if (!container) return;

    // 1. Setup Básico
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x02030a);
    scene.fog = new THREE.FogExp2(0x02030a, 0.012);

    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    // Zoom out significativo (de 30 para 80 no Z, de 15 para 30 no Y)
    camera.position.set(0, 30, 80);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 250;
    controls.minDistance = 10;

    // 2. Iluminação
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    
    const centerLight = new THREE.PointLight(0xffddaa, 2.5, 150);
    scene.add(centerLight);

    // Sol Central
    const sunGeo = new THREE.SphereGeometry(4, 32, 32);
    const sunMat = new THREE.MeshBasicMaterial({ color: 0xffffee });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    scene.add(sunMesh);

    const sunAuraGeo = new THREE.SphereGeometry(6, 32, 32);
    const sunAuraMat = new THREE.MeshBasicMaterial({ 
        color: 0xffaa00, 
        transparent: true, 
        opacity: 0.4, 
        blending: THREE.AdditiveBlending 
    });
    const sunAura = new THREE.Mesh(sunAuraGeo, sunAuraMat);
    scene.add(sunAura);

    // Olho do Terror (Eye of Terror) bem ao fundo
    const eyeGeo = new THREE.SphereGeometry(30, 32, 32);
    const eyeMat = new THREE.MeshBasicMaterial({ 
        color: 0x8b0000, // Vermelho/Roxo corrompido
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending
    });
    const eyeMesh = new THREE.Mesh(eyeGeo, eyeMat);
    eyeMesh.position.set(120, 40, -120); // Muito longe
    scene.add(eyeMesh);

    const eyeCoreGeo = new THREE.SphereGeometry(12, 32, 32);
    const eyeCoreMat = new THREE.MeshBasicMaterial({ color: 0xff4500 });
    const eyeCoreMesh = new THREE.Mesh(eyeCoreGeo, eyeCoreMat);
    eyeMesh.add(eyeCoreMesh);

    const eyeLight = new THREE.PointLight(0x8b0000, 2, 250);
    eyeLight.position.set(120, 40, -120);
    scene.add(eyeLight);

    // 3. Fundo de Estrelas
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 5000;
    const posArray = new Float32Array(starsCount * 3);
    const colorsArray = new Float32Array(starsCount * 3);

    for(let i = 0; i < starsCount * 3; i+=3) {
        const r = 30 + Math.random() * 140;
        const theta = Math.random() * Math.PI * 2;
        const y = (Math.random() - 0.5) * 20;
        
        posArray[i] = r * Math.cos(theta);
        posArray[i+1] = y;
        posArray[i+2] = r * Math.sin(theta);

        const mixedColor = new THREE.Color();
        mixedColor.setHSL(Math.random() * 0.2 + 0.6, 0.8, Math.random() * 0.5 + 0.5);
        colorsArray[i] = mixedColor.r;
        colorsArray[i+1] = mixedColor.g;
        colorsArray[i+2] = mixedColor.b;
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    starsGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

    const starsMaterial = new THREE.PointsMaterial({
        size: 0.15,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const starMesh = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starMesh);

    // 4. Planetas (Multiplos por facção)
    const planetData = {
        imperium: [
            { color: 0xffdf00, pos: [-8, 0, 5], size: 1.5, speed: 0.005 },
            { color: 0xffdf00, pos: [-25, 5, 20], size: 1.2, speed: 0.003 },
            { color: 0xffdf00, pos: [8, -5, 30], size: 1.4, speed: 0.004 },
            { color: 0xffdf00, pos: [-40, -2, 10], size: 1.1, speed: 0.006 },
            { color: 0xffdf00, pos: [-15, -10, -25], size: 1.3, speed: 0.005 }
        ],
        tau: [
            { color: 0x3be0ff, pos: [28, -2, 18], size: 1.4, speed: 0.006 },
            { color: 0x3be0ff, pos: [40, 6, 28], size: 1.1, speed: 0.004 },
            { color: 0x3be0ff, pos: [20, -12, 40], size: 1.3, speed: 0.005 },
            { color: 0x3be0ff, pos: [50, 0, 15], size: 1.2, speed: 0.007 }
        ],
        ork: [
            { color: 0x4cff1a, pos: [-30, -6, -30], size: 1.6, speed: 0.007 },
            { color: 0x4cff1a, pos: [-48, 10, -18], size: 1.4, speed: 0.005 },
            { color: 0x4cff1a, pos: [-12, 15, -40], size: 1.5, speed: 0.006 }
        ],
        necron: [
            { color: 0x00ff00, pos: [18, 18, -30], size: 1.5, speed: 0.002 },
            { color: 0x00ff00, pos: [35, -15, -20], size: 1.3, speed: 0.003 }
        ],
        chaos: [
            { color: 0xff1a1a, pos: [22, 2, -18], size: 1.8, speed: 0.004 },
            { color: 0xff1a1a, pos: [6, -18, -30], size: 1.6, speed: 0.005 }
        ],
        aeldari: [
            { color: 0xe54bff, pos: [0, 25, 0], size: 1.0, speed: 0.003 }
        ]
    };

    const factionGroups = {
        imperium: new THREE.Group(),
        tau: new THREE.Group(),
        ork: new THREE.Group(),
        necron: new THREE.Group(),
        chaos: new THREE.Group(),
        aeldari: new THREE.Group()
    };

    const allPlanets = [];

    Object.keys(planetData).forEach(faction => {
        const planetsConfig = planetData[faction];
        
        planetsConfig.forEach(data => {
            const planetGroup = new THREE.Group();
            planetGroup.position.set(data.pos[0], data.pos[1], data.pos[2]);
            
            const geo = new THREE.SphereGeometry(data.size, 32, 32);
            const mat = new THREE.MeshStandardMaterial({ 
                color: data.color, 
                roughness: 0.6,
                metalness: 0.4,
                emissive: data.color,
                emissiveIntensity: 0.4
            });
            const mesh = new THREE.Mesh(geo, mat);
            planetGroup.add(mesh);

            const auraGeo = new THREE.SphereGeometry(data.size * 1.3, 32, 32);
            const auraMat = new THREE.MeshBasicMaterial({
                color: data.color,
                transparent: true,
                opacity: 0.15,
                blending: THREE.AdditiveBlending,
                side: THREE.BackSide
            });
            const auraMesh = new THREE.Mesh(auraGeo, auraMat);
            planetGroup.add(auraMesh);

            const light = new THREE.PointLight(data.color, 1.5, 30);
            planetGroup.add(light);

            // Adicionando Luas
            if (faction === 'imperium' || faction === 'chaos' || Math.random() > 0.5) {
                const moonGeo = new THREE.SphereGeometry(data.size * 0.25, 16, 16);
                const moonMat = new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.9, metalness: 0.1 });
                const moonMesh = new THREE.Mesh(moonGeo, moonMat);
                
                moonMesh.position.set(data.size * 2 + 0.5, 0, 0); // Distância da lua
                
                const moonPivot = new THREE.Group();
                moonPivot.add(moonMesh);
                moonPivot.rotation.y = Math.random() * Math.PI * 2;
                moonPivot.rotation.z = (Math.random() - 0.5) * 0.8; // Inclinação orbital
                
                planetGroup.add(moonPivot);
                data.moonPivot = moonPivot;
            }

            factionGroups[faction].add(planetGroup);
            
            allPlanets.push({
                group: planetGroup,
                mesh: mesh,
                data: data
            });
        });
        
        scene.add(factionGroups[faction]);
    });

    // 5. Tyranids como linhas/rastros indo para planetas
    const tyranidGroup = new THREE.Group();
    scene.add(tyranidGroup);

    const tyranidTargets = [
        new THREE.Vector3(...planetData.imperium[0].pos), // Alvo Imperium principal
        new THREE.Vector3(...planetData.imperium[1].pos), // Segundo alvo Imperium
        new THREE.Vector3(...planetData.tau[0].pos)       // Alvo T'au principal
    ];

    const tyranidLinesCount = 40; // Menos linhas (antes era 150)
    const lines = [];

    for(let i=0; i<tyranidLinesCount; i++) {
        const target = tyranidTargets[Math.floor(Math.random() * tyranidTargets.length)];
        
        const angle = Math.random() * Math.PI * 2;
        const dist = 120 + Math.random() * 80;
        const startPos = new THREE.Vector3(
            Math.cos(angle) * dist,
            (Math.random() - 0.5) * 60,
            Math.sin(angle) * dist
        );

        const lineGeo = new THREE.BufferGeometry().setFromPoints([startPos, startPos]);
        const lineMat = new THREE.LineBasicMaterial({
            color: 0xcc00ff, // Roxo brilhante Tyranid
            transparent: true,
            opacity: 0.8,
            linewidth: 2
        });
        
        const line = new THREE.Line(lineGeo, lineMat);
        tyranidGroup.add(line);

        lines.push({
            mesh: line,
            start: startPos.clone(),
            current: startPos.clone(),
            target: target,
            speed: 0.005 + Math.random() * 0.015, // Beeeeeem devagarzinho
            length: 2 + Math.random() * 4
        });
    }

    // 6. Conectar Checkboxes
    const toggleMap = {
        'toggle-imperium': 'imperium',
        'toggle-chaos': 'chaos',
        'toggle-tau': 'tau',
        'toggle-ork': 'ork',
        'toggle-necron': 'necron',
        'toggle-aeldari': 'aeldari'
    };

    Object.keys(toggleMap).forEach(id => {
        const checkbox = document.getElementById(id);
        if (checkbox) {
            factionGroups[toggleMap[id]].visible = checkbox.checked;
            checkbox.addEventListener('change', (e) => {
                factionGroups[toggleMap[id]].visible = e.target.checked;
            });
        }
    });

    const tyranidCb = document.getElementById('toggle-tyranid');
    if (tyranidCb) {
        tyranidGroup.visible = tyranidCb.checked;
        tyranidCb.addEventListener('change', (e) => {
            tyranidGroup.visible = e.target.checked;
        });
    }

    // 7. Loop de Animação
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        
        const elapsedTime = clock.getElapsedTime();

        controls.update();

        // Rotação da Galáxia
        starMesh.rotation.y = elapsedTime * 0.005;

        // Animação dos Planetas e Luas
        allPlanets.forEach(p => {
            p.mesh.rotation.y += p.data.speed;
            p.group.position.y = p.data.pos[1] + Math.sin(elapsedTime * p.data.speed * 100) * 0.5;
            
            // Órbita da lua
            if (p.data.moonPivot) {
                p.data.moonPivot.rotation.y += p.data.speed * 1.5;
            }
        });

        // Movimentação das Linhas Tyranids
        if (tyranidGroup.visible) {
            lines.forEach(l => {
                // Direção para o alvo
                const dir = new THREE.Vector3().subVectors(l.target, l.current).normalize();
                
                // Mover a posição atual
                l.current.add(dir.clone().multiplyScalar(l.speed));

                // Calcular a posição da "cauda" (rastro)
                const tailDir = dir.clone().negate();
                const tail = new THREE.Vector3().copy(l.current).add(tailDir.multiplyScalar(l.length));

                // Resetar se chegar perto
                if (l.current.distanceTo(l.target) < 2.0) {
                    l.current.copy(l.start);
                }

                // Atualizar os pontos da geometria
                const positions = l.mesh.geometry.attributes.position.array;
                positions[0] = l.current.x;
                positions[1] = l.current.y;
                positions[2] = l.current.z;
                positions[3] = tail.x;
                positions[4] = tail.y;
                positions[5] = tail.z;
                
                l.mesh.geometry.attributes.position.needsUpdate = true;
            });
        }

        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
};
