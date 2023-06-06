const body = document.body;
const headerNav = document.getElementById('headerNav');
const headerNavDivChildren = headerNav.querySelectorAll('div');
const nav = document.getElementById('nav');
const botonBuscador = document.getElementById('botonBuscador');
const inputBuscador = document.getElementById('inputBuscador');
const editorGeneral = document.getElementById('botonEditorGeneral');

if (inputBuscador)
{
    inputBuscador.focus();

    inputBuscador.addEventListener("keydown", (e) =>
    {
        if (e.key === "Enter")
        {
          e.preventDefault();
          const url = window.location.href;
          const contenido = inputBuscador.value;
          buscadorGoToPage(url, contenido);
        }
    });

    // I implemented it like this because script.js has "defer" attribute.
    // If in the future this changes, this needs to be implemented inside an Event Listener.
}

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

headerNavDivChildren.forEach(element =>
{
    element.addEventListener("click", (e) =>
    {
        // goToApp(e.target.textContent);
        goToPage(e.target.textContent);
    });
});

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

botonBuscador.addEventListener("click", (e) =>
{
    const url = window.location.href;
    const contenido = inputBuscador.value;
    buscadorGoToPage(url, contenido);
});

function buscadorGoToPage(url, contenido)
{
    window.location.href = `${url}?nombre=${contenido}`;
}

botonEditorGeneral.addEventListener("click", (e) =>
{
    abrirEditor();
});

function abrirEditor()
{

}