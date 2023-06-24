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
// **************************************************************

/*  || TO-DO LIST

||  GENERAL
    -   Chequear si es correcto implementar los JS de la forma que hice esto (no se si es necesario usar "import" o algo así en los otros archivos para que usen las funciones que defina acá)
    -   Preguntar si se puede reubicar todo lo referido a BOOTSTRAP, así organizo mejor CSS y JS.

||  PRODUCTO
    -   Ajustar formato del formulario "Nuevo Producto".

||  VENTA
    -   BUSCADOR; Evitar múltiples submit con inputs idénticos (por ej. si apreto enter más de una vez por accidente)
    -   DROPDOWN DE RESULTADOS PARCIALES; probablemente sea necesario cambiar a un formulario / imitar cómo funcionan los autocompletados de navegadores/buscadores como YT, Google, etc.
    -   DROPDOWN DE RESULTADOS PARCIALES; debería ser un pop-up por arriba de la tabla, no tiene que mover las demás cosas.

||  CAJA
    -   Debería generarse un scroll horizontal en caso de agregar otro fondo.
    -   Anotar qué información tiene que mostrarse en cada fondo (ideal: sin overflow)
    -   Implementar botón "Detalles" para abrir un modal con la información completa, en cada fondo.

||  PROVEEDOR
    -   Chequear qué información debería mostrarse en la tabla.
    -   Implementar buscador (chequear si además habría que hacer algo desde backend)
    -   Implementar "agregarProveedor" (botón modal que debería ser formulario para agregar un proveedor)

||  COMPRA
    -   Chequear si sería válido implementar "agregarProveedor" de PROVEEDOR también acá.
    -   Implementar correctamente formulario (Necesita generar un JSON ?)

||  USUARIO
    -   Analizar si realmente es necesario implementar esta sección (potencial conflico si hay empleados)
*/