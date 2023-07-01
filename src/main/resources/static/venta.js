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
        h5.id = `subtotalId${fila.getAttribute("data-id-producto")}`;
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


        cantidadInput.addEventListener("input", () =>
        {
            //  Convierto valores de subtotal y totalVenta a flotantes
            const subtotal = document.getElementById(h5.id);
            let subtotalConvertido = parseFloat(subtotal.textContent);

            const totalVenta = document.getElementById("appVentaTotal");
            let totalVentaConvertido = parseFloat(totalVenta.textContent);

            //  Quito el valor del subtotal previo a totalVenta
            totalVenta.textContent = (totalVentaConvertido - subtotalConvertido);

            //  Actualizo valores de subtotal y totalVenta
            subtotal.textContent = (precioUnitario * cantidadInput.value).toFixed(2);

            totalVentaConvertido = parseFloat(totalVenta.textContent);
            subtotalConvertido = parseFloat(subtotal.textContent);

            //  Finalmente actualizo el valor de totalVenta con el nuevo subtotal
            totalVenta.textContent = (totalVentaConvertido + subtotalConvertido).toFixed(2);

            actualizarMetodoPagoYTotal();
        });

    // AGREGAR FILA AL CARRITO

    carrito.appendChild(fila);

    // ACTUALIZAR TABLA DE VALORES

    actualizarMetodoPagoYTotal();
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
            const subtotal = document.getElementById(`subtotalId${id_producto}`);
            let subtotalConvertido = parseFloat(subtotal.textContent).toFixed(2);

            const totalVenta = document.getElementById("appVentaTotal");
            let totalVentaConvertido = parseFloat(totalVenta.textContent).toFixed(2);

            //  Quito el valor del subtotal a totalVenta
            totalVenta.textContent = (totalVentaConvertido - subtotalConvertido).toFixed(2);

            // Actualizar METODOS DE PAGO
            
            const tablaCarritoVenta = document.getElementById("table");
            tablaCarritoVenta.removeChild(listadoCarrito[index]);

            return;
        }

        index++;
        let sigue = index < listadoCarrito.length;
    }

    console.log("ERROR: Somehow id_producto is not in the cart...");
}

function cargarCarritoVenta()
{
    const listadoCarrito = document.querySelectorAll("tr");

    let dataIdProducto = 0;
    let cantidad = 0;
    let precio = 0;

    //  index = 1 Para saltear el tr de <thead>
    for (let index = 1; index < listadoCarrito.length; index++)
    {
        dataIdProducto = listadoCarrito[index].getAttribute("data-id-producto");
        cantidad = document.getElementById(`cantidadInput${dataIdProducto}`).value;
        precio = document.getElementById(`subtotalId${dataIdProducto}`).textContent;

        carritoVenta.lineas_venta.push({
            "id_producto": dataIdProducto,
            "cantidad": cantidad,
            "precio": precio
        })
    }

    const totalVenta = document.getElementById("appVentaTotal");
    carritoVenta.total = parseFloat(totalVenta.textContent).toFixed(2);
}
// **************************************************************

// METODO DE PAGO

const containerMetodoPago = document.getElementById("containerMetodoPago");
const metodoPago = containerMetodoPago.querySelector("select");

metodoPago.addEventListener("change", () =>
{     
    if(metodoPagoComplementario.hasAttribute("disabled"))
        metodoPagoComplementario.removeAttribute("disabled");

    if(montoMetodoPago.hasAttribute("disabled"))
        montoMetodoPago.removeAttribute("disabled");

    actualizarMetodoPagoYTotal();
});

const montoMetodoPago = containerMetodoPago.querySelector("input");

montoMetodoPago.addEventListener("change", () =>
{
    console.log("montoMetodoPago cambió su valor");
    actualizarMetodoPagoYTotal();
});

// **************************************************************

// METODO DE PAGO COMPLEMENTARIO

const containerMetodoPagoComplementario = document.getElementById("containerMetodoPagoComplementario");
const metodoPagoComplementario = containerMetodoPagoComplementario.querySelector("select");

metodoPagoComplementario.addEventListener("change", () =>
{      
    if (metodoPagoComplementario.value === "default")
    {
        montoMetodoPago.toggleAttribute("disabled");

        montoMetodoPagoComplementario.toggleAttribute("disabled");
        montoMetodoPagoComplementario.value = "NO USADO";
    }
    else
    {
        if(montoMetodoPago.hasAttribute("disabled"))
            montoMetodoPago.removeAttribute("disabled");

        if(montoMetodoPagoComplementario.hasAttribute("disabled"))
            montoMetodoPagoComplementario.removeAttribute("disabled");
    }

    actualizarMetodoPagoYTotal();
});

const montoMetodoPagoComplementario = containerMetodoPagoComplementario.querySelector("input");

montoMetodoPagoComplementario.addEventListener("change", () =>
{
    console.log("montoMetodoPagoComplementario cambió su valor");
    actualizarMetodoPagoYTotal();
});

// **************************************************************

function actualizarMetodoPagoYTotal()
{
    if (metodoPago.value === "default")
    {
        console.log("ERROR: You need to select at least 1 METODO DE PAGO");
        return;
    }

    const montoMetodoPago = containerMetodoPago.querySelector("input");

    const containerMetodoPagoComplementario = document.getElementById("containerMetodoPagoComplementario");
    const metodoPagoComplementario = containerMetodoPagoComplementario.querySelector("select");

    const totalVenta = document.getElementById("appVentaTotal");

    if (metodoPagoComplementario.value === "default")
    {
        console.log("Metodo de pago complementario NO seleccionado!");
        montoMetodoPago.value = totalVenta.textContent;
        return;
    }
}

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

    //  IMPLEMENTACIÓN SIN CONFIRMACIÓN PARA AGILIZAR TESTING
    cargarCarritoVenta();
    console.log("VENTA FINALIZADA");

    // ACÁ ENVIAR carritoVenta a donde corresponda.
    console.log(carritoVenta);

    carritoVenta = iniciarCarritoVenta(carritoVenta); 
});