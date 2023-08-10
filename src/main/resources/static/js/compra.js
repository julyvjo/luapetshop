const COMPRA_EXCEPCIONAL = document.getElementById("compraExcepcional");
const COMPRA_EXCEPCIONAL_FONDO = document.getElementsByName("compraExcepcionalFondo")[0];
const COMPRA_EXCEPCIONAL_MONTO = document.getElementsByName("compraExcepcionalMonto")[0];
const COMPRA_EXCEPCIONAL_MOTIVO = document.getElementsByName("compraExcepcionalMotivo")[0];
const COMPRA_EXCEPCIONAL_REGISTRAR = document.getElementById("compraExcepcionalRegistrar");

let compra_excepcional = {};    //  Este objeto es el que se envía al registrar una compra excepcional.

const HISTORIAL_COMPRAS = document.getElementById("historialCompras");

const proveedor = document.getElementById("formCompraProveedor");

const containerMonto = document.getElementById("formCompraPaymentAmmount");
const monto = containerMonto.querySelector("input");

const containerMetodoDePago = document.getElementById("formCompraPaymentMethod");
const metodoDePago = containerMetodoDePago.querySelector("select");

const compraButton = document.getElementById("formCompraButton");

let compra = {};    //  Este objeto es el que se envía al finalizar la Compra.
// **************************************************************


//  || HISTORIAL COMPRAS BUTTON

if (HISTORIAL_COMPRAS)
{
    HISTORIAL_COMPRAS.addEventListener("click", () =>
    {
        const LINK = new URL("/compra/historial", window.location.origin);
    
        window.location.href = LINK;
    });
}


//  || COMPRA EXCEPCIONAL FUNCTIONS

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



monto.addEventListener("change", (e) =>
{
    if ( validarInputMonto(monto.value) === false )
    {
        window.alert("ERROR: El monto abonado es inválido!\n\nSe va a reiniciar el valor a 0.");
        monto.value = "0.00";
        return;
    }

    monto.value = monto.value.replace(/,/g, ".");
    monto.value = parseFloat(monto.value).toFixed(2);
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

compraButton.addEventListener("click", (e) =>
{
    finalizarCompra();
});



// **************************************************************



compra = iniciarCompra(compra);

function iniciarCompra(compra)
{
    compra = {
        "id_proveedor": 0,  //  INT
        
        "id_medio_pago": 0, //  INT

        "monto": 0.00,      //  FLOAT
    }

    return compra;
}

function cargarCompra()
{
    compra.id_proveedor = parseInt(proveedor.value);

    compra.id_medio_pago = parseInt( metodoDePago.selectedOptions[0].getAttribute("data-id-metodo-pago") );

    compra.monto = parseFloat(monto.value).toFixed(2);
}

function finalizarCompra()
{
    //  VALIDAR PROVEEDOR
    if (parseInt(proveedor.value) === 0)
    {
        window.alert("ERROR: Tiene que haber un proveedor seleccionado!");
        return;
    }

    //  VALIDAR MONTO ABONADO
    if (parseFloat( monto.value ) === 0.00 )
    {
        window.alert("ERROR: Tiene que haber un monto válido!");
        return;
    }

    //  VALIDAR METODO DE PAGO
    if (parseInt( metodoDePago.selectedOptions[0].getAttribute("data-id-metodo-pago") ) === 0)
    {
        window.alert("ERROR: Tiene que haber un método de pago seleccionado!");
        return;
    }

    if ( !window.confirm("Estás por finalizar la compra...\n\n¿Estás seguro?") )
        return;

    // Insistir con la confirmación para evitar lo máximo posible finalizar la compra por accidente.
    setTimeout(() =>
    {
        if ( !window.confirm("¿Realmente estás seguro?") )
            return;

        cargarCompra();
        window.alert("Compra registrada exitosamente!");

        //  ACÁ ENVIAR compra a donde corresponda.
        
         entregarCompra();

        //  REINICIAR TODO
        compra = iniciarCompra(compra);
        proveedor.value = 0;
        metodoDePago.value = "default";
        monto.value = "0.00";
        
        //  Recargar página; esto podría evitarse si es prioridad mantener modalidad SPA.
        //  location.reload();
    }, 250);
}

function entregarCompra()
{
    const JSON_DATA = JSON.stringify(compra);

    const HEADERS = new Headers();
    HEADERS.append('Content-Type', 'application/json');

    const API_URL = "/new/compra";

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