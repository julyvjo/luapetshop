// SEARCHBAR INPUT

const inputBuscador = document.getElementById('inputBuscador');

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
        else // Maybe I should use some regEx to improve this...
        {
            // e.preventDefault(); // This will come useful when using ctrl/shift/alt modifications
            // chequearBuscador(inputBuscador.value + e.key);
            // console.log(inputBuscador.value + e.key);
        }
    });

    // I implemented it like this because script.js has "defer" attribute.
    // If in the future this changes, this needs to be implemented inside an Event Listener.
}
// **************************************************************



// SEARCHBAR BUTTON

const botonBuscador = document.getElementById('botonBuscador');

if (botonBuscador)
{
    botonBuscador.addEventListener("click", (e) =>
    {
        chequearBuscador();
    });

    // I implemented it like this because script.js has "defer" attribute.
    // If in the future this changes, this needs to be implemented inside an Event Listener.
}
// **************************************************************



// SEARCH FUNCTIONS

function chequearBuscador()
{
    if (inputBuscador.value !== "")
        buscadorGoToPage(inputBuscador.value);
    else
        console.log("WARNING: Empty search bar!");
}

function buscadorGoToPage(contenido)
{
    //console.log("HELLO WORLD");
    let actualurl = new URL(window.location.href);
    // let nombre = actualurl.searchParams.get('nombre');
    // // console.log('parametro nombre =' + nombre);

    actualurl.searchParams.set('nombre',contenido);
    actualurl.searchParams.set('page',1);
    // // console.log('nueva url =' + actualurl.toString());
    window.location.href = actualurl.toString();        
}
// **************************************************************



// NUEVO PROVEEDOR BUTTON

const nuevoProveedor = document.getElementById('botonNuevoProveedor');

if (nuevoProveedor)
{
    nuevoProveedor.addEventListener("click", (e) =>
    {
        mostrarModal("modalNuevoProveedor");
    });

    // I implemented it like this because script.js has "defer" attribute.
    // If in the future this changes, this needs to be implemented inside an Event Listener.
}
// **************************************************************



// MODAL NUEVO PROVEEDOR FUNCTIONS

const nuevoProveedorPrecioCompra = document.getElementById("modalNuevoProveedorPrecioCompra");

nuevoProveedorPrecioCompra.addEventListener("change", () =>
{
    console.log("nuevoProveedorPrecioCompra cambió su valor");

    if (validarPrecioCompra(nuevoProveedorPrecioCompra.value) === false)
    {
        console.log("ERROR: Expecting integer or float number! ");
        nuevoProveedorPrecioCompra.value = "0.00";
        return;
    }

    nuevoProveedorPrecioCompra.value = nuevoProveedorPrecioCompra.value.replace(/,/g, ".");

    nuevoProveedorPrecioCompra.value = parseFloat(nuevoProveedorPrecioCompra.value).toFixed(2);
});

function validarPrecioCompra(string)
{
    //  Regular expression para validar que string represente un número float
    //  const numberRegex = /^[0-9]+$/;  //  Por si solo quisiera validar un número entero.
    const numberRegex = /^[0-9]+([.,][0-9]+)?$/;;

    return numberRegex.test(string);

    // Ejemplos:
    console.log(validateNumber("12345"));   // true
    console.log(validateNumber("12.345"));  // true
    console.log(validateNumber("12,345"));  // true
    console.log(validateNumber("12,34.56"));// false (múltiples separadores)
    console.log(validateNumber("abc"));     // false (contiene caracteres no válidos como letras)
}

const modalNuevoProveedorPrecioCompraButton = document.getElementById("modalNuevoProveedorPrecioCompraButton");

modalNuevoProveedorPrecioCompraButton.addEventListener("click", () =>
{
    if (validarFormulario() === false)
    {
        window.alert("ERROR: Es necesario completar todos los campos!");
        return;
    }

    console.log("formulario válido");
    // cargarFormulario();
});

let infoNuevoProveedor = {};
infoNuevoProveedor = iniciarInfoNuevoProveedor(iniciarInfoNuevoProveedor);

/*
    FORMATO DEFAULT infoNuevoProveedor

    id_producto_proveedor: [INT],
    nombre_proveedor: [STRING],
    nombre_producto: [STRING],
    precio_compra: [STRING], -> lo manipulo y valido como FLOAT
*/

function iniciarInfoNuevoProveedor(infoNuevoProveedor)
{
    infoNuevoProveedor = {
        id_producto_proveedor: 0,
        nombre_proveedor: "",
        nombre_producto: "",
        precio_compra: "0.00"
    }
}

const nuevoProveedorIdProducto = document.getElementById("modalNuevoProveedorIdProducto");
const nuevoProveedorNombreProveedor = document.getElementById("modalNuevoProveedorNombreProveedor");
const nuevoProveedorNombreProducto = document.getElementById("modalNuevoProveedorNombreProducto");

function validarFormulario()
{
    /*
        En realidad no debería ser así esto, pero lo implemento de esta forma para que quede como plantilla para alguna versión futura.
    */

    if (nuevoProveedorIdProducto.value === "")
    {
        console.log("ERROR: ID del producto vacío!");
        return false;
    }

    if (nuevoProveedorNombreProveedor.value === "")
    {
        console.log("ERROR: Nombre del proveedor vacío!");
        return false;
    }

    if (nuevoProveedorNombreProducto.value === "")
    {
        console.log("ERROR: Nombre del producto vacío!");
        return false;
    }

    if (nuevoProveedorPrecioCompra.value === "0.00")
    {
        console.log("ERROR: Precio de compra no asignado!");
        return false;
    }

    return true;
}
// **************************************************************