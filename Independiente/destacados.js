 document.addEventListener('DOMContentLoaded', function () {
    const jugadores = [
  { id: "Rodrigorey", nombre: "Rodrigo Rey", img: "https://clubaindependiente.com.ar/cache/plantel/rey.jpg" },
  { id: "MateoMorro", nombre: "Mateo Morro", img: "https://clubaindependiente.com.ar/cache/plantel/morro.jpg" },
  { id: "ManuelTasso", nombre: "Manuel Tasso", img: "https://clubaindependiente.com.ar/cache/plantel/tasso.jpg" },
  { id: "JoaquinBlazquez", nombre: "Joaquín Blázquez", img: "https://clubaindependiente.com.ar/cache/plantel/blazquez.jpg" },
  { id: "kevinlomonaco", nombre: "Kevin Lomónaco", img: "https://clubaindependiente.com.ar/cache/plantel/lomonaco.jpg" },
  { id: "francoparedes", nombre: "Franco Paredes", img: "https://clubaindependiente.com.ar/cache/plantel/paredes.jpg" },
  { id: "valdez", nombre: "Sebastián Valdez", img: "https://clubaindependiente.com.ar/cache/plantel/valdez.jpg" },
  { id: "loyola", nombre: "Felipe Loyola", img: "https://clubaindependiente.com.ar/cache/plantel/loyola.jpg" },
  { id: "irastorza", nombre: "Jonathan De Irastorza", img: "https://clubaindependiente.com.ar/cache/plantel/de-irastorza.jpg" },
  { id: "vera", nombre: "Federico Vera", img: "https://clubaindependiente.com.ar/cache/plantel/vera.jpg" },
  { id: "freire", nombre: "Nicolás Freire", img: "https://clubaindependiente.com.ar/cache/plantel/freire.jpg" },
  { id: "zabala", nombre: "Facundo Zabala", img: "https://www.ole.com.ar/2025/07/24/TBz703kNj_1290x760__1.jpg" },
  { id: "milton", nombre: "Milton Valenzuela", img: "https://www.ole.com.ar/2025/07/16/9gfLQZcOb_1290x760__1.jpg" },
  { id: "leo", nombre: "Leonardo Godoy", img: "https://media.tycsports.com/files/2025/06/17/853803/leo-godoy_416x555.webp" },
  { id: "cabral", nombre: "Luciano Cabral", img: "https://clubaindependiente.com.ar/cache/plantel/cabral.jpg" },
  { id: "cedres", nombre: "Rodrigo Cedrés", img: "https://clubaindependiente.com.ar/cache/plantel/fernandez-cedres.jpg" },
  { id: "galdames", nombre: "Pablo Galdames", img: "https://clubaindependiente.com.ar/cache/plantel/galdames.jpg" },
  { id: "marcone", nombre: "Iván Marcone", img: "https://clubaindependiente.com.ar/cache/plantel/marcone.jpg" },
  { id: "millan", nombre: "Lautaro Millán", img: "https://clubaindependiente.com.ar/cache/plantel/millan.jpg" },
  { id: "tarzia", nombre: "Diego Tarzia", img: "https://clubaindependiente.com.ar/cache/plantel/tarzia.jpg" },
  { id: "mancu", nombre: "Federico Mancuello", img: "https://clubaindependiente.com.ar/cache/plantel/mancuello.jpg" },
  { id: "avalos", nombre: "Gabriel Ávalos", img: "https://clubaindependiente.com.ar/cache/plantel/avalos.jpg" },
  { id: "montiel", nombre: "Santiago Montiel", img: "https://clubaindependiente.com.ar/cache/plantel/montiel.jpg" },
  { id: "pusseto", nombre: "Ignacio Pussetto", img: "https://www.ole.com.ar/2025/07/12/qPsudn6V3_300x220__1.jpg" },
  { id: "mazzanti", nombre: "Walter Mazzanti", img: "https://santafedeportivo.com/wp-content/uploads/2025/06/Imagen-de-WhatsApp-2025-06-16-a-las-15.49.13_fdf24e50.jpg" }
  ];
    const votosConDatos = jugadores.map(j => {
    const votos = parseInt(localStorage.getItem(`votos_${j.id}`)) || 0;
    return { ...j, votos };
  });

  // Ordenar de mayor a menor por votos
  const topJugadores = votosConDatos
    .sort((a, b) => b.votos - a.votos)
    .filter(j => j.votos > 0) // solo mostrar los que tengan votos
    .slice(0, 3); // por ejemplo, mostrar solo los 3 mejores

  // Mostrar en HTML
  const contenedor = document.querySelector('#destacados');
  if (contenedor) {
    contenedor.innerHTML = topJugadores.map(j => `
      <div class="jugador-destacado">
        <img src="${j.img}" alt="${j.nombre}" class="jugador-img-destacado">
        <p class="jugador-nombre">${j.nombre}</p>
        <p class="jugador-votos">⭐ ${j.votos} votos</p>
      </div>
    `).join('');
  }
});