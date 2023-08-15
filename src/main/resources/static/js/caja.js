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

    movimientoExcepcional.tipo = MOVIMIENTO_EXCEPCIONAL_TIPO.value;
    movimientoExcepcional.id_fondo = parseInt(MOVIMIENTO_EXCEPCIONAL_FONDO.value);
    movimientoExcepcional.monto = parseFloat(MOVIMIENTO_EXCEPCIONAL_MONTO.value).toFixed(2);
    
    if (MOVIMIENTO_EXCEPCIONAL_MOTIVO.value === "")
        movimientoExcepcional.motivo = "Motivo no especificado.";
    else
        movimientoExcepcional.motivo = MOVIMIENTO_EXCEPCIONAL_MOTIVO.value;
    
    // console.log(movimientoExcepcional);
    entregarMovimientoExcepcional();

    reiniciarMovimientoExcepcional();
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
        console.log(responseData);  // Resultado de enviar el json.
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



// CERRAR CAJA BUTTON

const cerrarCaja = document.getElementById('botonCerrarCaja');

if (cerrarCaja)
{
    cerrarCaja.addEventListener("click", (e) =>
    {
        mostrarModal("modalCerrarCaja");
    });

    // I implemented it like this because script.js has "defer" attribute.
    // If in the future this changes, this needs to be implemented inside an Event Listener.
}
// **************************************************************