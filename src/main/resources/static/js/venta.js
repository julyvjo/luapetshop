// HISTORIAL BUTTON

const historialVenta = document.getElementById('botonHistorialVenta');

if (historialVenta)
{
    historialVenta.addEventListener("click", (e) =>
    {
        const LINK = new URL("/venta/historial", window.location.origin);
    
        window.location.href = LINK;
    });
}
// **************************************************************

// SEARCHBAR INPUT

const buscadorInput = document.getElementById('buscadorInput');

let posicionListaResultados = -1;   //  Para navegar entre los resultados de la búsqueda.
let busquedaActual = "";            //  Para recordar qué búsqueda generó la lista de resultados.

if (buscadorInput)
{
    buscadorInput.focus();

    buscadorInput.addEventListener("input", (e) =>
    {
        chequearBuscador();
        posicionListaResultados = -1;
        busquedaActual = buscadorInput.value;
    });

    buscadorInput.addEventListener("keydown", (e) =>
    {
        if (buscadorInput.value === "")
            return;

        const listaResultados = document.querySelectorAll("li");

        if (e.key === "Enter")
        {
            e.preventDefault();
            
            if (posicionListaResultados === -1)
                return;

            const idResultado = listaResultados[posicionListaResultados].getAttribute("data-id-resultado");
            
            if ( estaEnCarrito(resultadoBusqueda[idResultado].id_producto) )
            {   //  resultadoBusqueda is defined in the SEARCH FUNCTIONS section globally!
                console.log("ERROR: El item seleccionado ya está en el carrito!");
                return;
            }

            const productoPlaceholder = document.getElementById("productoPlaceholder");
            
            if (productoPlaceholder)
            {
                const tablaCarritoVenta = document.getElementById("table");
                tablaCarritoVenta.removeChild(productoPlaceholder);
            }

            carritoCrearFila(resultadoBusqueda[idResultado]);
        
            //  Reiniciar buscador
            buscadorInput.value = "";
            ocultarResultadosBusqueda();
            posicionListaResultados = -1;
            busquedaActual = buscadorInput.value;

            return;
        }

        //  Acá abajo hay código que pareciera estar innecesariamente repetido...
        //  pero hay bugs que aparecen solamente por no aislar la acción a estas teclas específicas.

        if (e.key === "ArrowUp")
        {
            e.preventDefault();

            if (posicionListaResultados != -1)
            {
                listaResultados[posicionListaResultados].style.backgroundColor = "var(--primary)";
                listaResultados[posicionListaResultados].style.color = "var(--secondary)";
            }

            if (listaResultados[(posicionListaResultados - 1)])
            {
                posicionListaResultados--;

                listaResultados[posicionListaResultados].style.backgroundColor = "var(--accent)";
                listaResultados[posicionListaResultados].style.color = "var(--primary)";
                buscadorInput.value = listaResultados[posicionListaResultados].textContent;
            }
            else
            {
                //  Se presionó "ArrowUp" en el primer resultado => volver a búsqueda original.
                buscadorInput.value = busquedaActual;
                posicionListaResultados = -1;
            }
        }
        else if (e.key === "ArrowDown")
        {
            e.preventDefault();

            if (posicionListaResultados != -1)
            {
                listaResultados[posicionListaResultados].style.backgroundColor = "var(--primary)";
                listaResultados[posicionListaResultados].style.color = "var(--secondary)";
            }

            if (listaResultados[(posicionListaResultados + 1)])
            {
                posicionListaResultados++;

                listaResultados[posicionListaResultados].style.backgroundColor = "var(--accent)";
                listaResultados[posicionListaResultados].style.color = "var(--primary)";
                buscadorInput.value = listaResultados[posicionListaResultados].textContent;
            }
        }
    });

    // I implemented it like this because script.js has "defer" attribute.
    // If in the future this changes, this needs to be implemented inside an Event Listener.
}
// **************************************************************

// SEARCHBAR BUTTON

// const buscadorButton = document.getElementById('buscadorButton');

// if (buscadorButton)
// {
//     buscadorButton.addEventListener("click", (e) =>
//     {
//         chequearBuscador();
//     });

//     // I implemented it like this because script.js has "defer" attribute.
//     // If in the future this changes, this needs to be implemented inside an Event Listener.
// }
// **************************************************************

// SEARCH FUNCTIONS

let resultadoBusqueda = {};

async function chequearBuscador()
{
    if (buscadorInput.value !== "")
    {
        resultadoBusqueda = await buscarEnProducto(buscadorInput.value);
        mostrarResultadosBusqueda(resultadoBusqueda);
    }
    else
    {
        console.log("WARNING: Empty search bar!");
        ocultarResultadosBusqueda();
    }
}

