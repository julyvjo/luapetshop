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

const inputBuscador = document.getElementById('inputBuscador');

if (inputBuscador)
{
    inputBuscador.focus();

    inputBuscador.addEventListener("keydown", (e) =>
    {
        if (e.key === "Enter")
        {
          e.preventDefault();
          chequearBuscador();
        }
        else // Maybe I should use some regEx to improve this...
        {
            // e.preventDefault(); // This will come useful when using ctrl/shift/alt modifications
            // chequearBuscador(inputBuscador.value + e.key);
            // console.log(inputBuscador.value + e.key);
        }
    });

    // I implemented it like this because script.js has "defer" attribute.
    // If in the future this changes, this needs to be implemented inside an Event Listener.
}
// **************************************************************

// SEARCHBAR BUTTON

const botonBuscador = document.getElementById('botonBuscador');

if (botonBuscador)
{
    botonBuscador.addEventListener("click", (e) =>
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
    if (inputBuscador.value !== "")
    {
        const resultadoBusqueda = await buscarEnProducto(inputBuscador.value);
        mostrarResultadosBusqueda(resultadoBusqueda);
    }
    else
        console.log("WARNING: Empty search bar!");
}

async function fetchJSON(URL) {
    const response = await fetch(URL);
    const res = await response.json();
    return res;
}

/*
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

    if (resultadosBuscador)
        resultadosBuscador.style.display = 'block';
    else
        console.log("ERROR: It seems like no #resultadosBuscador element exists in this page!");

    if (resultado.length < 1)
        console.log("WARNING: No results found!");
    else
    {
        resultado.forEach((e) =>
        {
            // console.log(e);
            const resultadoBuscadorIndividual = document.createElement('div');
            resultadoBuscadorIndividual.textContent = e.nombre;
            resultadosBuscador.appendChild(resultadoBuscadorIndividual);
        });
        // console.table(resultado);
        // console.log(resultado);
    }
}

/*
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