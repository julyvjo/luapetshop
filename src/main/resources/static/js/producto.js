// VALIDAR NUMEROS INTEGER
function validarNumeroInteger(string)
{
    //  Regular expression para validar que string represente un número entero
     const numberRegex = /^[0-9]+$/;
    // const numberRegex = /^[0-9]+([.,][0-9]+)?$/;  //  Por si solo quisiera validar un número float.

    return numberRegex.test(string);

    // Ejemplos:
    // console.log(validateNumber("12345"));   // true
    // console.log(validateNumber("12.345"));  // false (número float)
    // console.log(validateNumber("12,345"));  // false (número float)
    // console.log(validateNumber("12,34.56"));// false (múltiples separadores)
    // console.log(validateNumber("abc"));     // false (contiene caracteres no válidos como letras)
}
// **************************************************************



// VALIDAR NUMEROS FLOAT

function agregarEventListenerFloat(nombre)
{
    const ID = nombre;

    const elemento = document.getElementById(ID);
    elemento.addEventListener("change", (e) =>
    {
        if (validarNumeroFloat(elemento.value) === false)
        {
            console.log("ERROR: No es un número float! Reiniciando a valor default.");
            elemento.value = "0.00";
            return;
        }
        
        //  Fuerzo redondeo a 2 decimales.
        elemento.value = elemento.value.replace(/,/g, ".");
        elemento.value = parseFloat(elemento.value).toFixed(2);
    });
}

function validarNumeroFloat(string)
{
    //  Regular expression para validar que string represente un número float
    //  const numberRegex = /^[0-9]+$/;  //  Por si solo quisiera validar un número entero.
    const numberRegex = /^[0-9]+([.,][0-9]+)?$/;;

    return numberRegex.test(string);

    // Ejemplos:
    // console.log(validateNumber("12345"));   // true
    // console.log(validateNumber("12.345"));  // true
    // console.log(validateNumber("12,345"));  // true
    // console.log(validateNumber("12,34.56"));// false (múltiples separadores)
    // console.log(validateNumber("abc"));     // false (contiene caracteres no válidos como letras)
}
// **************************************************************



// NUEVO PRODUCTO

const nuevoProducto = document.getElementById('botonNuevoProducto');

if (nuevoProducto)
{
    nuevoProducto.addEventListener("click", (e) =>
    {
        mostrarModal("modalNuevoProducto");

        agregarEventListenerFloat("modalNuevoProductoPrecioCompra");
        agregarEventListenerFloat("modalNuevoProductoRentabilidad");
        agregarEventListenerFloat("modalNuevoProductoGanancia");
        agregarEventListenerFloat("modalNuevoProductoPrecioVenta");

        window.onclick = null;
    });

    // I implemented it like this because script.js has "defer" attribute.
    // If in the future this changes, this needs to be implemented inside an Event Listener.
}

const nuevoProductoEnviar = document.getElementById("modalNuevoProductoEnviar");

nuevoProductoEnviar.addEventListener("click", () =>
{
    if(!validarNuevoProducto())
        return;

    enviarNuevoProducto();
});

function validarNuevoProducto()     // AÚN NO SE VALIDAR PARA EVITAR SQL INJECTION!
{
    // IMPLEMENTAR CODIGO DE BARRAS

    const nuevoProductoNombre = document.getElementById("modalNuevoProductoNombre");

    if (nuevoProductoNombre.value === "")
    {
        console.log("ERROR: Completar nombre del producto!");
        return false;
    }

    // const nuevoProductoDescripcion = document.getElementById("modalNuevoProductoDescripcion");

    // if (nuevoProductoDescripcion.value === "")
    // {
    //     console.log("ERROR: Completar descripción del producto!");
    //     return false;
    // }

    //  Proveedor por ahora no puede implementarse
    // const nuevoProductoProveedor = document.getElementById("modalNuevoProductoProveedor");

    // if (nuevoProductoProveedor.value === "0")
    // {
    //     console.log("ERROR: El producto tiene que tener algún proveedor!");
    //     return false;
    // }

    const nuevoProductoPrecioCompra = document.getElementById("modalNuevoProductoPrecioCompra");

    if (parseFloat(nuevoProductoPrecioCompra.value) < 0.01)
    {
        //  Estoy asumiendo que nunca les regalarían un producto!
        console.log("ERROR: Insertar precio de compra válido!");
        return false;
    }

    const nuevoProductoRentabilidad = document.getElementById("modalNuevoProductoRentabilidad");

    if (parseFloat(nuevoProductoRentabilidad.value) < 0.01)
    {
        //  Estoy asumiendo que nunca venderían un producto al costo!
        console.log("ERROR: Insertar porcentaje de ganancia válido!");
        return false;
    }

    const nuevoProductoGanancia = document.getElementById("modalNuevoProductoGanancia");

    if (parseFloat(nuevoProductoGanancia.value) < 0.01)
    {
        //  Estoy asumiendo que nunca venderían un producto al costo!
        console.log("ERROR: Insertar ganancia del producto válido!");
        return false;
    }

    const nuevoProductoPrecioVenta = document.getElementById("modalNuevoProductoPrecioVenta");

    if (parseFloat(nuevoProductoPrecioVenta.value) < 0.01)
    {
        //  Estoy asumiendo que nunca regalarían un producto!
        console.log("ERROR: Insertar precio de venta del producto válido!");
        return false;
    }

    const nuevoProductoCategoria = document.getElementById("modalNuevoProductoCategoria");

    if (nuevoProductoCategoria.value === "0")
    {
        console.log("ERROR: El producto necesita pertenecer a alguna categoría!");
        return false;
    }

    const nuevoProductoStock = document.getElementById("modalNuevoProductoStock");

    if (parseFloat(nuevoProductoStock.value) < 1)
    {
        //  Estoy asumiendo que nunca agregarían un producto sin stock!
        console.log("ERROR: Insertar cantidad de stock válido!");
        return false;
    }

    // IMAGEN EL PRODUCTO NO IMPLEMENTADO AÚN

    return true;
}

