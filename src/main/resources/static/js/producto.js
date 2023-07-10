// NUEVO PRODUCTO

const nuevoProducto = document.getElementById('botonNuevoProducto');

if (nuevoProducto)
{
    nuevoProducto.addEventListener("click", (e) =>
    {
        mostrarModal("modalNuevoProducto");

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

function validarNuevoProducto()
{
    //  AÚN NO SE VALIDAR PARA EVITAR SQL INJECTION!

    const nuevoProductoNombreProducto = document.getElementById("modalNuevoProductoNombreProducto");

    if (nuevoProductoNombreProducto.value === "")
    {
        console.log("ERROR: Completar nombre del producto!");
        return false;
    }

    const nuevoProductoDescripcionProducto = document.getElementById("modalNuevoProductoDescripcionProducto");

    if (nuevoProductoDescripcionProducto.value === "")
    {
        console.log("ERROR: Completar descripción del producto!");
        return false;
    }

    const nuevoProductoPrecioCompra = document.getElementById("modalNuevoProductoPrecioCompra");

    if (parseFloat(nuevoProductoPrecioCompra.value) < 0.01)
    {
        //  Estoy asumiendo que nunca regalarían un producto!
        console.log("ERROR: Insertar precio de compra válido!");
        return false;
    }

    const nuevoProductoPorcentajeGanancia = document.getElementById("modalNuevoProductoPorcentajeGanancia");

    if (parseFloat(nuevoProductoPorcentajeGanancia.value) < 0.01)
    {
        //  Estoy asumiendo que nunca venderían un producto al costo!
        console.log("ERROR: Insertar porcentaje de ganancia válido!");
        return false;
    }

    const nuevoProductoGananciaProducto = document.getElementById("modalNuevoProductoGananciaProducto");

    if (parseFloat(nuevoProductoGananciaProducto.value) < 0.01)
    {
        //  Estoy asumiendo que nunca venderían un producto al costo!
        console.log("ERROR: Insertar ganancia del producto válido!");
        return false;
    }

    // TIPO DE STOCK NO IMPLEMENTADO AÚN

    const nuevoProductoCantidadStock = document.getElementById("modalNuevoProductoCantidadStock");

    if (parseFloat(nuevoProductoCantidadStock.value) < 1)
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
    const nuevoProductoNombreProducto = document.getElementById("modalNuevoProductoNombreProducto");
    const nuevoProductoDescripcionProducto = document.getElementById("modalNuevoProductoDescripcionProducto");
    const nuevoProductoPrecioCompra = document.getElementById("modalNuevoProductoPrecioCompra");
    const nuevoProductoPorcentajeGanancia = document.getElementById("modalNuevoProductoPorcentajeGanancia");
    // const nuevoProductoGananciaProducto = document.getElementById("modalNuevoProductoGananciaProducto");
    // const nuevoProductoTipoStock = document.getElementById("modalNuevoProductoTipoStock");
    const nuevoProductoCantidadStock = document.getElementById("modalNuevoProductoCantidadStock");
    // const nuevoProductoImagen = document.getElementById("modalNuevoProductoImagen");

    datosProducto = {
        id_producto: 0,
        nombre: nuevoProductoNombreProducto.value,
        descripcion: nuevoProductoDescripcionProducto.value,
        precio_compra: nuevoProductoPrecioCompra.value,
        rentabilidad: nuevoProductoPorcentajeGanancia.value,
        // ganancia: nuevoProductoGananciaProducto.value,
        // tipo_stock: nuevoProductoTipoStock.value,
        stock: nuevoProductoCantidadStock.value,
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
            window.onclick = null;
        });    
    });

    // I implemented it like this because script.js has "defer" attribute.
    // If in the future this changes, this needs to be implemented inside an Event Listener.
}

function cargarEditor(fila)
{
    /*
        No es muy prolijo, pero con esto evito agregar atributos al html o llamar a la DB.
    */

    const tr = fila.parentNode.parentNode.parentNode;
    const filaId = tr.id;
    const h5 = tr.querySelectorAll("h5");

    // h5[0] = imagen; h5[h5.length - 1] = botón editar.
    
    // h5.forEach((element, index) =>
    // {
    //     if (index === 0 || index === h5.length - 1)
    //         return;

    //     console.log(element.textContent);
    // });

    const nombreProducto = document.getElementById("modalEditorLineaNombreProducto");
    nombreProducto.value = h5[1].textContent;

    const descripcionProducto = document.getElementById("modalEditorLineaDescripcionProducto");
    descripcionProducto.value = h5[2].textContent;

    const precioCompra = document.getElementById("modalEditorLineaPrecioCompra");
    precioCompra.value = h5[3].textContent;

    const porcentajeGanancia = document.getElementById("modalEditorLineaPorcentajeGanancia");
    porcentajeGanancia.value = h5[4].textContent;

    const gananciaProducto = document.getElementById("modalEditorLineaGananciaProducto");
    gananciaProducto.value = h5[5].textContent;

    //  Tipo de stock aún está pendiente saber cómo se va a implementar.
    // const tipoStock = document.getElementById("modalEditorLineaNombreProducto");

    const cantidadStock = document.getElementById("modalEditorLineaCantidadStock");
    cantidadStock.value = h5[6].textContent;

    //  Imagen aún está pendiente.
    //  const imagenProducto = document.getElementById("modalEditorLineaNombreProducto");

    const editorLineaID = document.getElementById("modalEditorLineaId");
    editorLineaID.value = filaId;
}

