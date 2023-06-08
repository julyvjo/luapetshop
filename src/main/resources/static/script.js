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
        element.addEventListener("click", (e) =>
        {
            goToPage(e.target.textContent);
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
    const cleanURL = url.split(/[?]/)[0];
    window.location.href = `${cleanURL}?nombre=${contenido}`;
}

// GENERAL EDIT BUTTON

const editorGeneral = document.getElementById('botonEditorGeneral');

if (editorGeneral)
{
    botonEditorGeneral.addEventListener("click", (e) =>
    {
        abrirEditor();
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
            abrirEditor();
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
            abrirEditor();
        });    
    });
}
// **************************************************************

function abrirEditor()
{
    const modalId = "modalGeneral";
    mostrarModal(modalId);
}

function mostrarModal(buttonId)
{
    // Show the modal
    const modalQueQuieroMostrar = document.getElementById(buttonId);
    modalQueQuieroMostrar.classList.add("show");
    modalQueQuieroMostrar.style.display = "block";
    modalQueQuieroMostrar.removeAttribute("aria-hidden");
}

function ocultarModal(buttonId)
{
    // Hide the modal
    const modalQueQuieroMostrar = document.getElementById(buttonId);
    modalQueQuieroMostrar.classList.remove("show");
    modalQueQuieroMostrar.style.display = "none";
    modalQueQuieroMostrar.setAttribute("aria-hidden", "true");
}