async function fetchJSON(URL) {
    const response = await fetch(URL);
    const res = await response.json();
    return res;
}
// **************************************************************

async function buscarEnProducto(nombre)
{
    const apiURL = "/api/producto"

    let url = new URL(apiURL, window.location.origin + "/../");
    
    url.searchParams.set('nombre', nombre);

    let productos = await fetchJSON(url.toString());

    return productos;
}

function mostrarResultadosBusqueda(resultado)
{
    const resultadosBuscador = document.getElementById("resultadosBuscador");

    if (!resultadosBuscador)
    {
        console.log("ERROR: El elemento #resultadosBuscador no existe en la página!");
        return;
    }

    resultadosBuscador.style.display = 'block';
    
    while (resultadosBuscador.firstChild)
    {
        resultadosBuscador.removeChild(resultadosBuscador.firstChild);
    }

    if (resultado.length < 1)
    {
        console.log("WARNING: No results found!");
        resultadosBuscador.style.display = 'none';
    }
    else
    {
        const resultadoBuscadorLista = document.createElement('ul');
        resultadoBuscadorLista.style.margin = 0;
        resultadoBuscadorLista.style.padding = 0;
        resultadoBuscadorLista.style.listStyleType = "none";


        resultado.forEach((elementoActual, index) =>
        {
            const resultadoBuscadorIndividual = document.createElement('li');
            resultadoBuscadorIndividual.setAttribute("data-id-resultado", index);
            resultadoBuscadorIndividual.style.cursor = "pointer";
            resultadoBuscadorIndividual.textContent = elementoActual.nombre;
            resultadoBuscadorLista.appendChild(resultadoBuscadorIndividual);

            resultadoBuscadorIndividual.addEventListener("mouseover", (e) =>
            {
                e.target.style.backgroundColor = "var(--accent)";
                e.target.style.color = "var(--primary)";
            });

            resultadoBuscadorIndividual.addEventListener("mouseout", (e) =>
            {
                e.target.style.backgroundColor = "var(--primary)";
                e.target.style.color = "var(--secondary)";
            });

            resultadoBuscadorIndividual.addEventListener("click", (e) =>
            {
                if ( estaEnCarrito(resultadoBusqueda[index].id_producto) )
                {   //  resultadoBusqueda is defined in the SEARCH FUNCTIONS section globally!
                    console.log("ERROR: El item seleccionado ya está en el carrito!");
                    return;
                }

                const productoPlaceholder = document.getElementById("productoPlaceholder");
            
                if (productoPlaceholder)
                {
                    const tablaCarritoVenta = document.getElementById("table");
                    tablaCarritoVenta.removeChild(productoPlaceholder);
                }
    
                carritoCrearFila(resultadoBusqueda[index]);
            
                //  Reiniciar buscador
                buscadorInput.value = "";
                ocultarResultadosBusqueda();
                buscadorInput.focus();
            });
        });

        resultadosBuscador.appendChild(resultadoBuscadorLista);
    }
}

function ocultarResultadosBusqueda()
{
    const resultadosBuscador = document.getElementById("resultadosBuscador");

    if (!resultadosBuscador)
        return;

    while (resultadosBuscador.firstChild)
    {
        resultadosBuscador.removeChild(resultadosBuscador.firstChild);
    }

    resultadosBuscador.style.display = 'none';
}

// **************

// CARRITO VENTA FUNCTIONS

function estaEnCarrito(id_producto) //  id_producto es el nombre de la propiedad en la DB
{
    const listadoCarrito = document.querySelectorAll("tr");

    for (let index = 0; index < listadoCarrito.length; index++)
    {
        const tieneElAtributo = listadoCarrito[index].hasAttribute("data-id-producto");

        const valorAtributo = listadoCarrito[index].getAttribute("data-id-producto");
        
        //  Resulta necesario convertir ambos valores a String porque originalmente no conozco su tipo de valor.

        if (tieneElAtributo && valorAtributo.toString() === id_producto.toString())
            return true;
    }

    return false;
}

function carritoValidarCantidad(string)
{
    //  Regular expression para validar que string represente un número entero
    //  const numberRegex = /^[0-9]+$/;
    const numberRegex = /^[0-9]+([.,][0-9]+)?$/;  //  Por si solo quisiera validar un número float.

    return numberRegex.test(string);

    // Ejemplos:
    // console.log(validateNumber("12345"));   // true
    // console.log(validateNumber("12.345"));  // true
    // console.log(validateNumber("12,345"));  // true
    // console.log(validateNumber("12,34.56"));// false (múltiples separadores)
    // console.log(validateNumber("abc"));     // false (contiene caracteres no válidos como letras)
}

