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

// PAGE REDIRECTION FUNCTION

function goToPage(buttonId)
{   
    let ID_PAGINA = "";

    switch (buttonId)
    {
        case "INICIO":
            // window.location.href = "./";
            ID_PAGINA = "";
            break;
        case "CAJA":
            // window.location.href = "./caja";
            ID_PAGINA = "caja";
            break;
        case "VENTAS":
            // window.location.href = "./venta";
            ID_PAGINA = "venta";
            break;
        case "PRODUCTOS":
            // window.location.href = "./producto";
            ID_PAGINA = "producto";
            break;
        case "IMPORTACION":
            // window.location.href = "./proveedor";
            ID_PAGINA = "importacion";
            break;
        case "COMPRAS":
            // window.location.href = "./compra";
            ID_PAGINA = "compra";
            break;
        case "USUARIOS":
            // window.location.href = "./usuario";
            ID_PAGINA = "usuario";
            break;
    
        default:
            console.log(`ERROR: ${buttonId} no pareciera ser una página válida!`);
            return;
    }

    const LINK = new URL(`/${ID_PAGINA}`, window.location.origin);
    
    // window.location.href = url;
    window.location.href = LINK;
}
// **************************************************************

// EDITOR GENERAL BUTTON

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

// MODAL FUNCTIONS

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

    /*
        When the user presses "escape" button, close the modal.

        NOTA: Dejé comentado esto hasta encontrar una mejor forma de implementarlo, ya que algunos modales necesitan NO tener esta funcionalidad particularmente.
    */

    // modalQueQuieroMostrar.addEventListener("keydown", (e) =>
    // {
    //     if (e.key === "Escape")
    //     {
    //       e.preventDefault();
    //       ocultarModal(buttonId);
    //     }
    // });
}

function ocultarModal(buttonId)
{
    // Hide the modal
    const modalQueQuieroOcultar = document.getElementById(buttonId);
    modalQueQuieroOcultar.classList.remove("show");
    modalQueQuieroOcultar.style.display = "none";
    modalQueQuieroOcultar.setAttribute("aria-hidden", "true");
}
// **************************************************************