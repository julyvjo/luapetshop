// HISTORIAL BUTTON

const historialVenta = document.getElementById('botonHistorialVenta');

if (historialVenta)
{
    historialVenta.addEventListener("click", (e) =>
    {
        mostrarModal("historialVenta");
    });

    // I implemented it like this because script.js has "defer" attribute.
    // If in the future this changes, this needs to be implemented inside an Event Listener.
}
// **************************************************************

// SEARCHBAR INPUT

const buscadorInput = document.getElementById('buscadorInput');

if (buscadorInput)
{
    buscadorInput.focus();

    buscadorInput.addEventListener("input", (e) =>
    {
        chequearBuscador();
        // console.log(e.target.value.toLowerCase());
    });

    // I implemented it like this because script.js has "defer" attribute.
    // If in the future this changes, this needs to be implemented inside an Event Listener.
}
// **************************************************************

// SEARCHBAR BUTTON

const buscadorButton = document.getElementById('buscadorButton');

if (buscadorButton)
{
    buscadorButton.addEventListener("click", (e) =>
    {
        chequearBuscador();
    });

    // I implemented it like this because script.js has "defer" attribute.
    // If in the future this changes, this needs to be implemented inside an Event Listener.
}
// **************************************************************

// SEARCH FUNCTIONS

async function chequearBuscador()
{
    if (buscadorInput.value !== "")
    {
        const resultadoBusqueda = await buscarEnProducto(buscadorInput.value);
        mostrarResultadosBusqueda(resultadoBusqueda);
    }
    else
    {
        console.log("WARNING: Empty search bar!");
        ocultarResultadosBusqueda();
    }
}

async function fetchJSON(URL) {
    const response = await fetch(URL);
    const res = await response.json();
    return res;
}

/* VERSIÓN JULY
async function buscarEnVentas(){
    const URL = "/api/producto"
    let url = new URL(URL);
    let nombre = "1" //aca habria que inyectar el input
    
    url.searchParams.set('nombre', nombre);

    //setear el event listener para detectar que el search cambia 
    //(sino usar el boton de buscar)
    //el event listener llama a una funcion que dispara la busqueda de productos
    //una vez obtenidos los productos, mostrarlos en la interfaz con un dropdown
    //o similar, lo que sea mas facil
    let productos = await fetchJSON(url.toString());

    console.log(productos)

}
*/

/* VERSIÓN CHAT GPT
async function buscarEnProducto(nombre) {
    const apiURL = "/api/producto";
    const url = new URL(apiURL, window.location.origin + "/../");
    
    url.searchParams.set('nombre', nombre);
  
    try {
      const response = await fetch(url); // Send a GET request to the API
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json(); // Parse the response data as JSON
  
      // Handle the data here (e.g., display the results)
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }
*/
// **************************************************************

async function buscarEnProducto(nombre)
{
    const apiURL = "/api/producto"

    // 
    let url = new URL(apiURL, window.location.origin + "/../");
    
    url.searchParams.set('nombre', nombre);

    // Setear el event listener para detectar que el search cambia (sino usar el boton de buscar)

    // El event listener llama a una funcion que dispara la busqueda de productos
    
    // Una vez obtenidos los productos, mostrarlos en la interfaz con un dropdown o similar.

    let productos = await fetchJSON(url.toString());

    // console.log(productos);
    return productos;
}

function mostrarResultadosBusqueda(resultado)
{
    const resultadosBuscador = document.getElementById("resultadosBuscador");

    if (!resultadosBuscador)
    {
        console.log("ERROR: It seems like no #resultadosBuscador element exists in this page!");
        return;
    }

    resultadosBuscador.style.display = 'block';
    
    while (resultadosBuscador.firstChild)
    {
        resultadosBuscador.removeChild(resultadosBuscador.firstChild);
    }

    if (resultado.length < 1)
    {
        console.log("WARNING: No results found!");
        buscador.style.borderRadius = "1vw";
        resultadosBuscador.style.display = 'none';
    }
    else
    {
        const resultadoBuscadorLista = document.createElement('ul');
        resultadoBuscadorLista.style.margin = 0;
        resultadoBuscadorLista.style.listStyleType = "none";
        resultado.forEach((e) =>
        {
            // console.log(e);
            const resultadoBuscadorIndividual = document.createElement('li');
            resultadoBuscadorIndividual.style.marker
            resultadoBuscadorIndividual.textContent = e.nombre;
            resultadoBuscadorLista.appendChild(resultadoBuscadorIndividual);
        });

        resultadosBuscador.appendChild(resultadoBuscadorLista);
        // console.table(resultado);
        // console.log(resultado);
    }
}

function ocultarResultadosBusqueda()
{
    const resultadosBuscador = document.getElementById("resultadosBuscador");

    if (!resultadosBuscador)
        return;

    while (resultadosBuscador.firstChild)
    {
        resultadosBuscador.removeChild(resultadosBuscador.firstChild);
    }

    resultadosBuscador.style.display = 'none';
}