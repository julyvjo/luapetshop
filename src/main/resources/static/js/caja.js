// DETALLES BUTTON

const DETALLES_BUTTONS = document.querySelectorAll(".appCajaDetalles");

DETALLES_BUTTONS.forEach(element => 
{
    element.addEventListener("click", () =>
    {
        const ID_CUENTA = element.getAttribute("data-id-cuenta");
        const LINK = new URL(`/caja/${ID_CUENTA}`, window.location.origin);
        
        window.location.href = LINK;
    });
});
// **************************************************************



// REGISTRAR MOVIMIENTO EXCEPCIONAL BUTTON
const MOVIMIENTO_EXCEPCIONAL = document.getElementById("appCajaMovimiento");
const MOVIMIENTO_EXCEPCIONAL_TIPO = document.getElementsByName("movimientoExcepcionalTipo")[0];
const MOVIMIENTO_EXCEPCIONAL_FONDO = document.getElementsByName("movimientoExcepcionalFondo")[0];
const MOVIMIENTO_EXCEPCIONAL_MONTO = document.getElementsByName("movimientoExcepcionalMonto")[0];
const MOVIMIENTO_EXCEPCIONAL_MOTIVO = document.getElementsByName("movimientoExcepcionalMotivo")[0];
const MOVIMIENTO_EXCEPCIONAL_REGISTRAR = document.getElementById("movimientoExcepcionalRegistrar");

let movimientoExcepcional = {};    //  Este objeto es el que se envía al registrar una compra excepcional.

MOVIMIENTO_EXCEPCIONAL.addEventListener("click", () =>
{
    mostrarModal("modalMovimientoExcepcional");
    window.onclick = null;
});

MOVIMIENTO_EXCEPCIONAL_MONTO.addEventListener("change", () =>
{
    if ( validarInputMonto(MOVIMIENTO_EXCEPCIONAL_MONTO.value) === false )
    {
        window.alert("ERROR: El monto abonado es inválido!\n\nSe va a reiniciar el valor a 0.");
        MOVIMIENTO_EXCEPCIONAL_MONTO.value = "0.00";
        return;
    }

    MOVIMIENTO_EXCEPCIONAL_MONTO.value = MOVIMIENTO_EXCEPCIONAL_MONTO.value.replace(/,/g, ".");
    MOVIMIENTO_EXCEPCIONAL_MONTO.value = parseFloat(MOVIMIENTO_EXCEPCIONAL_MONTO.value).toFixed(2);
});

function validarInputMonto(string)
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

MOVIMIENTO_EXCEPCIONAL_REGISTRAR.addEventListener("click", () =>
{    
    if (MOVIMIENTO_EXCEPCIONAL_TIPO.value === "0")
    {
        window.alert("ERROR: Es necesario elegir un tipo de movimiento!");
        return;
    }

    if (MOVIMIENTO_EXCEPCIONAL_FONDO.value === "0")
    {
        window.alert("ERROR: Es necesario elegir un fondo!");
        return;
    }

    if (MOVIMIENTO_EXCEPCIONAL_MONTO.value === "" || MOVIMIENTO_EXCEPCIONAL_MONTO.value === "0.00")
    {
        window.alert("ERROR: Es necesario ingresar un monto válido!");
        return;
    }

    // ENVIO DE PAYLOAD SIN DOBLE CONFIRM
    
    // CARGA DE movimientoExcepcional

    movimientoExcepcional.tipo = MOVIMIENTO_EXCEPCIONAL_TIPO.value;
    movimientoExcepcional.id_cuenta = parseInt(MOVIMIENTO_EXCEPCIONAL_FONDO.value);
    movimientoExcepcional.monto = parseFloat(MOVIMIENTO_EXCEPCIONAL_MONTO.value).toFixed(2);
    
    if (MOVIMIENTO_EXCEPCIONAL_MOTIVO.value === "")
        movimientoExcepcional.motivo = "Motivo no especificado.";
    else
        movimientoExcepcional.motivo = MOVIMIENTO_EXCEPCIONAL_MOTIVO.value;

    //  ENTREGA DE movimientoExcepcional
    // console.log(movimientoExcepcional);
    entregarMovimientoExcepcional();

    //  REINICIAR TODO
    reiniciarMovimientoExcepcional();
    // ----------------------------------------------------------------


    // if ( !window.confirm("Estás por finalizar la compra...\n\n¿Estás seguro?") )
    //     return;

    // // Insistir con la confirmación para evitar lo máximo posible finalizar por accidente.
    // setTimeout(() =>
    // {
    //     if ( !window.confirm("¿Realmente estás seguro?") )
    //         return;

    //     // CARGA DE movimientoExcepcional

    //     movimientoExcepcional.tipo = MOVIMIENTO_EXCEPCIONAL_TIPO.value;
    //     movimientoExcepcional.id_cuenta = parseInt(MOVIMIENTO_EXCEPCIONAL_FONDO.value);
    //     movimientoExcepcional.monto = parseFloat(MOVIMIENTO_EXCEPCIONAL_MONTO.value).toFixed(2);
        
    //     if (MOVIMIENTO_EXCEPCIONAL_MOTIVO.value === "")
    //         movimientoExcepcional.motivo = "Motivo no especificado.";
    //     else
    //         movimientoExcepcional.motivo = MOVIMIENTO_EXCEPCIONAL_MOTIVO.value;

    //     //  ENTREGA DE movimientoExcepcional
    //     // console.log(movimientoExcepcional);
    //     entregarMovimientoExcepcional();

    //     //  REINICIAR TODO
    //     reiniciarMovimientoExcepcional();
    // }, 250);
});

