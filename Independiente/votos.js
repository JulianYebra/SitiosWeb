// document.addEventListener('DOMContentLoaded', function () {
//   const jugadores = document.querySelectorAll('.jugador-card');

//   jugadores.forEach(card => {
//     const id = card.getAttribute('data-id');
//     const contadorElem = card.querySelector('.contador');
//     const btnMas = card.querySelector('.incrementar');
//     const btnMenos = card.querySelector('.decrementar');

//     let contador = parseInt(localStorage.getItem(`votos_${id}`)) || 0;
//     contadorElem.textContent = contador;

//     btnMas.addEventListener('click', function () {
//       contador++;
//       localStorage.setItem(`votos_${id}`, contador);
//       contadorElem.textContent = contador;
//     });

//     btnMenos.addEventListener('click', function () {
//       if (contador > 0) {
//         contador--;
//         localStorage.setItem(`votos_${id}`, contador);
//         contadorElem.textContent = contador;
//       }
//     });
//   });
// });

document.addEventListener('DOMContentLoaded', function () {
  const jugadores = document.querySelectorAll('.jugador-card');

  jugadores.forEach(card => {
    const id = card.getAttribute('data-id');
    const contadorElem = card.querySelector('.contador');
    const btnMas = card.querySelector('.incrementar');
    const btnMenos = card.querySelector('.decrementar');

    let contador = parseInt(localStorage.getItem(`votos_${id}`)) || 0;
    let votoPropio = localStorage.getItem(`votoPropio_${id}`) === 'true';

    contadorElem.textContent = contador;

    function actualizarInterfaz() {
      if (votoPropio) {
        btnMas.disabled = true;
        btnMenos.disabled = false;
      } else {
        btnMas.disabled = false;
        btnMenos.disabled = true;
      }
    }

    actualizarInterfaz();

    btnMas.addEventListener('click', function () {
      if (!votoPropio) {
        contador++;
        localStorage.setItem(`votos_${id}`, contador);
        localStorage.setItem(`votoPropio_${id}`, 'true');
        contadorElem.textContent = contador;
        votoPropio = true;
        actualizarInterfaz();
      }
    });

    btnMenos.addEventListener('click', function () {
      if (votoPropio) {
        contador--;
        if (contador < 0) contador = 0;
        localStorage.setItem(`votos_${id}`, contador);
        localStorage.setItem(`votoPropio_${id}`, 'false');
        contadorElem.textContent = contador;
        votoPropio = false;
        actualizarInterfaz();
      }
    });
  });
});

