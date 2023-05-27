const body = document.body;
const navDiv = document.querySelectorAll(".navDiv");
const footer = document.querySelector("footer");

navDiv.forEach(element => {
    element.addEventListener("click", (e) =>
    {
        goToApp(e.target.textContent);
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