function carritoValidarSubtotal(string)
{
    //  Regular expression para validar que string represente un número entero
    //  const numberRegex = /^[0-9]+$/;
    const numberRegex = /^[0-9]+([.,][0-9]+)?$/;  //  Por si solo quisiera validar un número float.

    return numberRegex.test(string);

    // Ejemplos:
    // console.log(validateNumber("12345"));   // true
    // console.log(validateNumber("12.345"));  // true
    // console.log(validateNumber("12,345"));  // true
    // console.log(validateNumber("12,34.56"));// false (múltiples separadores)
    // console.log(validateNumber("abc"));     // false (contiene caracteres no válidos como letras)
}

function carritoCrearFila(resultadoBusquedaProducto)
{
    const carrito = document.getElementById("table");
    
    const fila = document.createElement("tr");
    fila.setAttribute("data-id-producto", resultadoBusquedaProducto.id_producto);

    // COLUMNA 1 - BOTON ELIMINAR FILA
    
        let data = document.createElement("td");
                
        let h5 = document.createElement("h5");
        h5.classList.add("py-2");

        const button = document.createElement("button");
        button.classList.add("botonBorrarFila");
        button.textContent = "🗑";

        button.addEventListener("click", (e) =>
        {
            //Actualizo el subtotal y total implícito (sin modificador de método de pago)
            // carritoActualizarSubtotal(precioUnitario, cantidadInput.value, h5.id, true);
            carritoActualizarSubtotal(precioUnitario, cantidadInput, subtotalInput, true);

            //Actualizo los valores de metodo de pago y total que se ven en el GUI.
            actualizarMetodoPagoYTotal();

            carritoEliminarFila(resultadoBusquedaProducto.id_producto);
        });

        h5.appendChild(button);

        data.appendChild(h5);

        fila.appendChild(data);

    // COLUMNA 2 - NOMBRE

        data = document.createElement("td");
            
        h5 = document.createElement("h5");
        h5.classList.add("py-2");

        h5.textContent = resultadoBusquedaProducto.nombre;

        data.appendChild(h5);

        fila.appendChild(data);

    // COLUMNA 3 - PRECIO UNITARIO

        data = document.createElement("td");

        const precioUnitario = (resultadoBusquedaProducto.precio_compra * ( 1 + resultadoBusquedaProducto.rentabilidad)).toFixed(2);
            
        h5 = document.createElement("h5");
        h5.id = `precioUnitario${fila.getAttribute("data-id-producto")}`;
        h5.classList.add("py-2");
        h5.textContent = precioUnitario;

        data.appendChild(h5);

        fila.appendChild(data);

    // COLUMNA 4 - CANTIDAD

        data = document.createElement("td");

        const cantidadInput = document.createElement("input");
        cantidadInput.classList.add("py-2");
        cantidadInput.id = `cantidadInput${resultadoBusquedaProducto.id_producto}`;
        // cantidadInput.setAttribute("autocomplete", "off");
        // cantidadInput.setAttribute("min", 1);
        cantidadInput.style.textAlign = "center";
        cantidadInput.value = "1.000";

        data.appendChild(cantidadInput);

        fila.appendChild(data);

    // COLUMNA 5 - SUBTOTAL

        data = document.createElement("td");


        const subtotalInput = document.createElement("input");
        subtotalInput.classList.add("py-2");
        subtotalInput.id = `subtotal${fila.getAttribute("data-id-producto")}`;
        subtotalInput.setAttribute("autocomplete", "off");
        subtotalInput.setAttribute("min", 1);
        subtotalInput.style.textAlign = "center";
        subtotalInput.value = (precioUnitario * cantidadInput.value).toFixed(2);
        subtotalInput.setAttribute("data-precio-anterior", subtotalInput.value);

        data.appendChild(subtotalInput);

        // h5 = document.createElement("h5");
        // h5.id = `subtotal${fila.getAttribute("data-id-producto")}`;
        // h5.classList.add("py-2");
        // h5.textContent = (precioUnitario * cantidadInput.value).toFixed(2);

        // data.appendChild(h5);

        fila.appendChild(data);

        const totalVenta = document.getElementById("appVentaTotal");
        // let totalVentaConvertido = parseFloat(totalVenta.textContent);
        totalVentaConvertido = parseFloat(totalVenta.textContent);

        totalVentaConvertido += parseFloat(h5.textContent);

        // totalVenta.textContent = totalVentaConvertido.toFixed(2);


        cantidadInput.addEventListener("change", () =>
        {   
            if (!carritoValidarCantidad(cantidadInput.value) || carritoValidarCantidad(cantidadInput.value) < 0.001)
            {
                console.log("ERROR: Se esperaba un número real! Reiniciando a valor predeterminado.");
                cantidadInput.value = "1.000";

                carritoActualizarSubtotal(precioUnitario, cantidadInput, subtotalInput);
                actualizarMetodoPagoYTotal("aparte");

                return;
            }

            //Parseo correctamente antes de calcular
            cantidadInput.value = (parseFloat(cantidadInput.value)).toFixed(3);

            carritoActualizarSubtotal(precioUnitario, cantidadInput, subtotalInput);

            actualizarMetodoPagoYTotal("aparte");
        });

        subtotalInput.addEventListener("change", () =>
        {   
            if (carritoValidarSubtotal(subtotalInput.value) === false)
            {
                console.log("ERROR: Se esperaba un número real! Reiniciando a valor predeterminado.");
                subtotalInput.value = "1.00";

                carritoActualizarCantidad(precioUnitario, cantidadInput, subtotalInput);
                actualizarMetodoPagoYTotal("aparte");

                return;
            }

            subtotalInput.value = (parseFloat(subtotalInput.value)).toFixed(2);

            carritoActualizarCantidad(precioUnitario, cantidadInput, subtotalInput);

            actualizarMetodoPagoYTotal("aparte");
        });

        cantidadInput.addEventListener("keydown", (e) =>
        {
            if (cantidadInput.value.length === 1 && e.key === "Backspace")
            {
                e.preventDefault();

                console.log("ERROR: Cantidad tiene que ser mayor que 0.001! Reiniciando a valor predeterminado.");
                cantidadInput.value = "1.000";

                carritoActualizarSubtotal(precioUnitario, cantidadInput, subtotalInput);
                actualizarMetodoPagoYTotal("aparte");

                return;
            }

            if (e.key === "ArrowUp")
            {
                e.preventDefault();

                cantidadInput.value = (parseFloat(cantidadInput.value) + 1.0).toFixed(3);

            }
            else if (e.key === "ArrowDown")
            {
                e.preventDefault();

                if (parseFloat(cantidadInput.value) - 1.0 > 0.001)
                {
                    cantidadInput.value = (parseFloat(cantidadInput.value) - 1.0).toFixed(3);
                }
            }

            carritoActualizarSubtotal(precioUnitario, cantidadInput, subtotalInput);
            actualizarMetodoPagoYTotal("aparte");
        });

    // AGREGAR FILA AL CARRITO

    carrito.appendChild(fila);

    // ACTUALIZAR TABLA DE VALORES

    actualizarMetodoPagoYTotal("aparte");
}

