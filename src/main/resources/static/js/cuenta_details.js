const VOLVER = document.getElementById("appVolver");

VOLVER.addEventListener("click", () =>
{
    const LINK = new URL(`/caja`, window.location.origin);
    
    window.location.href = LINK;
});