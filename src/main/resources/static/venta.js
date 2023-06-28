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
                const idResultado = listaResultados[posicionListaResultados].getAttribute("data-id-resultado");
                
                if ( estaEnCarrito(resultadoBusqueda[idResultado].id_producto) )
                {
                    console.log("ERROR: The selected item is already in the cart!");
                    return;
                }

                carritoCrearFila(resultadoBusqueda[idResultado]);
            
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

let resultadoBusqueda = {};

async function chequearBuscador()
{
    if (buscadorInput.value !== "")
    {
        resultadoBusqueda = await buscarEnProducto(buscadorInput.value);
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


        resultado.forEach((e, index) =>
        {
            // console.log(e);
            const resultadoBuscadorIndividual = document.createElement('li');
            resultadoBuscadorIndividual.setAttribute("data-id-resultado", index);
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

// CARRITO VENTA FUNCTIONS

let carritoVenta = {};  //  ESTE OBJETO ES LO QUE SE ENVIARÍA AL BACK AL FINALIZAR COMPRA

function estaEnCarrito(id_producto) //  id_producto es el nombre de la propiedad en la DB
{
    const listadoCarrito = document.querySelectorAll("tr");

    for (let index = 0; index < listadoCarrito.length; index++)
    {
        const tieneElAtributo = listadoCarrito[index].hasAttribute("data-id-producto");

        const valorAtributo = listadoCarrito[index].getAttribute("data-id-producto");
        
        //  Resulta necesario convertir ambos valores a String porque originalmente no conozco su tipo de valor.

        if (tieneElAtributo && valorAtributo.toString() === id_producto.toString())
            return true;
    }

    return false;
}

function carritoCrearFila(resultadoBusquedaProducto)
{
    const carrito = document.getElementById("table");
    
    const fila = document.createElement("tr");
    fila.setAttribute("data-id-producto", resultadoBusquedaProducto.id_producto);

    // COLUMNA 1 - NOMBRE

        let data = document.createElement("td");
            
        let h5 = document.createElement("h5");
        h5.classList.add("py-2");

        h5.textContent = resultadoBusquedaProducto.nombre;

        data.appendChild(h5);

        fila.appendChild(data);

    // COLUMNA 2 - PRECIO UNITARIO

        data = document.createElement("td");

        const precioUnitario = (resultadoBusquedaProducto.precio_compra * ( 1 + resultadoBusquedaProducto.rentabilidad)).toFixed(2);
            
        h5 = document.createElement("h5");
        h5.classList.add("py-2");
        h5.textContent = precioUnitario;

        data.appendChild(h5);

        fila.appendChild(data);

    // COLUMNA 3 - CANTIDAD

        data = document.createElement("td");

        const cantidadInput = document.createElement("input");
        cantidadInput.classList.add("py-2");
        cantidadInput.id = "buscadorInput";
        cantidadInput.setAttribute("type", "number");
        cantidadInput.setAttribute("autocomplete", "off");
        cantidadInput.value = 1;

        data.appendChild(cantidadInput);

        fila.appendChild(data);

    // COLUMNA 4 - SUBTOTAL

        data = document.createElement("td");

        h5 = document.createElement("h5");
        h5.id = `subtotal-id-${fila.getAttribute("data-id-producto")}`;
        h5.classList.add("py-2");
        h5.textContent = precioUnitario * cantidadInput.value;

        data.appendChild(h5);

        fila.appendChild(data);

        cantidadInput.addEventListener("input", () =>
        {
            document.getElementById(`subtotal-id-${fila.getAttribute("data-id-producto")}`).textContent = (precioUnitario * cantidadInput.value).toFixed(2);
        });

    // AGREGAR FILA AL CARRITO

    carrito.appendChild(fila);
}
// **************************************************************

// FINALIZAR COMPRA
onclick="window.confirm('Estás por finalizar la compra... ¿Estás seguro?')"