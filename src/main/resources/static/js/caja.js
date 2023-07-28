// DETALLES BUTTON

const DETALLES_BUTTONS = document.querySelectorAll(".appCajaDetalles");

DETALLES_BUTTONS.forEach(element => 
{
    element.addEventListener("click", () =>
    {
        const ID_CUENTA = element.getAttribute("data-id-cuenta");
        const LINK = new URL(`/caja/${ID_CUENTA}`, window.location.origin);
        
        window.location.href = LINK;
    });
});
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