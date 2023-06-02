const body = document.body;
const headerNav = document.getElementById('headerNav');
const headerNavDivChildren = headerNav.querySelectorAll('div');
const nav = document.getElementById('nav');

if (nav)
{
    const navDivChildren = nav.querySelectorAll('div');

    navDivChildren.forEach(element => {
        element.addEventListener("click", (e) =>
        {
            goToPage(e.target.textContent);
        });
    });
}

headerNavDivChildren.forEach(element => {
    element.addEventListener("click", (e) =>
    {
        goToPage(e.target.textContent);
    });
});

function goToPage(buttonId)
{
    switch (buttonId)
    {
        case "VOLVER":
            window.location.href = "./index.html";
            break;
        case "CAJA":
            window.location.href = "./caja.html";
            break;
        case "VENTAS":
            window.location.href = "./venta.html";
            break;
        case "PRODUCTOS":
            window.location.href = "./producto.html";
            break;
        case "PROVEEDORES":
            window.location.href = "./proveedor.html";
            break;
        case "COMPRAS":
            window.location.href = "./compra.html";
            break;
        case "USUARIOS":
            window.location.href = "./usuario.html";
            break;
    
        default:
            console.log(`ERROR: ${buttonId} seems to not be a valid page!`);
            break;
    }

    window.location.href = url;
}