function carritoReiniciar()
{
    const carrito = document.getElementById("table");

    const listadoCarrito = carrito.querySelectorAll("tr");

    for (let actual = 0; actual < listadoCarrito.length; actual++)
    {
        carritoEliminarFila(listadoCarrito[actual].getAttribute("data-id-producto"));
    }

    //  NOTA: carritoEliminarFila() automáticamente inserta el placeholder al remover la última fila.
}

function carritoInsertarPlaceholder()
{
    const carrito = document.getElementById("table");
    
    const fila = document.createElement("tr");
    fila.id = "productoPlaceholder";

    // COLUMNA 1 - BOTON ELIMINAR FILA
    
        let data = document.createElement("td");
                
        let h5 = document.createElement("h5");
        h5.classList.add("py-2");

        const button = document.createElement("p");
        // const button = document.createElement("button");
        // button.classList.add("botonBorrarFila");
        // button.textContent = "🗑";

        h5.appendChild(button);

        data.appendChild(h5);

        fila.appendChild(data);

    // COLUMNA 2 - NOMBRE

        data = document.createElement("td");
            
        h5 = document.createElement("h5");
        h5.classList.add("py-2");

        // h5.textContent = "Producto placeholder";

        data.appendChild(h5);

        fila.appendChild(data);

    // COLUMNA 3 - PRECIO UNITARIO

        data = document.createElement("td");
            
        h5 = document.createElement("h5");
        h5.classList.add("py-2");
        // h5.textContent = "18.12";

        data.appendChild(h5);

        fila.appendChild(data);

    // COLUMNA 4 - CANTIDAD

        data = document.createElement("td");

        const cantidadInput = document.createElement("input");
        cantidadInput.classList.add("py-2");
        cantidadInput.setAttribute("autocomplete", "off");
        cantidadInput.setAttribute("min", 1);
        cantidadInput.setAttribute("disabled", "");
        cantidadInput.style.textAlign = "center";
        // cantidadInput.value = 1;

        data.appendChild(cantidadInput);

        fila.appendChild(data);

    // COLUMNA 5 - SUBTOTAL

        data = document.createElement("td");

        const subtotalInput = document.createElement("input");
        subtotalInput.classList.add("py-2");
        subtotalInput.setAttribute("autocomplete", "off");
        subtotalInput.setAttribute("disabled", "");

        data.appendChild(subtotalInput);

        // h5 = document.createElement("h5");
        // h5.classList.add("py-2");
        // // h5.textContent = "18.12";

        // data.appendChild(h5);

        fila.appendChild(data);

    // AGREGAR FILA AL CARRITO

    carrito.appendChild(fila);
}