function entregarMovimientoExcepcional()
{
    const JSON_DATA = JSON.stringify(movimientoExcepcional);

    const HEADERS = new Headers();
    HEADERS.append('Content-Type', 'application/json');

    const API_URL = "/new/movimiento";   //  NECESITO SABER EL API_URL PARA ESTE CASO!!

    const LINK = new URL(API_URL, window.location.origin);

    fetch(LINK, {
        method: 'POST',
        headers: HEADERS,
        body: JSON_DATA
    })

    // .then(response => response.json())
    .then(response => response.text())
    
    .then(responseData => {
        // console.log(responseData);  // Resultado de enviar el json.
        
        window.alert(responseData);
        
        //Recargar página; esto podría evitarse si es prioridad mantener modalidad SPA.
        location.reload();
    })
    
    .catch(error => {
        console.log("ERROR: ", error);  // Errores que puedan haber.
    })
}

function reiniciarMovimientoExcepcional()
{
    movimientoExcepcional = {};

    MOVIMIENTO_EXCEPCIONAL_TIPO.value = "0";
    MOVIMIENTO_EXCEPCIONAL_FONDO.value = "0";
    MOVIMIENTO_EXCEPCIONAL_MONTO.value = "";
    MOVIMIENTO_EXCEPCIONAL_MOTIVO.value = "";
}
// **************************************************************



// SALDO TOTAL

const SALDO_TOTAL = document.getElementById("appCajaSaldoTotal");

const SALDOS_CUENTAS = document.querySelectorAll(".saldoActual");

SALDOS_CUENTAS.forEach(element =>
{
    SALDO_TOTAL.textContent = ( parseFloat(SALDO_TOTAL.textContent) + parseFloat(element.textContent) ).toFixed(2);
});
// **************************************************************



// CONTADOR EFECTIVO

    //  Cada "data-value" es un auxiliar que almacena el valor PREVIO
    //  del contador propiamente dicho, para validar que sea siempre
    //  un número entero :)

const MINUS10 = document.getElementById("cerrarCajaContadorMinus10");
const CONTADOR10 = document.getElementById("cerrarCajaContador10");
CONTADOR10.setAttribute("data-value", "0");
const PLUS10 = document.getElementById("cerrarCajaContadorPlus10");
cerrarCajaEventListeners(CONTADOR10, MINUS10, PLUS10);

const MINUS20 = document.getElementById("cerrarCajaContadorMinus20");
const CONTADOR20 = document.getElementById("cerrarCajaContador20");
CONTADOR20.setAttribute("data-value", "0");
const PLUS20 = document.getElementById("cerrarCajaContadorPlus20");
cerrarCajaEventListeners(CONTADOR20, MINUS20, PLUS20);

