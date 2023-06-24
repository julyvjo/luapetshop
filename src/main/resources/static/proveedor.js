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

function chequearBuscador()
{
    if (inputBuscador.value !== "")
        buscadorGoToPage(inputBuscador.value);
    else
        console.log("WARNING: Empty search bar!");
}

function buscadorGoToPage(contenido)
{
    console.log("HELLO WORLD");
    // let actualurl = new URL(window.location.href);
    // let nombre = actualurl.searchParams.get('nombre');
    // // console.log('parametro nombre =' + nombre);

    // actualurl.searchParams.set('nombre',contenido);
    // actualurl.searchParams.set('page',1);
    // // console.log('nueva url =' + actualurl.toString());
    // window.location.href = actualurl.toString();        
}
// **************************************************************