function carritoEliminarFila(id_producto)
{
    const listadoCarrito = document.querySelectorAll("tr");

    let index = 1;
    let sigue = index < listadoCarrito.length;

    while (sigue)
    {
        const tieneElAtributo = listadoCarrito[index].hasAttribute("data-id-producto");

        const valorAtributo = listadoCarrito[index].getAttribute("data-id-producto");
        
        //  Resulta necesario convertir ambos valores a String porque originalmente no conozco su tipo de valor.

        if (tieneElAtributo && valorAtributo.toString() === id_producto.toString())
        {     
            const tablaCarritoVenta = document.getElementById("table");
            tablaCarritoVenta.removeChild(listadoCarrito[index]);
            
            if (listadoCarrito.length === 2)    //  Este valor no se actualiza luego de borrar,   
            carritoInsertarPlaceholder();   //  ergo indica que el carrito está vacío

            return;
        }

        index++;
        let sigue = index < listadoCarrito.length;
    }

    console.log("ERROR: El ID del producto no está en el carrito!");
}
// **************************************************************

// METODO DE PAGO

const containerMetodoPago = document.getElementById("containerMetodoPago");
const metodoPago = containerMetodoPago.querySelector("select");
metodoPago.setAttribute("data-valor-previo", metodoPago.value);

metodoPago.addEventListener("change", () =>
{     
    metodoPagoComplementario.disabled = false;

    const valorPrevio = metodoPago.getAttribute("data-valor-previo");

    if (valorPrevio != "default")
    {
        const optionParaBloquear = buscarOpcionMetodoPago("containerMetodoPagoComplementario", valorPrevio);
        optionParaBloquear.disabled = false;
    }

    const optionParaBloquear = buscarOpcionMetodoPago("containerMetodoPagoComplementario", metodoPago.value);
    optionParaBloquear.disabled = true;

    metodoPago.setAttribute("data-valor-previo", metodoPago.value);
    
    actualizarMetodoPagoYTotal("aparte");
});

const montoMetodoPago = containerMetodoPago.querySelector("input");

montoMetodoPago.addEventListener("change", () =>
{
    if (validarInputMontos(montoMetodoPago.value) === false)
    {
        console.log("ERROR: Se espera un número entero (integer) o flotante (float)!");
        montoMetodoPago.value = "0.00";
        return;
    }

    montoMetodoPago.value = montoMetodoPago.value.replace(/,/g, ".");
    montoMetodoPago.value = parseFloat(montoMetodoPago.value).toFixed(2);
    
    actualizarMetodoPagoYTotal("metodoPago");
});
// **************************************************************

// METODO DE PAGO COMPLEMENTARIO

const containerMetodoPagoComplementario = document.getElementById("containerMetodoPagoComplementario");
const metodoPagoComplementario = containerMetodoPagoComplementario.querySelector("select");
metodoPagoComplementario.setAttribute("data-valor-previo", metodoPagoComplementario.value);

metodoPagoComplementario.addEventListener("change", () =>
{      
    if (metodoPagoComplementario.value === "default")
    {
        montoMetodoPago.disabled = true;

        montoMetodoPagoComplementario.disabled = true;
        montoMetodoPagoComplementario.value = "NO USADO";
    }
    else
    {
        montoMetodoPago.disabled = false;

        montoMetodoPagoComplementario.disabled = false;
    }

    const valorPrevio = metodoPagoComplementario.getAttribute("data-valor-previo");

    if(valorPrevio != "default")
    {
        const optionParaBloquear = buscarOpcionMetodoPago("containerMetodoPago", valorPrevio);
        optionParaBloquear.disabled = false;
    }

    const optionParaBloquear = buscarOpcionMetodoPago("containerMetodoPago", metodoPagoComplementario.value);
    optionParaBloquear.disabled = true;

    metodoPagoComplementario.setAttribute("data-valor-previo", metodoPagoComplementario.value);

    actualizarMetodoPagoYTotal("aparte");
});

const montoMetodoPagoComplementario = containerMetodoPagoComplementario.querySelector("input");

