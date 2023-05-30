const body = document.body;
const navDiv = document.querySelectorAll(".navDiv");
const footer = document.querySelector("footer");

navDiv.forEach(element => {
    element.addEventListener("click", (e) =>
    {
        // goToApp(e.target.textContent);
        goToPage(e.target.textContent);
    });
});

function goToApp(buttonId)
{    
    let appContainer = document.getElementById("app");
    
    // If an appContainer element does not exist; create a container
    if (appContainer === null)
    {
        const container = document.createElement("div");
        container.textContent = `Acá iría la acción o app para ${buttonId}`;
        container.id = "app";

        body.insertBefore(container, footer);
        
        // Here I would code the actual app invoke
    }
    else
    {
        // Potentially could add here a transition between apps

        appContainer.textContent = `Acá iría la acción o app para ${buttonId}`;

        // Here I would code the actual app invoke
    }
}

function goToPage(buttonId)
{
    switch (buttonId)
    {
        case "VOLVER":
            window.location.href = "./landing.html";
            break;
        case "CUENTAS":
            window.location.href = "./cuentas.html";
            break;
        case "VENTAS":
            window.location.href = "./ventas.html";
            break;
        case "PRODUCTOS":
            window.location.href = "./productos.html";
            break;
        case "PROVEEDORES":
            window.location.href = "./proveedores.html";
            break;
        case "COMPRAS":
            window.location.href = "./compras.html";
            break;
        case "USUARIOS":
            window.location.href = "./usuarios.html";
            break;
    
        default:
            console.log(`ERROR: ${buttonId} seems to not be a valid page!`);
            break;
    }

    window.location.href = url;
}