function enviarNuevoProducto()
{
    // const nuevoProductoCodigo = document.getElementById("modalNuevoProductoCodigo");
    const nuevoProductoNombre = document.getElementById("modalNuevoProductoNombre");
    
    //  Descripción por ahora no va a ser implementado.
    // const nuevoProductoDescripcion = document.getElementById("modalNuevoProductoDescripcion");

    // const nuevoProductoProveedor = document.getElementById("modalNuevoProductoProveedor");
    const nuevoProductoPrecioCompra = document.getElementById("modalNuevoProductoPrecioCompra");
    const nuevoProductoRentabilidad = document.getElementById("modalNuevoProductoRentabilidad");
    const nuevoProductoGanancia = document.getElementById("modalNuevoProductoGanancia");
    const nuevoProductoPrecioVenta = document.getElementById("modalNuevoProductoPrecioVenta");
    const nuevoProductoCategoria = document.getElementById("modalNuevoProductoCategoria");
    const nuevoProductoStock = document.getElementById("modalNuevoProductoStock");
    // const nuevoProductoImagen = document.getElementById("modalNuevoProductoImagen");

    datosProducto = {
        // codigo_producto: 0,
        id_producto: 0,
        nombre: nuevoProductoNombre.value,

        // descripcion: nuevoProductoDescripcion.value,

        // id_proveedor: nuevoProductoProveedor.value,
        precio_compra: nuevoProductoPrecioCompra.value,
        rentabilidad: nuevoProductoRentabilidad.value,
        ganancia: nuevoProductoGanancia.value,
        precio_venta: nuevoProductoPrecioVenta.value,
        id_categoria: nuevoProductoCategoria.value,
        stock: nuevoProductoStock.value,
        // imagen: nuevoProductoImagen.value,
    }

    // ENVIAR AL BACKEND
    console.log("ENVIANDO datosProducto desde NUEVO PRODUCTO...", datosProducto);
}
// **************************************************************



// INDIVIDUAL EDIT

const arrayBotonEditar = document.querySelectorAll('.botonEditar');

if (arrayBotonEditar.length !== 0)
{
    arrayBotonEditar.forEach(fila =>
    {
        fila.addEventListener("click", (e) =>
        {
            mostrarModal("modalEditorLinea");
            cargarEditor(fila);

            agregarEventListenerFloat("modalEditorLineaPrecioCompra");
            agregarEventListenerFloat("modalEditorLineaRentabilidad");
            agregarEventListenerFloat("modalEditorLineaGanancia");
            agregarEventListenerFloat("modalEditorLineaPrecioVenta");

            window.onclick = null;
        });    
    });

    // I implemented it like this because script.js has "defer" attribute.
    // If in the future this changes, this needs to be implemented inside an Event Listener.
}