montoMetodoPagoComplementario.addEventListener("change", () =>
{
    if (validarInputMontos(montoMetodoPagoComplementario.value) === false)
    {
        console.log("ERROR: Se espera un número entero (integer) o flotante (float)!");
        montoMetodoPagoComplementario.value = "0.00";
        return;
    }

    montoMetodoPagoComplementario.value = montoMetodoPagoComplementario.value.replace(/,/g, ".");
    montoMetodoPagoComplementario.value = parseFloat(montoMetodoPagoComplementario.value).toFixed(2);

    actualizarMetodoPagoYTotal("metodoPagoComplementario");
});
// **************************************************************

// METODO DE PAGO FUNCTIONS

function buscarOpcionMetodoPago(idMetodoPago, value)
{
    const container = document.getElementById(idMetodoPago);
    const select = container.querySelector("select");
    const options = select.options;

    //  Uso bucle for para buscar porque los métodos de pago no tienen orden alfabético.
    for (let index = 0; index < options.length; index++) 
    {
        if (options[index].value === value)
            return options[index];
    }
    
    console.log("ERROR: La opción buscada no se encuentra en la lista!");
    return;
}

function validarInputMontos(string)
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

// MODIFICADORES METODO DE PAGO

let totalVentaConvertido = 0.00;

function carritoActualizarCantidad(precioUnitario, cantidadInput, subtotalInput)
{
    console.log("carritoActualizarCantidad");

    //  Convierto valores de subtotal y totalVenta a flotantes
    let subtotalConvertido = parseFloat(subtotalInput.value);

    //  Quito el valor del subtotal previo a totalVenta
    if (totalVentaConvertido != 0.00)
    {
        totalVentaConvertido -= parseFloat(subtotalInput.getAttribute("data-precio-anterior"));
    }

    cantidadInput.value = (subtotalConvertido / precioUnitario).toFixed(3);

    subtotalInput.setAttribute("data-precio-anterior", subtotalInput.value);

    //  Finalmente actualizo el valor de totalVenta con el nuevo subtotal
    totalVentaConvertido += subtotalConvertido;
}

function carritoActualizarSubtotal(precioUnitario, cantidadInput, subtotalInput, restar = false)
{    
    //  Convierto valores de subtotal y totalVenta a flotantes
    let subtotalConvertido = parseFloat(subtotalInput.value);

    //  Quito el valor del subtotal previo a totalVenta
    if (totalVentaConvertido != 0.00)
    {
        totalVentaConvertido -= parseFloat(subtotalInput.getAttribute("data-precio-anterior"));
    }

    //  Actualizo valores de subtotal y totalVenta
    subtotalInput.value = (precioUnitario * parseFloat(cantidadInput.value)).toFixed(2);

    // totalVentaConvertido = parseFloat(totalVenta.textContent);
    subtotalConvertido = parseFloat(subtotalInput.value);

    subtotalInput.setAttribute("data-precio-anterior", subtotalInput.value);

    if(!restar)
    {
        //  Finalmente actualizo el valor de totalVenta con el nuevo subtotal
        totalVentaConvertido += subtotalConvertido;
    }
}

