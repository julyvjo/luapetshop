// INDEX.HTML NAVBAR

const nav = document.getElementById('nav');

if (nav)
{
    const navDivChildren = nav.querySelectorAll('div');

    navDivChildren.forEach(element => 
    {
        // Made this mess so every child of 'element' also triggers this event.
        const elementId = document.getElementById(`${element.id}`);
        
        // Note that without getting the element by its id SHOULD work, but somehow it doesn't :)
        elementId.addEventListener("click", (e) =>
        {
            goToPage(`${element.id}`);
        });
    });

    // I implemented it like this because script.js has "defer" attribute.
    // If in the future this changes, this needs to be implemented inside an Event Listener.
}
// **************************************************************