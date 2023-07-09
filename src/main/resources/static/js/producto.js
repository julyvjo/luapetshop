// INDIVIDUAL EDIT BUTTON

const arrayBotonEditar = document.querySelectorAll('.botonEditar');

if (arrayBotonEditar.length !== 0)
{
    arrayBotonEditar.forEach(fila =>
    {
        fila.addEventListener("click", (e) =>
        {
            mostrarModal("modalEditorLinea");
            cargarEditor(fila);
        });    
    });

    // I implemented it like this because script.js has "defer" attribute.
    // If in the future this changes, this needs to be implemented inside an Event Listener.
}

function cargarEditor(fila)
{
    /*
        No es muy prolijo, pero con esto evito agregar atributos al html o llamar a la DB.
    */

    const tr = fila.parentNode.parentNode.parentNode;
    const h5 = tr.querySelectorAll("h5");

    // h5[0] = imagen; h5[h5.length - 1] = botón editar.
    
    // h5.forEach((element, index) =>
    // {
    //     if (index === 0 || index === h5.length - 1)
    //         return;

    //     console.log(element.textContent);
    // });

    const nombreProducto = document.getElementById("modalEditorLineaNombreProducto");
    nombreProducto.value = h5[1].textContent;

    const descripcionProducto = document.getElementById("modalEditorLineaDescripcionProducto");
    descripcionProducto.value = h5[2].textContent;

    const precioCompra = document.getElementById("modalEditorLineaPrecioCompra");
    precioCompra.value = h5[3].textContent;

    const porcentajeGanancia = document.getElementById("modalEditorLineaPorcentajeGanancia");
    porcentajeGanancia.value = h5[4].textContent;

    const gananciaProducto = document.getElementById("modalEditorLineaGananciaProducto");
    gananciaProducto.value = h5[5].textContent;

    //  Tipo de stock aún está pendiente saber cómo se va a implementar.
    // const tipoStock = document.getElementById("modalEditorLineaNombreProducto");

    const cantidadStock = document.getElementById("modalEditorLineaCantidadStock");
    cantidadStock.value = h5[6].textContent;

    //  Aún queda pendiente ver cómo implementar las imágenes de cada producto.
    //  const imagenProducto = document.getElementById("modalEditorLineaNombreProducto");
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
    let actualurl = new URL(window.location.href);
    let nombre = actualurl.searchParams.get('nombre');
    // console.log('parametro nombre =' + nombre);

    actualurl.searchParams.set('nombre',contenido);
    actualurl.searchParams.set('page',1);
    // console.log('nueva url =' + actualurl.toString());
    window.location.href = actualurl.toString();        
}
// **************************************************************