function actualizarMetodoPagoYTotal()   // Actualizar MONTO metodos de pago y total VENTA CONVERTIDO
{
    const totalVenta = document.getElementById("appVentaTotal");
    
    if (metodoPagoComplementario.value === "default")
    {
        montoMetodoPago.value = parseFloat(totalVentaConvertido).toFixed(2);
        montoMetodoPagoComplementario.value = "0.00";

        totalVenta.textContent = (parseFloat(montoMetodoPago.value) + parseFloat(montoMetodoPagoComplementario.value)).toFixed(2);
        
        return;
    }

    if (!arguments[0])
    {
        console.log("ERROR: Se espera al menos 1 argumento para manejar múltiples metodos de pago. Se asumo el caso predeterminado.");
        montoMetodoPago.value = parseFloat(totalVentaConvertido).toFixed(2);
        montoMetodoPagoComplementario.value = "0.00";

        totalVenta.textContent = (parseFloat(montoMetodoPago.value) + parseFloat(montoMetodoPagoComplementario.value)).toFixed(2);

        return;
    }

    //  El if (valorActual < 0) lo repito en los 3 casos válidos porque hay 2 posibilidades del "else" distintas.
    
    if (arguments[0] === "metodoPago")
    {
        const VALOR_ACTUAL = (parseFloat(totalVentaConvertido) - parseFloat(montoMetodoPago.value)).toFixed(2);

        if (VALOR_ACTUAL < 0)
        {
            console.log("ERROR: Los valores para ambos metodos de pago ya no son válidos. Reiniciando al caso predeterminado.");
    
            montoMetodoPago.value = parseFloat(totalVentaConvertido).toFixed(2);
            montoMetodoPagoComplementario.value = "0.00";

            totalVenta.textContent = (parseFloat(montoMetodoPago.value) + parseFloat(montoMetodoPagoComplementario.value)).toFixed(2);

            return;
        }
        
        montoMetodoPagoComplementario.value = VALOR_ACTUAL;

        totalVenta.textContent = (parseFloat(montoMetodoPago.value) + parseFloat(montoMetodoPagoComplementario.value)).toFixed(2);
    }
    else if (arguments[0] === "metodoPagoComplementario" || arguments[0] === "aparte")
    {
        const VALOR_ACTUAL = (parseFloat(totalVentaConvertido) - parseFloat(montoMetodoPagoComplementario.value)).toFixed(2);

        if (VALOR_ACTUAL < 0)
        {
            console.log("ERROR: Los valores para ambos metodos de pago ya no son válidos. Reiniciando al caso predeterminado.");
    
            montoMetodoPago.value = parseFloat(totalVentaConvertido).toFixed(2);
            montoMetodoPagoComplementario.value = "0.00";

            totalVenta.textContent = (parseFloat(montoMetodoPago.value) + parseFloat(montoMetodoPagoComplementario.value)).toFixed(2);

            return;
        }
        
        montoMetodoPago.value = VALOR_ACTUAL;
        
        totalVenta.textContent = (parseFloat(montoMetodoPago.value) + parseFloat(montoMetodoPagoComplementario.value)).toFixed(2);
    }
    else
    {
        console.log("ERROR: Argumento no reconocido. Se asume el caso predeterminado.");
        montoMetodoPago.value = parseFloat(totalVentaConvertido).toFixed(2);
        montoMetodoPagoComplementario.value = "0.00";
        
        totalVenta.textContent = (parseFloat(montoMetodoPago.value) + parseFloat(montoMetodoPagoComplementario.value)).toFixed(2);

        return;
    }
}
// **************************************************************

// FINALIZAR COMPRA

const appVentaFinalizarVenta = document.getElementById("appVentaFinalizarVenta");

appVentaFinalizarVenta.addEventListener("click", (e) => 
{
    // Si el carrito contiene producto placeholder => nunca se agregó un item al carrito!
    const productoPlaceholder = document.getElementById("productoPlaceholder");
            
    if (productoPlaceholder)
    {
        window.alert("ERROR: Tiene que haber al menos un producto en el carrito.\n\nEl placeholder no cuenta!");
        return;
    }

    // listadoCarrito.length debería ser > 1 para indicar que existe al menos 1 producto en el carrito.
    const listadoCarrito = document.querySelectorAll("tr");

    if (listadoCarrito.length === 1)
    {
        window.alert("ERROR: Carrito vacío!");
        return;
    }

    //  VALIDO METODOS DE PAGO

    if ( !validarMetodosPago() )
        return;

    //  ENVIO DE PAYLOAD SIN DOBLE CONFIRM
    cargarCarritoVenta();
    // window.alert("VENTA FINALIZADA");

    //  ACÁ ENVIAR carritoVenta a donde corresponda.
    entregarVenta();
    // console.log(carritoVenta);

    //  REINICIAR TODO
    carritoReiniciar();
    carritoVenta = iniciarCarritoVenta(carritoVenta);
    metodoPago.value = "default";
    montoMetodoPago.value = "0.00";
    metodoPagoComplementario.value = "default";
    metodoPagoComplementario.disabled = true;
    montoMetodoPagoComplementario.value = "0.00";
    totalVentaConvertido = 0.00;
    
    //  Recargar página; esto podría evitarse si es prioridad mantener modalidad SPA.
    //  location.reload();
    // ----------------------------------------------------

    
    // if ( !window.confirm("Estás por finalizar la venta...\n\n¿Estás seguro?") )
    //     return;

    // // Insistir con la confirmación para evitar lo máximo posible finalizar la venta por accidente.
    // setTimeout(() =>
    // {
    //     if ( !window.confirm("¿Realmente estás seguro?") )
    //         return;

    //     cargarCarritoVenta();
    //     // window.alert("VENTA FINALIZADA");

    //     //  ACÁ ENVIAR carritoVenta a donde corresponda.
    //     entregarVenta();
    //     // console.log(carritoVenta);

    //     //  REINICIAR TODO
    //     carritoReiniciar();
    //     carritoVenta = iniciarCarritoVenta(carritoVenta);
    //     metodoPago.value = "default";
    //     montoMetodoPago.value = "0.00";
    //     metodoPagoComplementario.value = "default";
    //     metodoPagoComplementario.disabled = true;
    //     montoMetodoPagoComplementario.value = "0.00";
    //     totalVentaConvertido = 0.00;
        
    //     //  Recargar página; esto podría evitarse si es prioridad mantener modalidad SPA.
    //     //  location.reload();
    // }, 250);
});
// **************************************************************

