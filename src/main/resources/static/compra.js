const proveedor = document.getElementById("formCompraProveedor");

const containerMontoAbonado = document.getElementById("formCompraPaymentAmmount");
const montoAbonado = containerMontoAbonado.querySelector("input");

const containerMetodoDePago = document.getElementById("formCompraPaymentMethod");
const metodoDePago = containerMetodoDePago.querySelector("select");

const compraButton = document.getElementById("formCompraButton");

let compra = {};    //  Este objeto es el que se envía al finalizar la Compra.



// **************************************************************



montoAbonado.addEventListener("change", (e) =>
{
    if ( validarInputMonto(montoAbonado.value) === false )
    {
        window.alert("ERROR: El monto abonado es inválido!\n\nSe va a reiniciar el valor a 0.");
        montoAbonado.value = "0.00";
        return;
    }
});

montoAbonado.addEventListener("keydown", (e) =>
{
    if (e.key === "ArrowUp" || e.key === "ArrowRight")
    {
        e.preventDefault();

        montoAbonado.value = (parseFloat(montoAbonado.value) + 0.01).toFixed(2);
    }
    else if (e.key === "ArrowDown" || e.key === "ArrowLeft")
    {
        e.preventDefault();

        if (parseInt(montoAbonado.value) - 1 > 0)
            montoAbonado.value = (parseFloat(montoAbonado.value) - 0.01).toFixed(2);
    }
});

function validarInputMonto(string)
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

compraButton.addEventListener("click", (e) =>
{
    finalizarCompra();
});


// **************************************************************



compra = iniciarCompra(compra);

function iniciarCompra(compra)
{
    compra = {
        "id_proveedor": "default",
        
        "id_medio_pago": "default",

        "total": 0.00,
    }

    return compra;
}

function cargarCompra()
{
    compra.id_proveedor = proveedor.value;

    compra.id_medio_pago = metodoDePago.value;

    compra.total = parseFloat(montoAbonado.value).toFixed(2);
}

function finalizarCompra()
{
    //  VALIDAR PROVEEDOR
    if (proveedor.value === "default")
    {
        window.alert("ERROR: Tiene que haber un proveedor seleccionado!");
        return;
    }

    //  VALIDAR MONTO ABONADO
    if (montoAbonado.value === 0)
    {
        window.alert("ERROR: Tiene que haber un proveedor seleccionado!");
        return;
    }
    //  VALIDAR METODO DE PAGO

    cargarCompra();
    console.log(compra);
    window.alert("Compra registrada exitosamente!");
}