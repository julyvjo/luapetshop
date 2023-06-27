const body = document.body;
const footer = document.querySelector("footer");
const headerNav = document.getElementById('headerNav');
const headerNavDivChildren = headerNav.querySelectorAll('div');
const nav = document.getElementById('nav');

if (nav)
{
    const navDivChildren = nav.querySelectorAll('div');

    navDivChildren.forEach(element => {
        element.addEventListener("click", (e) =>
        {
            goToPage(e.target.textContent);
        });
    });
}

headerNavDivChildren.forEach(element => {
    element.addEventListener("click", (e) =>
    {
        goToPage(e.target.textContent);
    });
});

function goToApp(buttonId)
{    
    let appContainer = document.getElementById("app");
    
    // If an appContainer element does not exist; create a container
    if (appContainer === null)
    {
        const container = document.createElement("div");
        container.textContent = `Acá iría la acción o app para ${buttonId}`;
        container.id = "app";

        body.insertBefore(container, footer);
        
        // Here I would code the actual app invoke
    }
    else
    {
        // Potentially could add here a transition between apps

        appContainer.textContent = `Acá iría la acción o app para ${buttonId}`;

        // Here I would code the actual app invoke
    }
}

function goToPage(buttonId)
{
    switch (buttonId)
    {
        case "VOLVER":
            window.location.href = "./index.html";
            break;
        case "CAJA":
            window.location.href = "./caja.html";
            break;
        case "VENTAS":
            window.location.href = "./venta.html";
            break;
        case "PRODUCTOS":
            window.location.href = "./producto.html";
            break;
        case "PROVEEDORES":
            window.location.href = "./proveedor.html";
            break;
        case "COMPRAS":
            window.location.href = "./compra.html";
            break;
        case "USUARIOS":
            window.location.href = "./usuario.html";
            break;
    
        default:
            console.log(`ERROR: ${buttonId} seems to not be a valid page!`);
            break;
    }

    window.location.href = url;
}


// **********************

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
    let posicionListaResultados = -1;   //  Para navegar entre los resultados de la búsqueda.
    let busquedaActual = "";            //  Para recordar qué búsqueda generó la lista de resultados.

    buscadorInput.addEventListener("input", (e) =>
    {
        chequearBuscador();
        posicionListaResultados = -1;
        busquedaActual = buscadorInput.value;
        // console.log(e.target.value.toLowerCase());
    });

    buscadorInput.addEventListener("keydown", (e) =>
    {
        if (buscadorInput.value === "")
            return;

        const listaResultados = document.querySelectorAll("li");

        if (e.key === "Enter")
        {
            e.preventDefault();
            
            if (posicionListaResultados != -1)
            {
                carritoCrearFila(buscadorInput.value); //  VALIDAR QUE NO EXISTA EN CARRITO
                
                //  Reiniciar buscador
                buscadorInput.value = "";
                ocultarResultadosBusqueda();
                posicionListaResultados = -1;
                busquedaActual = buscadorInput.value;
            }

            return;
        }

        //  Acá abajo hay código que pareciera estar innecesariamente repetido...
        //  pero hay bugs que aparecen solamente por no aislar la acción a estas teclas específicas.

        if (e.key === "ArrowUp")
        {
            e.preventDefault();

            if (posicionListaResultados != -1)
            {
                listaResultados[posicionListaResultados].style.backgroundColor = "var(--primary)";
                listaResultados[posicionListaResultados].style.color = "var(--secondary)";
            }

            if (listaResultados[(posicionListaResultados - 1)])
            {
                posicionListaResultados--;

                listaResultados[posicionListaResultados].style.backgroundColor = "var(--accent)";
                listaResultados[posicionListaResultados].style.color = "var(--primary)";
                buscadorInput.value = listaResultados[posicionListaResultados].textContent;
            }
            else
            {
                //  Se presionó "ArrowUp" en el primer resultado => volver a búsqueda original.
                buscadorInput.value = busquedaActual;
                posicionListaResultados = -1;
            }
        }
        else if (e.key === "ArrowDown")
        {
            e.preventDefault();

            if (posicionListaResultados != -1)
            {
                listaResultados[posicionListaResultados].style.backgroundColor = "var(--primary)";
                listaResultados[posicionListaResultados].style.color = "var(--secondary)";
            }

            if (listaResultados[(posicionListaResultados + 1)])
            {
                posicionListaResultados++;

                listaResultados[posicionListaResultados].style.backgroundColor = "var(--accent)";
                listaResultados[posicionListaResultados].style.color = "var(--primary)";
                buscadorInput.value = listaResultados[posicionListaResultados].textContent;
            }
        }
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
        resultadosBuscador.style.display = 'none';
    }
    else
    {
        const resultadoBuscadorLista = document.createElement('ul');
        resultadoBuscadorLista.style.margin = 0;
        resultadoBuscadorLista.style.padding = 0;
        resultadoBuscadorLista.style.listStyleType = "none";
        resultado.forEach((e) =>
        {
            // console.log(e);
            const resultadoBuscadorIndividual = document.createElement('li');
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






// **************

function carritoCrearFila(texto)
{
    const carrito = document.getElementById("table");
    
    const fila = document.createElement("tr");

    for (let columna = 1; columna < 4; columna++)
    {
        const data = document.createElement("td");
        const h5 = document.createElement("h5");
        h5.classList.add("py-2");

        if (columna === 1)
            h5.textContent = texto;
        else
            h5.textContent = "1";
        
        data.appendChild(h5);
        fila.appendChild(data);
    }

    carrito.appendChild(fila);
}