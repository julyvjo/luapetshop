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

    const nuevoProductoNombre = document.getElementById("modalNuevoProductoNombre");

    if (nuevoProductoNombre.value === "")
    {
        console.log("ERROR: Completar nombre del producto!");
        return false;
    }

    const nuevoProductoDescripcion = document.getElementById("modalNuevoProductoDescripcion");

    if (nuevoProductoDescripcion.value === "")
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

    const nuevoProductoRentabilidad = document.getElementById("modalNuevoProductoRentabilidad");

    if (parseFloat(nuevoProductoRentabilidad.value) < 0.01)
    {
        //  Estoy asumiendo que nunca venderían un producto al costo!
        console.log("ERROR: Insertar porcentaje de ganancia válido!");
        return false;
    }

    // const nuevoProductoGanancia = document.getElementById("modalNuevoProductoGanancia");

    // if (parseFloat(nuevoProductoGanancia.value) < 0.01)
    // {
    //     //  Estoy asumiendo que nunca venderían un producto al costo!
    //     console.log("ERROR: Insertar ganancia del producto válido!");
    //     return false;
    // }

    // TIPO DE STOCK NO IMPLEMENTADO AÚN

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
    const nuevoProductoNombre = document.getElementById("modalNuevoProductoNombre");
    const nuevoProductoDescripcion = document.getElementById("modalNuevoProductoDescripcion");
    const nuevoProductoPrecioCompra = document.getElementById("modalNuevoProductoPrecioCompra");
    const nuevoProductoRentabilidad = document.getElementById("modalNuevoProductoRentabilidad");
    // const nuevoProductoGanancia = document.getElementById("modalNuevoProductoGanancia");
    // const nuevoProductoTipoStock = document.getElementById("modalNuevoProductoTipoStock");
    const nuevoProductoStock = document.getElementById("modalNuevoProductoStock");
    // const nuevoProductoImagen = document.getElementById("modalNuevoProductoImagen");

    datosProducto = {
        id_producto: 0,
        nombre: nuevoProductoNombre.value,
        descripcion: nuevoProductoDescripcion.value,
        precio_compra: nuevoProductoPrecioCompra.value,
        rentabilidad: nuevoProductoRentabilidad.value,
        // ganancia: nuevoProductoGanancia.value,
        // tipo_stock: nuevoProductoTipoStock.value,
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
            window.onclick = null;
        });    
    });

    // I implemented it like this because script.js has "defer" attribute.
    // If in the future this changes, this needs to be implemented inside an Event Listener.
}

function cargarEditor(fila)
{
    const tr = fila.parentNode.parentNode.parentNode;
    const filaId = tr.id;
    const h5 = tr.querySelectorAll("h5");

    const editorLineaNombre = document.getElementById("modalEditorLineaNombre");
    editorLineaNombre.value = h5[1].textContent;

    const editorLineaDescripcion = document.getElementById("modalEditorLineaDescripcion");
    editorLineaDescripcion.value = h5[2].textContent;

    const editorLineaPrecioCompra = document.getElementById("modalEditorLineaPrecioCompra");
    editorLineaPrecioCompra.value = h5[3].textContent;

    const editorLineaRentabilidad = document.getElementById("modalEditorLineaRentabilidad");
    editorLineaRentabilidad.value = h5[4].textContent;

    const editorLineaGanancia = document.getElementById("modalEditorLineaGanancia");
    editorLineaGanancia.value = h5[5].textContent;

    //  Tipo de stock aún está pendiente saber cómo se va a implementar.
    // const tipoStock = document.getElementById("modalEditorLineaNombreProducto");

    const editorLineaStock = document.getElementById("modalEditorLineaStock");
    editorLineaStock.value = h5[6].textContent;

    //  Imagen aún está pendiente.
    //  const imagen = document.getElementById("modalEditorLineaImagen");

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

    const editorLineaNombre = document.getElementById("modalEditorLineaNombre");

    if (editorLineaNombre.value === "")
    {
        console.log("ERROR: Completar nombre del producto!");
        return false;
    }
 
    const editorLineaDescripcion = document.getElementById("modalEditorLineaDescripcion");
    
    if (editorLineaDescripcion.value === "")
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
 
    const editorLineaRentabilidad = document.getElementById("modalEditorLineaRentabilidad");
    
    if (parseFloat(editorLineaRentabilidad.value) < 0.01)
    {
        //  Estoy asumiendo que nunca venderían un producto al costo!
        console.log("ERROR: Insertar porcentaje de ganancia válido!");
        return false;
    }
 
    // const editorLineaGanancia = document.getElementById("modalEditorLineaGanancia");
    
    // if (parseFloat(editorLineaGanancia.value) < 0.01)
    // {
    //     //  Estoy asumiendo que nunca venderían un producto al costo!
    //     console.log("ERROR: Insertar ganancia del producto válido!");
    //     return false;
    // }
    
    // TIPO DE STOCK NO IMPLEMENTADO AÚN

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
    const editorLineaNombre = document.getElementById("modalEditorLineaNombre");
    const editorLineaDescripcion = document.getElementById("modalEditorLineaDescripcion");
    const editorLineaPrecioCompra = document.getElementById("modalEditorLineaPrecioCompra");
    const editorLineaRentabilidad = document.getElementById("modalEditorLineaRentabilidad");
    // const editorLineaGanancia = document.getElementById("modalEditorLineaGanancia");
    // const editorLineaTipoStock = document.getElementById("modalEditorLineaTipoStock");
    const editorLineaStock = document.getElementById("modalEditorLineaStock");
    // const editorLineaImagen = document.getElementById("modalEditorLineaImagen");
    const editorLineaID = document.getElementById("modalEditorLineaId");

    datosProducto = {
        id_producto: editorLineaID.value,
        nombre: editorLineaNombre.value,
        descripcion: editorLineaDescripcion.value,
        precio_compra: editorLineaPrecioCompra.value,
        rentabilidad: editorLineaRentabilidad.value,
        // ganancia: editorLineaGanancia.value,
        // tipo_stock: editorLineaTipoStock.value,
        stock: editorLineaStock.value,
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