const MINUS50 = document.getElementById("cerrarCajaContadorMinus50");
const CONTADOR50 = document.getElementById("cerrarCajaContador50");
CONTADOR50.setAttribute("data-value", "0"); 
const PLUS50 = document.getElementById("cerrarCajaContadorPlus50");
cerrarCajaEventListeners(CONTADOR50, MINUS50, PLUS50);

const MINUS100 = document.getElementById("cerrarCajaContadorMinus100");
const CONTADOR100 = document.getElementById("cerrarCajaContador100");
CONTADOR100.setAttribute("data-value", "0"); 
const PLUS100 = document.getElementById("cerrarCajaContadorPlus100");
cerrarCajaEventListeners(CONTADOR100, MINUS100, PLUS100);

const MINUS200 = document.getElementById("cerrarCajaContadorMinus200");
const CONTADOR200 = document.getElementById("cerrarCajaContador200");
CONTADOR200.setAttribute("data-value", "0");
const PLUS200 = document.getElementById("cerrarCajaContadorPlus200");
cerrarCajaEventListeners(CONTADOR200, MINUS200, PLUS200);

const MINUS500 = document.getElementById("cerrarCajaContadorMinus500");
const CONTADOR500 = document.getElementById("cerrarCajaContador500");
CONTADOR500.setAttribute("data-value", "0");  
const PLUS500 = document.getElementById("cerrarCajaContadorPlus500");
cerrarCajaEventListeners(CONTADOR500, MINUS500, PLUS500);

const MINUS1000 = document.getElementById("cerrarCajaContadorMinus1000");
const CONTADOR1000 = document.getElementById("cerrarCajaContador1000");
CONTADOR1000.setAttribute("data-value", "0"); 
const PLUS1000 = document.getElementById("cerrarCajaContadorPlus1000");
cerrarCajaEventListeners(CONTADOR1000, MINUS1000, PLUS1000);

const MINUS2000 = document.getElementById("cerrarCajaContadorMinus2000");
const CONTADOR2000 = document.getElementById("cerrarCajaContador2000");
CONTADOR2000.setAttribute("data-value", "0");
const PLUS2000 = document.getElementById("cerrarCajaContadorPlus2000");
cerrarCajaEventListeners(CONTADOR2000, MINUS2000, PLUS2000);

function validarInputContador(string)
{
    //  Regular expression para validar que string represente un número float
     const numberRegex = /^[0-9]+$/;
    // const numberRegex = /^[0-9]+([.,][0-9]+)?$/;;    //  Por si solo quisiera validar un número flotante.

    return numberRegex.test(string);

    // Ejemplos:
    // console.log(validateNumber("12345"));   // true
    // console.log(validateNumber("12.345"));  // false (número float)
    // console.log(validateNumber("12,345"));  // false (número float)
    // console.log(validateNumber("12,34.56"));// false (múltiples separadores)
    // console.log(validateNumber("abc"));     // false (contiene caracteres no válidos como letras)
}

function cerrarCajaEventListeners(CONTADOR, MINUS, PLUS)
{
    CONTADOR.addEventListener("change", () =>
    {
        if (validarInputContador(CONTADOR.value))
        {
            CONTADOR.value = parseInt(CONTADOR.value);
            
            CONTADOR.setAttribute("data-value", CONTADOR.value);
        }
        else
        {
            console.log("ERROR: Input inválido! Reiniciando a valor previo...");
            CONTADOR.value = CONTADOR.getAttribute("data-value");
        }

        cerrarCajaActualizarTotal();
    });

    CONTADOR.addEventListener("keydown", (e) =>
    {
        if (e.key === "ArrowUp" || e.key === "ArrowRight")
        {
            e.preventDefault();
            CONTADOR.value = parseInt(CONTADOR.value) + 1;
            cerrarCajaActualizarTotal();
        }
        else if (e.key === "ArrowDown" || e.key === "ArrowLeft")
        {
            if (parseInt(CONTADOR.value) - 1 < 0)
            {
                console.log("ERROR: La cantidad de billetes tiene que ser positiva!");
                return;
            }
            
            e.preventDefault();
            CONTADOR.value = parseInt(CONTADOR.value) - 1;
            cerrarCajaActualizarTotal();
        }
    });

    MINUS.addEventListener("click", () =>
    {
        if (parseInt(CONTADOR.value) - 1 < 0)
        {
            console.log("ERROR: La cantidad de billetes tiene que ser positiva!");
            return;
        }
        
        CONTADOR.value = parseInt(CONTADOR.value) - 1;

        cerrarCajaActualizarTotal();
    });

    PLUS.addEventListener("click", () =>
    {
        CONTADOR.value = parseInt(CONTADOR.value) + 1;

        cerrarCajaActualizarTotal();
    });
}

