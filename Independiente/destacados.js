import { Jsonbin } from './funciongetput.js';

document.addEventListener('DOMContentLoaded', async function () {

    const jugadores = [
  { id: "idRodrigorey", nombre: "Rodrigo Rey", img: "https://clubaindependiente.com.ar/cache/plantel/rey.jpg" },
  { id: "idMateoMorro", nombre: "Mateo Morro", img: "https://clubaindependiente.com.ar/cache/plantel/morro.jpg" },
  { id: "idManuelTasso", nombre: "Manuel Tasso", img: "https://clubaindependiente.com.ar/cache/plantel/tasso.jpg" },
  { id: "idJoaquinBlazquez", nombre: "Joaquín Blázquez", img: "https://clubaindependiente.com.ar/cache/plantel/blazquez.jpg" },
  { id: "idkevinlomonaco", nombre: "Kevin Lomónaco", img: "https://clubaindependiente.com.ar/cache/plantel/lomonaco.jpg" },
  { id: "idfrancoparedes", nombre: "Franco Paredes", img: "https://clubaindependiente.com.ar/cache/plantel/paredes.jpg" },
  { id: "idvaldez", nombre: "Sebastián Valdez", img: "https://clubaindependiente.com.ar/cache/plantel/valdez.jpg" },
  { id: "idloyola", nombre: "Felipe Loyola", img: "https://clubaindependiente.com.ar/cache/plantel/loyola.jpg" },
  { id: "idirastorza", nombre: "Jonathan De Irastorza", img: "https://clubaindependiente.com.ar/cache/plantel/de-irastorza.jpg" },
  { id: "idvera", nombre: "Federico Vera", img: "https://clubaindependiente.com.ar/cache/plantel/vera.jpg" },
  { id: "idfreire", nombre: "Nicolás Freire", img: "https://clubaindependiente.com.ar/cache/plantel/freire.jpg" },
  { id: "idzabala", nombre: "Facundo Zabala", img: "https://clubaindependiente.com.ar/cache/plantel/zabala.jpg" },
  { id: "idmilton", nombre: "Milton Valenzuela", img: "https://clubaindependiente.com.ar/cache/plantel/valenzuela.jpg" },
  { id: "idleo", nombre: "Leonardo Godoy", img: "https://clubaindependiente.com.ar/cache/plantel/godoy.jpg" },
  { id: "idcabral", nombre: "Luciano Cabral", img: "https://clubaindependiente.com.ar/cache/plantel/cabral.jpg" },
  { id: "idcedres", nombre: "Rodrigo Cedrés", img: "https://clubaindependiente.com.ar/cache/plantel/fernandez-cedres.jpg" },
  { id: "idgaldames", nombre: "Pablo Galdames", img: "https://clubaindependiente.com.ar/cache/plantel/galdames.jpg" },
  { id: "idmarcone", nombre: "Iván Marcone", img: "https://clubaindependiente.com.ar/cache/plantel/marcone.jpg" },
  { id: "idmillan", nombre: "Lautaro Millán", img: "https://clubaindependiente.com.ar/cache/plantel/millan.jpg" },
  { id: "idtarzia", nombre: "Diego Tarzia", img: "https://clubaindependiente.com.ar/cache/plantel/tarzia.jpg" },
  { id: "idmancu", nombre: "Federico Mancuello", img: "https://clubaindependiente.com.ar/cache/plantel/mancuello.jpg" },
  { id: "idavalos", nombre: "Gabriel Ávalos", img: "https://clubaindependiente.com.ar/cache/plantel/avalos.jpg" },
  { id: "idmontiel", nombre: "Santiago Montiel", img: "https://clubaindependiente.com.ar/cache/plantel/montiel.jpg" },
  { id: "idpusseto", nombre: "Ignacio Pussetto", img: "https://clubaindependiente.com.ar/cache/plantel/pussetto.jpg" },
  { id: "idmazzanti", nombre: "Walter Mazzanti", img: "https://clubaindependiente.com.ar/cache/plantel/mazzantti.jpg" },
  { id: "idabaldo", nombre: "Matias Abaldo", img: "https://clubaindependiente.com.ar/cache/plantel/abaldo.jpg" }
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