function cargarEditor(fila)
{
    const tr = fila.parentNode.parentNode.parentNode;
    const filaIdProducto = tr.getAttribute("data-id-producto");
    const filaIdCategoria = tr.getAttribute("data-id-categoria");
    const h5 = tr.querySelectorAll("h5");

    /*
        h5[0] - Imagen
        //  CODIGO BARRAS?
        h5[1] - Nombre
        //  DESCRIPCION?
        //  PROVEEDOR?
        h5[2]  CATEGORIA?
        h5[3] - Stock
        h5[4] - Precio compra
        h5[5] - Rentabilidad
        h5[6] - Ganancia
        h5[7] - Precio venta
        h5[8] - Editor Linea
    */

    //  Imagen aún está pendiente.
    //  const imagen = document.getElementById("modalEditorLineaImagen");

    // const editorLineaCodigo = document.getElementById("modalEditorLineaCodigo");
    // editorLineaCodigo.value = h5[1].textContent;

    const editorLineaNombre = document.getElementById("modalEditorLineaNombre");
    editorLineaNombre.value = h5[1].textContent;

    //  Descripción actualmente no se va a usar.
    // const editorLineaDescripcion = document.getElementById("modalEditorLineaDescripcion");
    // editorLineaDescripcion.value = h5[2].textContent;

    // const editorLineaProveedor = document.getElementById("modalEditorLineaProveedor");
    // editorLineaProveedor.value = h5[2].textContent;

    const editorLineaCategoria = document.getElementById("modalEditorLineaCategoria");
    editorLineaCategoria.value = filaIdCategoria;

    const editorLineaStock = document.getElementById("modalEditorLineaStock");
    editorLineaStock.value = h5[3].textContent;

    const editorLineaPrecioCompra = document.getElementById("modalEditorLineaPrecioCompra");
    editorLineaPrecioCompra.value = h5[4].textContent;

    const editorLineaRentabilidad = document.getElementById("modalEditorLineaRentabilidad");
    editorLineaRentabilidad.value = h5[5].textContent;

    const editorLineaGanancia = document.getElementById("modalEditorLineaGanancia");
    editorLineaGanancia.value = h5[6].textContent;
    
    const editorLineaPrecioVenta = document.getElementById("modalEditorLineaPrecioVenta");
    editorLineaPrecioVenta.value = h5[7].textContent;

    const editorLineaID = document.getElementById("modalEditorLineaId");
    editorLineaID.value = filaIdProducto;
}

const modalEditorLineaEnviar = document.getElementById("modalEditorLineaEnviar");

modalEditorLineaEnviar.addEventListener("click", () => 
{
    if(!validarEditorLinea())
        return;

    enviarEditorLinea();
});

function validarEditorLinea()       //  AÚN NO SE VALIDAR PARA EVITAR SQL INJECTION!
{
    // IMPLEMENTAR CODIGO DE BARRAS

    const editorLineaNombre = document.getElementById("modalEditorLineaNombre");

    if (editorLineaNombre.value === "")
    {
        console.log("ERROR: Completar nombre del producto!");
        return false;
    }
    
    //  Descripción por ahora no se va a implementar.
    // const editorLineaDescripcion = document.getElementById("modalEditorLineaDescripcion");
    
    // if (editorLineaDescripcion.value === "")
    // {
    //     console.log("ERROR: Completar descripción del producto!");
    //     return false;
    // }

    //  Proveedor por ahora no puede implementarse
    // const editorLineaProveedor = document.getElementById("modalEditorLineaProveedor");

    // if (editorLineaProveedor.value === "0")
    // {
    //     console.log("ERROR: El producto tiene que tener algún proveedor!");
    //     return false;
    // }
 
    const editorLineaPrecioCompra = document.getElementById("modalEditorLineaPrecioCompra");
    
    if (parseFloat(editorLineaPrecioCompra.value) < 0.01)
    {
        //  Estoy asumiendo que nunca les regalarían un producto!
        console.log("ERROR: Insertar precio de compra válido!");
        return false;
    }
 
    const editorLineaRentabilidad = document.getElementById("modalEditorLineaRentabilidad");
    
    if (parseFloat(editorLineaRentabilidad.value) < 0.01)
    {
        //  Estoy asumiendo que nunca venderían un producto al costo!
        console.log("ERROR: Insertar porcentaje de ganancia válido!");
        return false;
    }
 
    const editorLineaGanancia = document.getElementById("modalEditorLineaGanancia");
    
    if (parseFloat(editorLineaGanancia.value) < 0.01)
    {
        //  Estoy asumiendo que nunca venderían un producto al costo!
        console.log("ERROR: Insertar ganancia del producto válido!");
        return false;
    }

    const editorLineaPrecioVenta = document.getElementById("modalEditorLineaPrecioVenta");
    
    if (parseFloat(editorLineaPrecioVenta.value) < 0.01)
    {
        //  Estoy asumiendo que nunca regalarían un producto!
        console.log("ERROR: Insertar precio de venta del producto válido!");
        return false;
    }
    
    const editorLineaCategoria = document.getElementById("modalEditorLineaCategoria");

    if (editorLineaCategoria.value === "0")
    {
        console.log("ERROR: El producto necesita pertenecer a alguna categoría!");
        return false;
    }

    const editorLineaStock = document.getElementById("modalEditorLineaStock");
    
    if (parseFloat(editorLineaStock.value) < 1)
    {
        //  Estoy asumiendo que nunca agregarían un producto sin stock!
        console.log("ERROR: Insertar cantidad de stock válido!");
        return false;
    }
   
    // IMAGEN EL PRODUCTO NO IMPLEMENTADO AÚN

    return true;
}