function cerrarCajaActualizarTotal()
{
    const TOTAL = document.getElementById("cerrarCajaTotalContador");

    let total = parseFloat(0);

    total += parseFloat(CONTADOR10.value) * 10;
    total += parseFloat(CONTADOR20.value) * 20;
    total += parseFloat(CONTADOR50.value) * 50;
    total += parseFloat(CONTADOR100.value) * 100;
    total += parseFloat(CONTADOR200.value) * 200;
    total += parseFloat(CONTADOR500.value) * 500;
    total += parseFloat(CONTADOR1000.value) * 1000;
    total += parseFloat(CONTADOR2000.value) * 2000;

    TOTAL.textContent = total.toFixed(2);
}
// **************************************************************



//  SALDO EFECTIVO

// const SALDOS_CUENTAS = document.querySelectorAll(".saldoActual");    // Ya está definido en SALDO TOTAL!
const EFECTIVO_SALDO_ACTUAL = document.getElementById("cerrarCajaSaldoActual");
EFECTIVO_SALDO_ACTUAL.textContent = parseFloat(SALDOS_CUENTAS[2].textContent);

const SALDOS_INICIALES_CUENTAS = document.querySelectorAll(".saldoInicial");
const EFECTIVO_SALDO_INICIAL = document.getElementById("cerrarCajaSaldoInicial");
EFECTIVO_SALDO_INICIAL.textContent = parseFloat(SALDOS_INICIALES_CUENTAS[2].textContent);
// **************************************************************



// CERRAR CAJA DIARIA BUTTON

const cerrarCaja = document.getElementById('botonCerrarCaja');

if (cerrarCaja)
{
    cerrarCaja.addEventListener("click", (e) =>
    {
        mostrarModal("modalCerrarCaja");

        window.onclick = null;
    });
}

const CERRAR_CAJA_BUTTON = document.getElementById("cerrarCajaButton");

if (CERRAR_CAJA_BUTTON)
{
    CERRAR_CAJA_BUTTON.addEventListener("click", () =>
    {
        // ENVIO DE PAYLOAD SIN DOBLE CONFIRM
        // prepararCajas();
        // entregarCajas();

        const API_URL = "/caja/cerrar";
        const LINK = new URL(API_URL, window.location.origin);

        fetch(LINK)
        .then(response => response.text())

        .then(responseData => {
            // console.log(responseData);  // Resultado de enviar el json.
            window.alert(responseData);
            //Recargar página; esto podría evitarse si es prioridad mantener modalidad SPA.
            location.reload();
        })
        
        .catch(error => {
            console.log("ERROR: ", error);  // Errores que puedan haber.
            window.alert("ERROR: ", error);
        })
        // ---------------------------------------------------------------------------------


        // if ( !window.confirm("Estás por cerrar TODAS las cajas...\n\n¿Estás seguro?") )
        //     return;

        // // Insistir con la confirmación para evitar lo máximo posible finalizar por accidente.
        // setTimeout(() =>
        // {
        //     if ( !window.confirm("¿Realmente estás seguro?") )
        //         return;

        //     // prepararCajas();
        //     // entregarCajas();

        //     const API_URL = "/caja/cerrar";
        //     const LINK = new URL(API_URL, window.location.origin);

        //     fetch(LINK)
        //     .then(response => response.text())
    
        //     .then(responseData => {
        //         // console.log(responseData);  // Resultado de enviar el json.
        //         window.alert(responseData);
        //         //Recargar página; esto podría evitarse si es prioridad mantener modalidad SPA.
        //         location.reload();
        //     })
            
        //     .catch(error => {
        //         console.log("ERROR: ", error);  // Errores que puedan haber.
        //         window.alert("ERROR: ", error);
        //     })

        // }, 250);
    });
}
// **************************************************************