const modalEditorLineaEnviar = document.getElementById("modalEditorLineaEnviar");

modalEditorLineaEnviar.addEventListener("click", () => 
{
    if(!validarEditorLinea())
        return;

    enviarEditorLinea();
});

function validarEditorLinea()
{
    //  AÚN NO SE VALIDAR PARA EVITAR SQL INJECTION!

    const editorLineaNombreProducto = document.getElementById("modalEditorLineaNombreProducto");

    if (editorLineaNombreProducto.value === "")
    {
        console.log("ERROR: Completar nombre del producto!");
        return false;
    }
 
    const editorLineaDescripcionProducto = document.getElementById("modalEditorLineaDescripcionProducto");
    
    if (editorLineaDescripcionProducto.value === "")
    {
        console.log("ERROR: Completar descripción del producto!");
        return false;
    }
 
    const editorLineaPrecioCompra = document.getElementById("modalEditorLineaPrecioCompra");
    
    if (parseFloat(editorLineaPrecioCompra.value) < 0.01)
    {
        //  Estoy asumiendo que nunca regalarían un producto!
        console.log("ERROR: Insertar precio de compra válido!");
        return false;
    }
 
    const editorLineaPorcentajeGanancia = document.getElementById("modalEditorLineaPorcentajeGanancia");
    
    if (parseFloat(editorLineaPorcentajeGanancia.value) < 0.01)
    {
        //  Estoy asumiendo que nunca venderían un producto al costo!
        console.log("ERROR: Insertar porcentaje de ganancia válido!");
        return false;
    }
 
    const editorLineaGananciaProducto = document.getElementById("modalEditorLineaGananciaProducto");
    
    if (parseFloat(editorLineaGananciaProducto.value) < 0.01)
    {
        //  Estoy asumiendo que nunca venderían un producto al costo!
        console.log("ERROR: Insertar ganancia del producto válido!");
        return false;
    }
    
    // TIPO DE STOCK NO IMPLEMENTADO AÚN

    const editorLineaCantidadStock = document.getElementById("modalEditorLineaCantidadStock");
    
    if (parseFloat(editorLineaCantidadStock.value) < 1)
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
    const editorLineaNombreProducto = document.getElementById("modalEditorLineaNombreProducto");
    const editorLineaDescripcionProducto = document.getElementById("modalEditorLineaDescripcionProducto");
    const editorLineaPrecioCompra = document.getElementById("modalEditorLineaPrecioCompra");
    const editorLineaPorcentajeGanancia = document.getElementById("modalEditorLineaPorcentajeGanancia");
    // const editorLineaGananciaProducto = document.getElementById("modalEditorLineaGananciaProducto");
    // const editorLineaTipoStock = document.getElementById("modalEditorLineaTipoStock");
    const editorLineaCantidadStock = document.getElementById("modalEditorLineaCantidadStock");
    // const editorLineaImagen = document.getElementById("modalEditorLineaImagen");
    const editorLineaID = document.getElementById("modalEditorLineaId");

    datosProducto = {
        id_producto: editorLineaID.value,
        nombre: editorLineaNombreProducto.value,
        descripcion: editorLineaDescripcionProducto.value,
        precio_compra: editorLineaPrecioCompra.value,
        rentabilidad: editorLineaPorcentajeGanancia.value,
        // ganancia: editorLineaGananciaProducto.value,
        // tipo_stock: editorLineaTipoStock.value,
        stock: editorLineaCantidadStock.value,
        // imagen: editorLineaImagen.value,
    }

    // ENVIAR AL BACKEND
    console.log("ENVIANDO datosProducto desde EDITOR LINEA...", datosProducto);
}
// **************************************************************



// || DATOS PRODUCTO

let datosProducto = {
    id_producto: 0,     // 0 si es nuevo; se le asignaría uno desde backend
    nombre: "",
    descripcion: "",
    precio_compra: 0.00,
    rentabilidad: 0.0,
    // ganancia: 0.0,   // <-- está en duda aún
    // tipo_stock: "",  // <-- está en duda aún
    stock: 0,
    // imagen: "base64",
}

function iniciarDatosProducto()
{
    datosProducto = {
        id_producto: 0,     // 0 si es nuevo; se le asignaría uno desde backend
        nombre: "",
        descripcion: "",
        precio_compra: 0.00,
        rentabilidad: 0.0,
        // ganancia: 0.0,   // <-- está en duda aún
        // tipo_stock: "",  // <-- está en duda aún
        stock: 0,
        // imagen: "base64",
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