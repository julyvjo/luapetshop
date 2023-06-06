const body = document.body;
const headerNav = document.getElementById('headerNav');
const headerNavDivChildren = headerNav.querySelectorAll('div');
const nav = document.getElementById('nav');
const app = document.getElementById('app');
const botonBuscador = document.getElementById('botonBuscador');
const inputBuscador = document.getElementById('inputBuscador');
const editorGeneral = document.getElementById('botonEditorGeneral');

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

if (botonBuscador)
{
    botonBuscador.addEventListener("click", (e) =>
    {
        chequearBuscador();
    });
}

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

if (editorGeneral)
{
    botonEditorGeneral.addEventListener("click", (e) =>
    {
        abrirEditor();
    });
}

function abrirEditor()
{
    // Create modal container
    const modalContainer = document.createElement("div");
    modalContainer.classList.add("modal", "fade");
    modalContainer.setAttribute("tabindex", "-1");
    modalContainer.setAttribute("role", "dialog");
    modalContainer.setAttribute("aria-labelledby", "editorModalLabel");
    modalContainer.setAttribute("aria-hidden", "true");

    // Create modal dialog
    const modalDialog = document.createElement("div");
    modalDialog.classList.add("modal-dialog");
    modalDialog.setAttribute("role", "document");

    // Create modal content
    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    // Create modal header
    const modalHeader = document.createElement("div");
    modalHeader.classList.add("modal-header");

    // Create modal title
    const modalTitle = document.createElement("h5");
    modalTitle.classList.add("modal-title");
    modalTitle.setAttribute("id", "editorModalLabel");
    modalTitle.textContent = "Editor";

    // Create modal close button
    const modalCloseButton = document.createElement("button");
    modalCloseButton.classList.add("close");
    modalCloseButton.setAttribute("type", "button");
    modalCloseButton.setAttribute("data-dismiss", "modal");
    modalCloseButton.setAttribute("aria-label", "Close");
    modalCloseButton.innerHTML = `<span aria-hidden="true">&times;</span>`;

    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(modalCloseButton);

    // Create modal body
    const modalBody = document.createElement("div");
    modalBody.classList.add("modal-body");
    modalBody.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

    // Append modal components
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalDialog.appendChild(modalContent);
    modalContainer.appendChild(modalDialog);

    // Append modal container to #app
    app.appendChild(modalContainer);

    // Show the modal
    modalContainer.classList.add("show");
    modalContainer.style.display = "block";
    modalContainer.removeAttribute("aria-hidden");

    // Add click event listener to close the modal
    modalCloseButton.addEventListener("click", () =>
    {
        modalContainer.classList.remove("show");
        modalContainer.style.display = "none";
        modalContainer.setAttribute("aria-hidden", "true");
    });
}