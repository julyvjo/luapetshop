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
const COMPRA_EXCEPCIONAL = document.getElementById("appCajaMovimiento");
const COMPRA_EXCEPCIONAL_FONDO = document.getElementsByName("compraExcepcionalFondo")[0];
const COMPRA_EXCEPCIONAL_MONTO = document.getElementsByName("compraExcepcionalMonto")[0];
const COMPRA_EXCEPCIONAL_MOTIVO = document.getElementsByName("compraExcepcionalMotivo")[0];
const COMPRA_EXCEPCIONAL_REGISTRAR = document.getElementById("compraExcepcionalRegistrar");

let compra_excepcional = {};    //  Este objeto es el que se envía al registrar una compra excepcional.

COMPRA_EXCEPCIONAL.addEventListener("click", () =>
{
    mostrarModal("modalCompraExcepcional");
});

COMPRA_EXCEPCIONAL_MONTO.addEventListener("change", () =>
{
    if ( validarInputMonto(COMPRA_EXCEPCIONAL_MONTO.value) === false )
    {
        window.alert("ERROR: El monto abonado es inválido!\n\nSe va a reiniciar el valor a 0.");
        COMPRA_EXCEPCIONAL_MONTO.value = "0.00";
        return;
    }

    COMPRA_EXCEPCIONAL_MONTO.value = COMPRA_EXCEPCIONAL_MONTO.value.replace(/,/g, ".");
    COMPRA_EXCEPCIONAL_MONTO.value = parseFloat(COMPRA_EXCEPCIONAL_MONTO.value).toFixed(2);
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

COMPRA_EXCEPCIONAL_REGISTRAR.addEventListener("click", () =>
{    
    if (COMPRA_EXCEPCIONAL_FONDO.value === "0")
    {
        window.alert("ERROR: Es necesario elegir un fondo!");
        return;
    }

    if (COMPRA_EXCEPCIONAL_MONTO.value === "" || COMPRA_EXCEPCIONAL_MONTO.value === "0.00")
    {
        window.alert("ERROR: Es necesario ingresar un monto válido!");
        return;
    }
    
    compra_excepcional.id_fondo = parseInt(COMPRA_EXCEPCIONAL_FONDO.value);
    compra_excepcional.monto = parseFloat(COMPRA_EXCEPCIONAL_MONTO.value).toFixed(2);
    
    if (COMPRA_EXCEPCIONAL_MOTIVO.value === "")
        compra_excepcional.motivo = "Motivo no especificado.";
    else
        compra_excepcional.motivo = COMPRA_EXCEPCIONAL_MOTIVO.value;
    
    // console.log(compra_excepcional);
    entregarCompraExcepcional();
});

function entregarCompraExcepcional()
{
    const JSON_DATA = JSON.stringify(compra_excepcional);

    const HEADERS = new Headers();
    HEADERS.append('Content-Type', 'application/json');

    console.log(JSON_DATA);

    // // const API_URL = "/new/compra";   //  NECESITO SABER EL API_URL PARA ESTE CASO!!

    // const LINK = new URL(API_URL, window.location.origin);

    // fetch(LINK, {
    //     method: 'POST',
    //     headers: HEADERS,
    //     body: JSON_DATA
    // })

    // // .then(response => response.json())
    // .then(response => response.text())
    
    // .then(responseData => {
    //     console.log(responseData);  // Resultado de enviar el json.
    // })
    
    // .catch(error => {
    //     console.log("ERROR: ", error);  // Errores que puedan haber.
    // })
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