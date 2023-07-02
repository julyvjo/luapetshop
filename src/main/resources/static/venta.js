// HISTORIAL BUTTON

const historialVenta = document.getElementById('botonHistorialVenta');

if (historialVenta)
{
    historialVenta.addEventListener("click", (e) =>
    {
        mostrarModal("historialVenta");
    });

    // I implemented it like this because script.js has "defer" attribute.
    // If in the future this changes, this needs to be implemented inside an Event Listener.
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
        // console.log(e.target.value.toLowerCase());
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
                console.log("ERROR: The selected item is already in the cart!");
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

/* VERSIÓN JULY
async function buscarEnVentas(){
    const URL = "/api/producto"
    let url = new URL(URL);
    let nombre = "1" //aca habria que inyectar el input
    
    url.searchParams.set('nombre', nombre);

    //setear el event listener para detectar que el search cambia 
    //(sino usar el boton de buscar)
    //el event listener llama a una funcion que dispara la busqueda de productos
    //una vez obtenidos los productos, mostrarlos en la interfaz con un dropdown
    //o similar, lo que sea mas facil
    let productos = await fetchJSON(url.toString());

    console.log(productos)

}
*/

/* VERSIÓN CHAT GPT
async function buscarEnProducto(nombre) {
    const apiURL = "/api/producto";
    const url = new URL(apiURL, window.location.origin + "/../");
    
    url.searchParams.set('nombre', nombre);
  
    try {
      const response = await fetch(url); // Send a GET request to the API
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json(); // Parse the response data as JSON
  
      // Handle the data here (e.g., display the results)
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }
*/
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
        console.log("ERROR: It seems like no #resultadosBuscador element exists in this page!");
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
            // console.log(elementoActual);
            const resultadoBuscadorIndividual = document.createElement('li');
            resultadoBuscadorIndividual.setAttribute("data-id-resultado", index);
            resultadoBuscadorIndividual.style.cursor = "pointer";
            resultadoBuscadorIndividual.textContent = elementoActual.nombre;
            resultadoBuscadorLista.appendChild(resultadoBuscadorIndividual);

            resultadoBuscadorIndividual.addEventListener("mouseover", (e) =>
            {
                // console.log("hola");
                e.target.style.backgroundColor = "var(--accent)";
                e.target.style.color = "var(--primary)";
            });

            resultadoBuscadorIndividual.addEventListener("mouseout", (e) =>
            {
                // console.log("chau");
                e.target.style.backgroundColor = "var(--primary)";
                e.target.style.color = "var(--secondary)";
            });

            resultadoBuscadorIndividual.addEventListener("click", (e) =>
            {
                // console.log("hehe boi");
            
                if ( estaEnCarrito(resultadoBusqueda[index].id_producto) )
                {   //  resultadoBusqueda is defined in the SEARCH FUNCTIONS section globally!
                    console.log("ERROR: The selected item is already in the cart!");
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
        // console.table(resultado);
        // console.log(resultado);
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
     const numberRegex = /^[0-9]+$/;
    // const numberRegex = /^[0-9]+([.,][0-9]+)?$/;  //  Por si solo quisiera validar un número float.

    return numberRegex.test(string);

    // Ejemplos:
    console.log(validateNumber("12345"));   // true
    console.log(validateNumber("12.345"));  // false (número float)
    console.log(validateNumber("12,345"));  // false (número float)
    console.log(validateNumber("12,34.56"));// false (múltiples separadores)
    console.log(validateNumber("abc"));     // false (contiene caracteres no válidos como letras)
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
        // cantidadInput.setAttribute("type", "number");
        cantidadInput.setAttribute("autocomplete", "off");
        cantidadInput.setAttribute("min", 1);
        cantidadInput.style.textAlign = "center";
        cantidadInput.value = 1;

        data.appendChild(cantidadInput);

        fila.appendChild(data);

    // COLUMNA 5 - SUBTOTAL

        data = document.createElement("td");

        h5 = document.createElement("h5");
        h5.id = `subtotal${fila.getAttribute("data-id-producto")}`;
        h5.classList.add("py-2");
        h5.textContent = (precioUnitario * cantidadInput.value).toFixed(2);

        data.appendChild(h5);

        fila.appendChild(data);

        const totalVenta = document.getElementById("appVentaTotal");
        let totalVentaConvertido = parseFloat(totalVenta.textContent);

        // console.log("totalVentaConvertido", totalVentaConvertido);

        totalVentaConvertido += parseFloat(h5.textContent);

        // console.log("totalVentaConvertido += parseFloat(h5.textContent)", totalVentaConvertido);

        totalVenta.textContent = totalVentaConvertido.toFixed(2);


        cantidadInput.addEventListener("change", () =>
        {   
            if (carritoValidarCantidad(cantidadInput.value) === false)
            {
                console.log("ERROR: Expecting integer number! Reseting to default value.");
                cantidadInput.value = "1";
                return;
            }

            carritoActualizarSubtotal(precioUnitario, cantidadInput.value, h5.id);

            actualizarMetodoPagoYTotal("aparte");
        });

        cantidadInput.addEventListener("keydown", (e) =>
        {
            if (e.key === "ArrowUp" || e.key === "ArrowRight")
            {
                // console.log("SUBIR CANTIDAD.");
                e.preventDefault();

                cantidadInput.value = parseInt(cantidadInput.value) + 1;
                carritoActualizarSubtotal(precioUnitario, cantidadInput.value, h5.id);
                actualizarMetodoPagoYTotal("aparte");
            }
            else if (e.key === "ArrowDown" || e.key === "ArrowLeft")
            {
                // console.log("BAJAR CANTIDAD.");
                e.preventDefault();

                if (parseInt(cantidadInput.value) - 1 > 0)
                {
                    cantidadInput.value = parseInt(cantidadInput.value) - 1;
                    carritoActualizarSubtotal(precioUnitario, cantidadInput.value, h5.id);
                    actualizarMetodoPagoYTotal("aparte");
                }
            }
        });

    // AGREGAR FILA AL CARRITO

    carrito.appendChild(fila);

    // ACTUALIZAR TABLA DE VALORES

    actualizarMetodoPagoYTotal("aparte");
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

        const button = document.createElement("button");
        button.classList.add("botonBorrarFila");
        button.textContent = "🗑";

        h5.appendChild(button);

        data.appendChild(h5);

        fila.appendChild(data);

    // COLUMNA 2 - NOMBRE

        data = document.createElement("td");
            
        h5 = document.createElement("h5");
        h5.classList.add("py-2");

        h5.textContent = "Producto placeholder";

        data.appendChild(h5);

        fila.appendChild(data);

    // COLUMNA 3 - PRECIO UNITARIO

        data = document.createElement("td");
            
        h5 = document.createElement("h5");
        h5.classList.add("py-2");
        h5.textContent = "18.12";

        data.appendChild(h5);

        fila.appendChild(data);

    // COLUMNA 4 - CANTIDAD

        data = document.createElement("td");

        const cantidadInput = document.createElement("input");
        cantidadInput.classList.add("py-2");
        // cantidadInput.setAttribute("type", "number");
        cantidadInput.setAttribute("autocomplete", "off");
        cantidadInput.setAttribute("min", 1);
        cantidadInput.style.textAlign = "center";
        cantidadInput.value = 1;

        data.appendChild(cantidadInput);

        fila.appendChild(data);

    // COLUMNA 5 - SUBTOTAL

        data = document.createElement("td");

        h5 = document.createElement("h5");
        h5.classList.add("py-2");
        h5.textContent = "18.12";

        data.appendChild(h5);

        fila.appendChild(data);

    // AGREGAR FILA AL CARRITO

    carrito.appendChild(fila);
}


function carritoActualizarSubtotal(precioUnitario, cantidadInput, subtotalId)
{
    // console.log(subtotalId);
    
    //  Convierto valores de subtotal y totalVenta a flotantes
    const subtotal = document.getElementById(`${subtotalId}`);
    let subtotalConvertido = parseFloat(subtotal.textContent);

    const totalVenta = document.getElementById("appVentaTotal");
    let totalVentaConvertido = parseFloat(totalVenta.textContent);

    // console.log("Convierto valores de subtotal y totalVenta a flotantes", subtotalConvertido, totalVentaConvertido);

    //  Quito el valor del subtotal previo a totalVenta
    if (totalVenta.textContent != "0.00")
    {
        totalVenta.textContent = (totalVentaConvertido - subtotalConvertido);
        // console.log("Quito el valor del subtotal previo a totalVenta", totalVenta.textContent);
    }

    //  Actualizo valores de subtotal y totalVenta
    subtotal.textContent = (precioUnitario * cantidadInput).toFixed(2);
    // console.log("Actualizo valores de subtotal y totalVenta", subtotal.textContent);

    totalVentaConvertido = parseFloat(totalVenta.textContent);
    subtotalConvertido = parseFloat(subtotal.textContent);
    // console.log("totalVentaConvertido", totalVentaConvertido,"subtotalConvertido", subtotalConvertido);

    //  Finalmente actualizo el valor de totalVenta con el nuevo subtotal
    totalVenta.textContent = (totalVentaConvertido + subtotalConvertido).toFixed(2);
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
            
            // Actualizar TOTAL

            //  Convierto valores de subtotal y totalVenta a flotantes
            const subtotal = document.getElementById(`subtotal${id_producto}`);
            let subtotalConvertido = parseFloat(subtotal.textContent).toFixed(2);

            const totalVenta = document.getElementById("appVentaTotal");
            let totalVentaConvertido = parseFloat(totalVenta.textContent).toFixed(2);

            //  Quito el valor del subtotal a totalVenta
            totalVenta.textContent = (totalVentaConvertido - subtotalConvertido).toFixed(2);

            // Actualizar METODOS DE PAGO
            
            const tablaCarritoVenta = document.getElementById("table");
            tablaCarritoVenta.removeChild(listadoCarrito[index]);

            if (listadoCarrito.length === 2)    //  Este valor no se actualiza luego de borrar,   
                carritoInsertarPlaceholder();   //  ergo indica que el carrito está vacío

            actualizarMetodoPagoYTotal();

            return;
        }

        index++;
        let sigue = index < listadoCarrito.length;
    }

    console.log("ERROR: Somehow id_producto is not in the cart...");
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
    // console.log("valorPrevio = ", valorPrevio);

    if (valorPrevio != "default")
    {
        // console.log("valorPrevio != default");
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
    console.log("montoMetodoPago cambió su valor");
    
    if (validarInputMontos(montoMetodoPago.value) === false)
    {
        console.log("ERROR: Expecting integer or float number! ");
        montoMetodoPago.value = "0.00";
        return;
    }
    
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
        montoMetodoPagoComplementario.value = "0.00";
    }

    const valorPrevio = metodoPagoComplementario.getAttribute("data-valor-previo");
    // console.log("valorPrevio = ", valorPrevio);

    if(valorPrevio != "default")
    {
        // console.log("valorPrevio != default");
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
    console.log("montoMetodoPagoComplementario cambió su valor");

    if (validarInputMontos(montoMetodoPagoComplementario.value) === false)
    {
        console.log("ERROR: Expecting integer or float number! ");
        montoMetodoPagoComplementario.value = "0.00";
        return;
    }

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
    
    console.log("ERROR: Value not found in option list");
    return;
}

function validarInputMontos(string)
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

function actualizarMetodoPagoYTotal()
{
    // if (metodoPago.value === "default")
    // {
    //     console.log("WARNING: You need to select at least 1 METODO DE PAGO");
    //     return;
    // }

    // const montoMetodoPago = containerMetodoPago.querySelector("input");

    // const containerMetodoPagoComplementario = document.getElementById("containerMetodoPagoComplementario");
    // const metodoPagoComplementario = containerMetodoPagoComplementario.querySelector("select");
    // const montoMetodoPagoComplementario = containerMetodoPago.querySelector("input");

    const totalVenta = document.getElementById("appVentaTotal");

    if (metodoPagoComplementario.value === "default")
    {
        // console.log("Metodo de pago complementario NO seleccionado!");
        montoMetodoPago.value = totalVenta.textContent;
        montoMetodoPagoComplementario.value = "0.00";
        return;
    }

    if (!arguments[0])
    {
        console.log("ERROR: Expected 1 argument to handle multiple metodo de pago. Asuming default case.");
        montoMetodoPago.value = parseFloat(totalVenta.textContent);
        montoMetodoPagoComplementario.value = "0.00";
        return;
    }

    //  El if (valorActual < 0) lo repito en los 3 casos válidos porque hay 2 posibilidades del "else" distintas.
    
    if (arguments[0] === "metodoPago")
    {
        console.log("metodoPago");
        const valorActual = (parseFloat(totalVenta.textContent) - montoMetodoPago.value).toFixed(2);

        if (valorActual < 0)
        {
            console.log("ERROR: Values for both metodos de pago no longer valid. Resetting to default case.");
    
            montoMetodoPago.value = parseFloat(totalVenta.textContent);
            montoMetodoPagoComplementario.value = "0.00";
            return;
        }
        
        montoMetodoPagoComplementario.value = valorActual;
    }
    else if (arguments[0] === "metodoPagoComplementario" || arguments[0] === "aparte")
    {
        console.log(arguments[0]);
        const valorActual = (parseFloat(totalVenta.textContent) - montoMetodoPagoComplementario.value).toFixed(2);

        if (valorActual < 0)
        {
            console.log("ERROR: Values for both metodos de pago no longer valid. Resetting to default case.");
    
            montoMetodoPago.value = parseFloat(totalVenta.textContent);
            montoMetodoPagoComplementario.value = "0.00";
            return;
        }
        
        montoMetodoPago.value = valorActual;
    }
    else
    {
        console.log("ERROR: Argument not recognized. Asuming default case.");
        montoMetodoPago.value = parseFloat(totalVenta.textContent);
        montoMetodoPagoComplementario.value = "0.00";
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
        console.log("ERROR: You have to add at least one item to the cart. The placeholder does not count as one!");
        return;
    }

    // listadoCarrito.length debería ser > 1 para indicar que existe al menos 1 producto en el carrito.
    const listadoCarrito = document.querySelectorAll("tr");

    if (listadoCarrito.length === 1)
    {
        console.log("ERROR: Empty cart!");
        return;
    }

    /*
    if ( !window.confirm("Estás por finalizar la venta... ¿Estás seguro?") )
        return;

    // Insistir con la confirmación para evitar lo máximo posible finalizar la venta por accidente.
    setTimeout(() =>
    {
        if ( !window.confirm("¿Realmente estás seguro?") )
            return;

        cargarCarritoVenta();
        console.log("VENTA FINALIZADA");

        // ACÁ ENVIAR carritoVenta a donde corresponda.
        console.log(carritoVenta);

        // Reiniciar carritoVenta
        carritoVenta = iniciarCarritoVenta(carritoVenta); 
        
        //  Recargar página; esto podría evitarse si es prioridad mantener modalidad SPA.
        //  location.reload();
    }, 250);
    */

    //  VALIDO METODOS DE PAGO

    if ( !validarMetodosPago() )
        return;

    //  IMPLEMENTACIÓN SIN CONFIRMACIÓN PARA AGILIZAR TESTING
    cargarCarritoVenta();
    console.log("VENTA FINALIZADA");

    // ACÁ ENVIAR carritoVenta a donde corresponda.
    console.log(carritoVenta);

    carritoVenta = iniciarCarritoVenta(carritoVenta); 
});
// **************************************************************

// FINALIZAR VENTA FUNCTIONS

function validarMetodosPago()
{
    const containerMetodoPago = document.getElementById("containerMetodoPago");
    const metodoPago = containerMetodoPago.querySelector("select");
    const montoMetodoPago = containerMetodoPago.querySelector("input");

    const containerMetodoPagoComplementario = document.getElementById("containerMetodoPagoComplementario");
    const metodoPagoComplementario = containerMetodoPagoComplementario.querySelector("select");
    const montoMetodoPagoComplementario = containerMetodoPagoComplementario.querySelector("input");

    const metodo1valido = containerMetodoPago && metodoPago && montoMetodoPago;
    const metodo2valido = containerMetodoPagoComplementario && metodoPagoComplementario && montoMetodoPagoComplementario;

    if ( !metodo1valido && !metodo2valido )
    {
        window.alert("ERROR: An element for METODO DE PAGO or METODO DE PAGO COMPLEMENTARIO has not been defined!");
        return false;
    }

    if ( metodoPago.value === "default" )
    {
        window.alert("ERROR: There needs to be at least 1 METODO DE PAGO selected!");
        return false;
    }

    if ( montoMetodoPago === 0 )
    {
        window.alert("ERROR: METODO DE PAGO is not being used!");
        return false;
    }

    if ( metodoPagoComplementario.value != "default" && montoMetodoPago === 0 )
    {
        window.alert("ERROR: METODO DE PAGO COMPLEMENTARIO is not being used!");
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
        "id_medio_pago": "default",
        "monto_medio_pago": 0.00,

        "id_medio_pago_2": "default",
        "monto_medio_pago_2": 0.00,

        "total": 0.00,

        "lineas_venta": []
        // Contenido de cada objeto de lineas_venta
        // {
        //     "id_producto": 1,
        //     "cantidad": 3,
        //     "precio": 1000.0
        // }
    }

    return carritoVenta;
}

function cargarCarritoVenta()
{
    //  METODOS DE PAGO
    const containerMetodoPago = document.getElementById("containerMetodoPago");
    const metodoPago = containerMetodoPago.querySelector("select");
    const montoMetodoPago = containerMetodoPago.querySelector("input");

    carritoVenta.id_medio_pago = metodoPago.value;
    carritoVenta.monto_medio_pago = parseFloat(montoMetodoPago.value).toFixed(2);

    const containerMetodoPagoComplementario = document.getElementById("containerMetodoPagoComplementario");
    const metodoPagoComplementario = containerMetodoPagoComplementario.querySelector("select");
    const montoMetodoPagoComplementario = containerMetodoPagoComplementario.querySelector("input");

    carritoVenta.id_medio_pago_2 = metodoPagoComplementario.value;

    if ( metodoPagoComplementario != "default" )
        carritoVenta.monto_medio_pago_2 = parseFloat(montoMetodoPagoComplementario.value).toFixed(2);

    //  TOTAL

    const totalVenta = document.getElementById("appVentaTotal");
    carritoVenta.total = parseFloat(totalVenta.textContent).toFixed(2);

    //  LISTADO PRODUCTOS VENDIDOS

    const listadoCarrito = document.querySelectorAll("tr");

    let dataIdProducto = 0;
    let cantidad = 0;
    let precio = 0;

    //  index = 1 Para saltear el tr de <thead>
    for (let index = 1; index < listadoCarrito.length; index++)
    {
        dataIdProducto = listadoCarrito[index].getAttribute("data-id-producto");
        cantidad = document.getElementById(`cantidadInput${dataIdProducto}`).value;
        precio = document.getElementById(`subtotal${dataIdProducto}`).textContent;

        carritoVenta.lineas_venta.push({
            "id_producto": dataIdProducto,
            "cantidad": cantidad,
            "precio": precio
        })
    }
}
// **************************************************************