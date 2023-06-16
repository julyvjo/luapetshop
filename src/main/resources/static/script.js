// HEADER NAVBAR

const headerNav = document.getElementById('headerNav');
const headerNavDivChildren = headerNav.querySelectorAll('div');

headerNavDivChildren.forEach(element =>
{
    element.addEventListener("click", (e) =>
    {
        goToPage(e.target.textContent);
    });
});
// **************************************************************

// INDEX.HTML NAVBAR

const nav = document.getElementById('nav');

if (nav)
{
    const navDivChildren = nav.querySelectorAll('div');

    navDivChildren.forEach(element => 
    {
        // Made this mess so every child of 'element' also triggers this event.
        const elementId = document.getElementById(`${element.id}`);
        
        // Note that without getting the element by its id SHOULD work, but somehow it doesn't :)
        elementId.addEventListener("click", (e) =>
        {
            goToPage(`${element.id}`);
        });
    });

    // I implemented it like this because script.js has "defer" attribute.
    // If in the future this changes, this needs to be implemented inside an Event Listener.
}
// **************************************************************

function goToPage(buttonId)
{
    switch (buttonId)
    {
        case "VOLVER":
            window.location.href = "./";
            break;
        case "CAJA":
            window.location.href = "./caja";
            break;
        case "VENTAS":
            window.location.href = "./venta";
            break;
        case "PRODUCTOS":
            window.location.href = "./producto";
            break;
        case "PROVEEDORES":
            window.location.href = "./proveedor";
            break;
        case "COMPRAS":
            window.location.href = "./compra";
            break;
        case "USUARIOS":
            window.location.href = "./usuario";
            break;
    
        default:
            console.log(`ERROR: ${buttonId} seems to not be a valid page!`);
            break;
    }

    window.location.href = url;
}

// GENERAL EDIT BUTTON

const editorGeneral = document.getElementById('botonEditorGeneral');

if (editorGeneral)
{
    editorGeneral.addEventListener("click", (e) =>
    {
        mostrarModal("modalGeneral");
    });

    // I implemented it like this because script.js has "defer" attribute.
    // If in the future this changes, this needs to be implemented inside an Event Listener.
}
// **************************************************************

// INDIVIDUAL EDIT BUTTON

const arrayBotonEditar = document.querySelectorAll('.botonEditar');

if (arrayBotonEditar.length !== 0)
{
    arrayBotonEditar.forEach(element =>
    {
        element.addEventListener("click", (e) =>
        {
            mostrarModal("modalEditorLinea");
        });    
    });

    // I implemented it like this because script.js has "defer" attribute.
    // If in the future this changes, this needs to be implemented inside an Event Listener.
}
// **************************************************************

// PRODUCT PHOTO BUTTON

const arrayBotonFoto = document.querySelectorAll('.botonFoto');

if (arrayBotonFoto.length !== 0)
{
    arrayBotonFoto.forEach(element =>
    {
        element.addEventListener("click", (e) =>
        {
            mostrarModal("modalFoto");
        });    
    });

    // I implemented it like this because script.js has "defer" attribute.
    // If in the future this changes, this needs to be implemented inside an Event Listener.
}
// **************************************************************

// NUEVO PRODUCTO BUTTON

const nuevoProducto = document.getElementById('botonNuevoProducto');

if (nuevoProducto)
{
    nuevoProducto.addEventListener("click", (e) =>
    {
        mostrarModal("modalNuevoProducto");
    });

    // I implemented it like this because script.js has "defer" attribute.
    // If in the future this changes, this needs to be implemented inside an Event Listener.
}
// **************************************************************

// NUEVO PROVEEDOR BUTTON

const nuevoProveedor = document.getElementById('botonNuevoProveedor');

if (nuevoProveedor)
{
    nuevoProveedor.addEventListener("click", (e) =>
    {
        mostrarModal("modalNuevoProveedor");
    });

    // I implemented it like this because script.js has "defer" attribute.
    // If in the future this changes, this needs to be implemented inside an Event Listener.
}
// **************************************************************

// CERRAR CAJA BUTTON

const cerrarCaja = document.getElementById('botonCerrarCaja');

if (cerrarCaja)
{
    cerrarCaja.addEventListener("click", (e) =>
    {
        mostrarModal("modalCerrarCaja");
    });

    // I implemented it like this because script.js has "defer" attribute.
    // If in the future this changes, this needs to be implemented inside an Event Listener.
}
// **************************************************************

function mostrarModal(buttonId)
{
    // Show the modal
    const modalQueQuieroMostrar = document.getElementById(buttonId);
    modalQueQuieroMostrar.classList.add("show");
    modalQueQuieroMostrar.style.display = "block";
    modalQueQuieroMostrar.removeAttribute("aria-hidden");

    // Automatically focus the modal
    modalQueQuieroMostrar.focus();

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event)
    {
        if (event.target == modalQueQuieroMostrar)
        {
            ocultarModal(buttonId);
        }
    }

    // When the user presses the escape key, close the modal
    modalQueQuieroMostrar.addEventListener("keydown", (e) =>
    {
        if (e.key === "Escape")
        {
          e.preventDefault();
          ocultarModal(buttonId);
        }
    });
}

function ocultarModal(buttonId)
{
    // Hide the modal
    const modalQueQuieroOcultar = document.getElementById(buttonId);
    modalQueQuieroOcultar.classList.remove("show");
    modalQueQuieroOcultar.style.display = "none";
    modalQueQuieroOcultar.setAttribute("aria-hidden", "true");
}

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
            // chequearBuscador();
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

function chequearBuscador()
{
    if (inputBuscador.value !== "")
        // buscadorGoToPage(inputBuscador.value);
        buscarEnProducto(inputBuscador.value);
    else
        console.log("WARNING: Empty search bar!");
}

function buscadorGoToPage(contenido)
{
    let actualurl = new URL(window.location.href);
    let nombre = actualurl.searchParams.get('nombre');
    // console.log('parametro nombre =' + nombre);

    actualurl.searchParams.set('nombre',contenido);
    actualurl.searchParams.set('page',1);
    // console.log('nueva url =' + actualurl.toString());
    window.location.href = actualurl.toString();        
}

// **************************************************************

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

    console.log(productos);
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