// FINALIZAR VENTA FUNCTIONS

function validarMetodosPago()
{
    const metodo1valido = containerMetodoPago && metodoPago && montoMetodoPago;
    const metodo2valido = containerMetodoPagoComplementario && metodoPagoComplementario && montoMetodoPagoComplementario;

    if ( !metodo1valido && !metodo2valido )
    {
        window.alert("ERROR: Un elemento para METODO DE PAGO ó METODO DE PAGO COMPLEMENTARIO no fue definido!");
        return false;
    }

    if ( metodoPago.value === "default" )
    {
        window.alert("ERROR: Se tiene que seleccionar al menos 1 METODO DE PAGO!");
        return false;
    }

    if ( montoMetodoPago.value === "0.00" )
    {
        window.alert("ERROR: No se está usando METODO DE PAGO!");
        return false;
    }

    if ( metodoPagoComplementario.value != "default" && montoMetodoPagoComplementario.value === "0.00" )
    {
        window.alert("ERROR: No se está usando METODO DE PAGO COMPLEMENTARIO!");
        return false;
    }

    return true;
}

//  Este objeto es el que se envía al finalizar la venta.
let carritoVenta = {};
carritoVenta = iniciarCarritoVenta(carritoVenta);

function iniciarCarritoVenta(carritoVenta)
{
    carritoVenta = {
        "id_medio_pago1": "default",
        "parcial1": "0.00",

        "id_medio_pago2": "default",    //  0 si no se usa
        "parcial2": "0.00",

        "total": "0.00",

        "lineas_venta": []
        // Contenido de cada objeto de lineas_venta
        // {
        //     "id_producto": 1,
        //     "cantidad": 3,
        //     "precio_venta": 1000.0
        // }
    }

    return carritoVenta;
}

function cargarCarritoVenta()
{
    //  METODOS DE PAGO

    /*
        id_medio_pago es asignado buscando directamente el valor de un atributo arbitrario DE LA OPCIÓN SELECCIONADA. Gracias a esto evito agregar atributos al <select> y complicar más aún la validación, ya que solamente se hace esto cuando ya se va a cargar al endpoint (o sea, todo debería estar validado previamente)
    */

    carritoVenta.id_medio_pago1 = parseInt( metodoPago.selectedOptions[0].getAttribute("data-id-metodo-pago") );
    carritoVenta.parcial1 = parseFloat(montoMetodoPago.value).toFixed(2);

    carritoVenta.id_medio_pago2 = parseInt( metodoPagoComplementario.selectedOptions[0].getAttribute("data-id-metodo-pago") );

    if ( metodoPagoComplementario.value != "default" )
        carritoVenta.parcial2 = parseFloat(montoMetodoPagoComplementario.value).toFixed(2);

    //  TOTAL

    const totalVenta = document.getElementById("appVentaTotal");
    carritoVenta.total = parseFloat(totalVenta.textContent).toFixed(2);

    //  LISTADO PRODUCTOS VENDIDOS

    const listadoCarrito = document.querySelectorAll("tr");

    let dataIdProducto = 0;
    let cantidad = 0.0;
    let precio_venta = 0.0;

    //  index = 1 Para saltear el tr de <thead>
    for (let index = 1; index < listadoCarrito.length; index++)
    {
        dataIdProducto = listadoCarrito[index].getAttribute("data-id-producto");
        // cantidad = document.getElementById(`cantidadInput${dataIdProducto}`).value;
        cantidad = document.getElementById(`cantidadInput${dataIdProducto}`).value;
        precio_venta = document.getElementById(`subtotal${dataIdProducto}`).value;

        carritoVenta.lineas_venta.push({
            "id_producto": parseInt(dataIdProducto),
            "cantidad": parseFloat(cantidad).toFixed(3),
            "precio_venta": parseFloat(precio_venta).toFixed(2),
        })
    }
}

function entregarVenta()
{
    const JSON_DATA = JSON.stringify(carritoVenta);

    const HEADERS = new Headers();
    HEADERS.append('Content-Type', 'application/json');

    // console.log(JSON_DATA);

    const API_URL = "/new/venta";

    const LINK = new URL(API_URL, window.location.origin);

    fetch(LINK, {
        method: 'POST',
        headers: HEADERS,
        body: JSON_DATA
    })

    // .then(response => response.json())
    .then(response => response.text())
    
    .then(responseData => {
        window.alert(responseData);  // Resultado de enviar el json.
    })
    
    .catch(error => {
        console.log("ERROR: ", error);  // Errores que puedan haber.
    })
}
// **************************************************************