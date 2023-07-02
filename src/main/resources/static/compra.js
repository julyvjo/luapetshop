const proveedor = document.getElementById("formCompraProveedor");

const containerMontoAbonado = document.getElementById("formCompraPaymentAmmount");
const montoAbonado = containerMontoAbonado.querySelector("input");

const containerMetodoDePago = document.getElementById("formCompraPaymentMethod");
const metodoDePago = containerMetodoDePago.querySelector("select");

const compraButton = document.getElementById("formCompraButton");

let compra = {};    //  Este objeto es el que se envía al finalizar la Compra.



// **************************************************************



compraButton.addEventListener("click", (e) =>
{
    //  VALIDAR PROVEEDOR
    //  VALIDAR MONTO ABONADO
    //  VALIDAR METODO DE PAGO

    cargarCompra();
    console.log(compra);
    window.alert("Compra registrada exitosamente!");
});

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