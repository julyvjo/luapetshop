// HEADER NAVBAR

const headerNav = document.getElementById('headerNav');
const headerNavDivChildren = headerNav.querySelectorAll('div');

headerNavDivChildren.forEach(element =>
{
    element.addEventListener("click", (e) =>
    {
        goToPage(e.target.textContent);
    });
});
// **************************************************************

// PAGE REDIRECTION FUNCTION

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
// **************************************************************

// EDITOR GENERAL BUTTON

const editorGeneral = document.getElementById('botonEditorGeneral');

if (editorGeneral)
{
    editorGeneral.addEventListener("click", (e) =>
    {
        mostrarModal("modalGeneral");
    });

    // I implemented it like this because script.js has "defer" attribute.
    // If in the future this changes, this needs to be implemented inside an Event Listener.
}
// **************************************************************

// MODAL FUNCTIONS

function mostrarModal(buttonId)
{
    // Show the modal
    const modalQueQuieroMostrar = document.getElementById(buttonId);
    modalQueQuieroMostrar.classList.add("show");
    modalQueQuieroMostrar.style.display = "block";
    modalQueQuieroMostrar.removeAttribute("aria-hidden");

    // Automatically focus the modal
    modalQueQuieroMostrar.focus();

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event)
    {
        if (event.target == modalQueQuieroMostrar)
        {
            ocultarModal(buttonId);
        }
    }

    // When the user presses the escape key, close the modal
    modalQueQuieroMostrar.addEventListener("keydown", (e) =>
    {
        if (e.key === "Escape")
        {
          e.preventDefault();
          ocultarModal(buttonId);
        }
    });
}

function ocultarModal(buttonId)
{
    // Hide the modal
    const modalQueQuieroOcultar = document.getElementById(buttonId);
    modalQueQuieroOcultar.classList.remove("show");
    modalQueQuieroOcultar.style.display = "none";
    modalQueQuieroOcultar.setAttribute("aria-hidden", "true");
}
// **************************************************************

/*  || TO-DO LIST

||  GENERAL
    -   Chequear si es correcto implementar los JS de la forma que hice esto (no se si es necesario usar "import" o algo así en los otros archivos para que usen las funciones que defina acá)
    -   Preguntar si se puede reubicar todo lo referido a BOOTSTRAP, así organizo mejor CSS y JS.
    -   CSS; considerar usar sombras para mejorar el formato.

||  PRODUCTO
    -   PREGUNTAR; Implementar estética del buscador en VENTA?
    -   NUEVO PROUDCTO; Revisar si se va a implementar de esta forma; ajustar formato.
    -   METADATA PRODUCTO; Necesito que cada producto tenga un valor que determine COMO INTERPRETAR SU STOCK (Kg, cantidad, etc.) => para poder validar input de CANTIDAD en VENTA

||  VENTA
    -   PREGUNTAR; Al finalizar una venta, es correcto recargar la página? Ó debería evitarlo y reiniciar la tabla manualmente...
    -   PREGUNTAR; En el carrito de venta, CANTIDAD cómo debería saber el stock actual? (para setear máximo)
    -   PREGUNTAR; El objeto carritoVenta, cómo debería indicar que NO se usó un método de pago complementario?
    -   CSS GENERAL; Estaría bueno si todos los valroes tuviesen unidades ($ por ejemplo, ideal considerar también los de cantidad)
    -   CSS GENERAL; Para maximizar ancho disponible para nombre del producto, quizás se puede abreviar y achi
    -   BUSCADOR; Considerar mostrar un TOAST indicando errores (input repetido, búsqueda vacía, sin resultados, etc).
    -   CARRITO; Estaría bueno si CANTIDAD tuviese 2 botones para aumentar/disminuir con clicks (deshabilitando los propios del <input>)
    -   CARRITO; Quizás se puede insertar un elemento placeholder (vacío?) cuando se elimine el último elemento del carrito.
    -   CSS CARRITO; Scrollbar debería ser solamente para <tbody> para dejar siempre a la vista el header. (Tal vez preguntar si hay preferencia para esto...)
    -   CSS CARRITO; Setear anchos fijos a cada columna para evitar redimensiones al agregar productos.
    -   METODOS DE PAGO; Estaría bueno que METODO DE PAGO COMPLEMENTARIO pudiese volver al valor default tanto como opción como apretando "Escape" por ejemplo.
    -   FINALIZAR VENTA; Recordar des-comentar el código para pedir doble confirmación de finalización de venta.

||  CAJA
    -   Debería generarse un scroll horizontal en caso de agregar otro fondo.
    -   Anotar qué información tiene que mostrarse en cada fondo (ideal: sin overflow)
    -   Implementar botón "Detalles" para abrir un modal con la información completa, en cada fondo.

||  PROVEEDOR
    -   PREGUNTAR; Implementar estética del buscador en VENTA?
    -   Chequear qué información debería mostrarse en la tabla.
    -   Implementar "agregarProveedor" (botón modal que debería ser formulario para agregar un proveedor)

||  COMPRA
    -   Chequear si sería válido implementar "agregarProveedor" de PROVEEDOR también acá.
    -   Implementar correctamente formulario (Necesita generar un JSON ?)

||  USUARIO
    -   Analizar si realmente es necesario implementar esta sección (potencial conflico si hay empleados)
*/