const COMPRA_HISTORIAL_VOLVER = document.getElementById("compraHistorialVolver");

COMPRA_HISTORIAL_VOLVER.addEventListener("click", () =>
{
    const LINK = new URL("/compra", window.location.origin);
    
    window.location.href = LINK;
});