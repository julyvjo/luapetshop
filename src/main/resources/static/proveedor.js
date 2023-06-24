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