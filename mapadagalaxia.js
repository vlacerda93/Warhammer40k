document.addEventListener("DOMContentLoaded", () => {
  // === CHECKBOXES ===
  const checkboxImperium = document.querySelector("#toggle-imperium");
  const checkboxChaos    = document.querySelector("#toggle-chaos");
  const checkboxTau      = document.querySelector("#toggle-tau");
  const checkboxOrks     = document.querySelector("#toggle-ork");
  const checkboxAeldari  = document.querySelector("#toggle-aeldari");
  const checkboxTyranid  = document.querySelector("#toggle-tyranid"); // reservado

  // === GRUPOS DE MARCADORES ===
  const imperiumMarkers = document.querySelectorAll(".marker-imperium");
  const chaosMarkers    = document.querySelectorAll(".marker-chaos");
  const tauMarkers      = document.querySelectorAll(".marker-tau");
  const orkMarkers      = document.querySelectorAll(".marker-ork");
  const aeldariMarkers  = document.querySelectorAll(".marker-aeldari");
  const tyranidMarkers  = document.querySelectorAll(".marker-tyranid"); // futuramente trilhas/pontos

  // Função genérica pra mostrar/ocultar
  function updateVisibility(checkbox, markers) {
    if (!checkbox || !markers) return;
    markers.forEach(m => {
      if (checkbox.checked) {
        m.classList.remove("hidden");
      } else {
        m.classList.add("hidden");
      }
    });
  }

  // === EVENTOS ===
  if (checkboxImperium) {
    checkboxImperium.addEventListener("change", () =>
      updateVisibility(checkboxImperium, imperiumMarkers)
    );
  }

  if (checkboxChaos) {
    checkboxChaos.addEventListener("change", () =>
      updateVisibility(checkboxChaos, chaosMarkers)
    );
  }

  if (checkboxTau) {
    checkboxTau.addEventListener("change", () =>
      updateVisibility(checkboxTau, tauMarkers)
    );
  }

  if (checkboxOrks) {
    checkboxOrks.addEventListener("change", () =>
      updateVisibility(checkboxOrks, orkMarkers)
    );
  }

  if (checkboxAeldari) {
    checkboxAeldari.addEventListener("change", () =>
      updateVisibility(checkboxAeldari, aeldariMarkers)
    );
  }

  if (checkboxTyranid) {
    checkboxTyranid.addEventListener("change", () =>
      updateVisibility(checkboxTyranid, tyranidMarkers)
    );
  }

  // === ESTADO INICIAL ===
  updateVisibility(checkboxImperium, imperiumMarkers);
  updateVisibility(checkboxChaos,    chaosMarkers);
  updateVisibility(checkboxTau,      tauMarkers);
  updateVisibility(checkboxOrks,     orkMarkers);
  updateVisibility(checkboxAeldari,  aeldariMarkers);
  updateVisibility(checkboxTyranid,  tyranidMarkers);

  // === TOGGLE MAP AREA ===
  const btnToggleMap = document.querySelector("#btn-toggle-map");
  const collapsibleArea = document.querySelector("#collapsible-map-area");
  const btnText = document.querySelector("#map-btn-text");

  if (btnToggleMap && collapsibleArea) {
    btnToggleMap.addEventListener("click", () => {
      const isCollapsed = collapsibleArea.classList.toggle("collapsed");
      
      if (isCollapsed) {
        btnText.textContent = "DESBLOQUEAR MAPA TÁTICO";
        btnToggleMap.style.backgroundColor = ""; // Reset to CSS default
        btnToggleMap.style.color = ""; // Reset text color
      } else {
        btnText.textContent = "OCULTAR DADOS TÁTICOS";
        btnToggleMap.style.backgroundColor = "#c41e3a"; // Highlight when open
        btnToggleMap.style.color = "#fff"; // Make text readable against red background
        
        // Inicializa o mapa 3D se existir a função e oculta o 2D
        if (window.initMapa3D && !window.mapa3dInitialized) {
            document.getElementById('static-map-image').style.display = 'none';
            document.querySelectorAll('.marker, .marker-tyranid').forEach(el => el.style.display = 'none');
            document.getElementById('canvas-3d').style.display = 'block';
            window.initMapa3D();
            window.mapa3dInitialized = true;
        }
      }
    });
  }
});
