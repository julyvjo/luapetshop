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
}
// **************************************************************

function chequearBuscador()
{
    const url = window.location.href;
    const contenido = inputBuscador.value;

    if (contenido !== "")
        buscadorGoToPage(url, contenido);
    else
        console.log("ERROR: Empty search bar!");
}

function buscadorGoToPage(url, contenido)
{
    // const cleanURL = url.split(/[?]/)[0];
    // const cleanURL = url.split(/\?n/)[0]; // split literally in "?n"
    // window.location.href = `${cleanURL}?nombre=${contenido}`;
    // window.location.href = `${cleanURL}?nombre=${contenido}?page=1`;

    //Nuevo seteo de url para busquedas
    let actualurl = new URL(window.location.href);
    let nombre = actualurl.searchParams.get('nombre');
    console.log('parametro nombre =' + nombre)
    if (contenido){
        actualurl.searchParams.set('nombre',contenido)
        actualurl.searchParams.set('page',1)
        console.log('nueva url =' + actualurl.toString())
        window.location.href = actualurl.toString()
    }
        
}

// GENERAL EDIT BUTTON

const editorGeneral = document.getElementById('botonEditorGeneral');

if (editorGeneral)
{
    botonEditorGeneral.addEventListener("click", (e) =>
    {
        mostrarModal("modalGeneral");
    });
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