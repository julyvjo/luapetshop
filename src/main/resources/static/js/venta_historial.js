const VENTA_HISTORIAL_VOLVER = document.getElementById("ventaHistorialVolver");

VENTA_HISTORIAL_VOLVER.addEventListener("click", () =>
{
    const LINK = new URL("/venta", window.location.origin);
    
    window.location.href = LINK;
});