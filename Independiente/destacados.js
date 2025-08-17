import { Jsonbin } from './funciongetput.js';

document.addEventListener('DOMContentLoaded', async function () {

    const jugadores = [
  { id: "idRodrigorey", nombre: "Rodrigo Rey", img: "images/rey.jpg" },
  { id: "idkevinlomonaco", nombre: "Kevin Lomónaco", img: "images/lomonaco.jpg" },
  { id: "idfrancoparedes", nombre: "Franco Paredes", img: "images/paredes.jpg" },
  { id: "idvaldez", nombre: "Sebastián Valdez", img: "images/valdez.jpg" },
  { id: "idloyola", nombre: "Felipe Loyola", img: "images/loyola.jpg" },
  { id: "idirastorza", nombre: "Jonathan De Irastorza", img: "images/de-irastorza.jpg" },
  { id: "idvera", nombre: "Federico Vera", img: "images/vera.jpg" },
  { id: "idfreire", nombre: "Nicolás Freire", img: "images/freire.jpg" },
  { id: "idzabala", nombre: "Facundo Zabala", img: "images/zabala.jpg" },
  { id: "idmilton", nombre: "Milton Valenzuela", img: "images/valenzuela.jpg" },
  { id: "idleo", nombre: "Leonardo Godoy", img: "images/godoy.jpg" },
  { id: "idcabral", nombre: "Luciano Cabral", img: "images/cabral.jpg" },
  { id: "idcedres", nombre: "Rodrigo Cedrés", img: "images/fernandez-cedres.jpg" },
  { id: "idgaldames", nombre: "Pablo Galdames", img: "images/galdames.jpg" },
  { id: "idmarcone", nombre: "Iván Marcone", img: "images/marcone.jpg" },
  { id: "idmillan", nombre: "Lautaro Millán", img: "images/millan.jpg" },
  { id: "idtarzia", nombre: "Diego Tarzia", img: "images/tarzia.jpg" },
  { id: "idmancu", nombre: "Federico Mancuello", img: "images/mancuello.jpg" },
  { id: "idavalos", nombre: "Gabriel Ávalos", img: "images/avalos.jpg" },
  { id: "idmontiel", nombre: "Santiago Montiel", img: "images/montiel.jpg" },
  { id: "idpusseto", nombre: "Ignacio Pussetto", img: "images/pussetto.jpg" },
  { id: "idmazzanti", nombre: "Walter Mazzanti", img: "images/mazzantti.jpg" },
  { id: "idabaldo", nombre: "Matias Abaldo", img: "images/abaldo.jpg" }
  ];


await  leerContador();

const destacadosJSON = localStorage.getItem("JugadoresDestacados");
    let destacados = [];

    if (destacadosJSON) {
        try {
            const idsConVotos = JSON.parse(destacadosJSON); // [["idcedres", 2], ...]

            destacados = idsConVotos.map(([id, votos]) => {
                const jugador = jugadores.find(j => j.id === id);
                if (jugador) {
                    return {
                        ...jugador,
                        votos: votos
                    };
                }
                return null;
            }).filter(j => j !== null); // Elimina posibles nulos si algún ID no se encuentra
        } catch (e) {
            console.error("Error al parsear o procesar destacados:", e);
        }
    }

const contenedor = document.querySelector('#destacados');
    if (contenedor && destacados.length > 0) {
        contenedor.innerHTML = destacados.map(j => `
            <div class="jugador-destacado">
                <img src="${j.img}" alt="${j.nombre}" class="jugador-img-destacado">
                <p class="jugador-nombre">${j.nombre}</p>
                <p class="jugador-votos">⭐ ${j.votos} votos</p>
            </div>
        `).join('');
    }


});


async function leerContador() {

            const binId = '68929a10ae596e708fc29f09';
            
            try {

                //showSpinner();
                const result = await Jsonbin.readBin();


                localStorage.setItem("data",JSON.stringify(result.record));


                dibujarContador( result.record);

                contarVotos(result.record.votos)

                //hideSpinner();


            } catch (error) {
                console.log(`❌ Error al leer bin: ${error.message}`, 'error');
            }
 }

 function contarVotos(votos){

  // Convertir el objeto en un array de pares [clave, valor]
  const pares = Object.entries(votos);

  // Ordenar por la cantidad de votos, de mayor a menor
  const ordenados = pares.sort((a, b) => b[1] - a[1]);

  // Tomar los primeros 3
  const top3 = ordenados.slice(0, 3);

  localStorage.setItem("JugadoresDestacados",JSON.stringify(top3))

  //return JSON.stringify(top3); // Devuelve array de [clave, valor]
}

  // Mostrar el spinner de forma segura
function showSpinner() {
    const spinner = document.getElementById('spinner-overlay');
    if (spinner) spinner.style.display = 'flex';
}

// Ocultar el spinner de forma segura
function hideSpinner() {
    const spinner = document.getElementById('spinner-overlay');
    if (spinner) spinner.style.display = 'none';
}

// Interceptar todas las llamadas fetch y mostrar spinner
const originalFetch = window.fetch;
window.fetch = async function(...args) {
    showSpinner();
    try {
        const response = await originalFetch(...args);
        return response;
    } finally {
        hideSpinner();
    }
};

  async function updateBin(data){
    
      try {

        const result = await Jsonbin.updateBin(data);  
        
      }
      catch(error) {
                  console.log(`❌ Error al actualizar bin: ${error.message}`, 'error');
      }
  };

  async  function dibujarContador(data) {

//localStorage.setItem("datosJSON", result);


    var n = data.visitas;
  

    if (n === null) {
      n = 0;
    }
    n++;
    //localStorage.setItem("on_load_counter", n);

    data.visitas = n;

    let nums = n.toString().split('').map(Number);
    let counterHTML = '<div class="counter-title">Visitas a la página</div>';
    counterHTML += '<div class="counter-number">';
      for (var i of nums) {
        counterHTML += '<div class="counter-digit">' + i + '</div>';
      }
    counterHTML += '</div>';
    counterHTML += '<div class="counter-label"></div>';

    document.getElementById('CounterVisitor').innerHTML = counterHTML;

    updateBin(data);

  }