function enviarEditorLinea()
{
    // const editorLineaCodigo = document.getElementById("modalEditorLineaCodigo");
    const editorLineaNombre = document.getElementById("modalEditorLineaNombre");
    
    //  Descripción no va a implementarse por ahora.
    // const editorLineaDescripcion = document.getElementById("modalEditorLineaDescripcion");
    
    // const editorLineaProveedor = document.getElementById("modalEditorLineaProveedor");
    const editorLineaPrecioCompra = document.getElementById("modalEditorLineaPrecioCompra");
    const editorLineaRentabilidad = document.getElementById("modalEditorLineaRentabilidad");
    const editorLineaGanancia = document.getElementById("modalEditorLineaGanancia");
    const editorLineaPrecioVenta = document.getElementById("modalEditorLineaPrecioVenta");
    const editorLineaCategoria = document.getElementById("modalEditorLineaCategoria");
    const editorLineaStock = document.getElementById("modalEditorLineaStock");
    // const editorLineaImagen = document.getElementById("modalEditorLineaImagen");
    const editorLineaID = document.getElementById("modalEditorLineaId");

    datosProducto = {
        // codigo_producto: editorLineaCodigo.value,
        id_producto: editorLineaID.value,
        nombre: editorLineaNombre.value,

        // descripcion: editorLineaDescripcion.value,

        // id_proveedor: editorLineaProveedor.value,
        precio_compra: editorLineaPrecioCompra.value,
        rentabilidad: editorLineaRentabilidad.value,
        ganancia: editorLineaGanancia.value,
        precio_venta: editorLineaPrecioVenta.value,
        id_categoria: editorLineaCategoria.value,
        stock: editorLineaStock.value,
        // imagen: editorLineaImagen.value,
    }

    // ENVIAR AL BACKEND
    console.log("ENVIANDO datosProducto desde EDITOR LINEA...", datosProducto);
}
// **************************************************************



// || DATOS PRODUCTO

let datosProducto = {
    // codigo_producto: 0,     // 0 si no tiene código de barras asignado.
    id_producto: 0,         // 0 si es nuevo.
    nombre: "",

    // descripcion: "",     //  De momento no implementado.

    // id_proveedor: 0,     // 0 si no tiene proveedor asignado.
    precio_compra: 0.00,
    rentabilidad: 0.0,
    ganancia: 0.0,
    precio_venta: 0.0,
    id_categoria: 0,     // 0 si no tiene categoría asiganda.
    stock: 0,
    // imagen: "base64"
}

function iniciarDatosProducto()
{
    datosProducto = {
        // codigo_producto: 0,
        id_producto: 0,
        nombre: "",

        // descripcion: "",
        
        // id_proveedor: 0,
        precio_compra: 0.00,
        rentabilidad: 0.0,
        ganancia: 0.0,
        precio_venta: 0.0,
        id_categoria: 0,     
        stock: 0,
        // imagen: "base64"
    }
}
// **************************************************************



// PRODUCT PHOTO BUTTON

const arrayBotonFoto = document.querySelectorAll('.botonFoto');

if (arrayBotonFoto.length !== 0)
{
    arrayBotonFoto.forEach(element =>
    {
        element.addEventListener("click", (e) =>
        {
            mostrarModal("modalFoto");
        });    
    });

    // I implemented it like this because script.js has "defer" attribute.
    // If in the future this changes, this needs to be implemented inside an Event Listener.
}
// **************************************************************



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
    let actualurl = new URL(window.location.href);
    let nombre = actualurl.searchParams.get('nombre');
    // console.log('parametro nombre =' + nombre);

    actualurl.searchParams.set('nombre',contenido);
    actualurl.searchParams.set('page',1);
    // console.log('nueva url =' + actualurl.toString());
    window.location.href = actualurl.toString();        
}
// **************************************************************