function cargarVotos() {
  // Cargar datos desde localStorage
  const data = JSON.parse(localStorage.getItem("data")) || { votos: {} };

  // Recorrer todas las tarjetas de jugadores
  document.querySelectorAll(".jugador-card").forEach(card => {
    const id = card.dataset.id; // data-id del jugador
    const contador = card.querySelector(".contador");

    if (id && data.votos[id] !== undefined) {
      contador.textContent = data.votos[id];
    } else {
      //contador.textContent = 0; // Valor por defecto si no existe en localStorage
    }
  });
}

function votar(id, incremento) {
  // Leer datos actuales
  const data = JSON.parse(localStorage.getItem("data")) || { votos: {}, visitas: 0 };
  const votosUsuario = JSON.parse(localStorage.getItem("votosUsuario")) || {}; // quién votó el usuario

  if (incremento === 1) {
    // Si el usuario ya votó a este jugador, no sumamos
    if (votosUsuario[id]) {
      
      return;
    }
    data.votos[id] = (data.votos[id] || 0) + 1;
    votosUsuario[id] = true; // marcar que votó
  }

  if (incremento === -1) {
    // Solo puede restar si ya había votado
    if (!votosUsuario[id]) {
     
      return;
    }
    data.votos[id] = Math.max(0, (data.votos[id] || 0) - 1);
    delete votosUsuario[id]; // quitar el registro de que votó
  }

  // Guardar cambios
  localStorage.setItem("data", JSON.stringify(data));
  localStorage.setItem("votosUsuario", JSON.stringify(votosUsuario));

  // Actualizar contador en pantalla
  const card = document.querySelector(`.jugador-card[data-id="${id}"]`);
  if (card) {
    card.querySelector(".contador").textContent = data.votos[id];
  }

  updateBin(data);

}

// Asociar eventos
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".jugador-card").forEach(card => {
    const id = card.dataset.id;

    const btnMas = card.querySelector(".incrementar");
    const btnMenos = card.querySelector(".decrementar");

    if (btnMas) btnMas.addEventListener("click", () => votar(id, 1));
    if (btnMenos) btnMenos.addEventListener("click", () => votar(id, -1));
  });

  cargarVotos();
});