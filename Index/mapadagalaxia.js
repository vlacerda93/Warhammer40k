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
});
