# TO-DO LIST

##  PREGUNTAS

- [ ] EMMIK; FECHAS. Qué formato de fecha le queda más cómodo visualmente? (YYYY/MMM/DD, DD/MM/YY, etc.)

- [ ] EMMIK; VENTA. Al cambiar TOTAL SIN recargos (por ej. modificando cantidad de algún producto) la diferencia SIEMPRE recae en el monto del método de pago principal... Es necesario en caso de agregar un método de pago complementario, que pase a modificarse el monto de este último?

---

##  GENERAL

- [ ] MEDIOS DE PAGO; ACTUALIZAR COMISIONES de cada método acorde a feedback (para que sean valores reales)

- [ ] TESTING; (Cuando ya se termine de implementar todo) Realizar testing de todo.

- [ ] SEGURIDAD; Revisar y mejorar seguridad de toda la info.

* Considerar agregar unidad de valores en los outputs (por ejemplo $)

---

##  PRODUCTO

- [x] EDITAR LINEA INDIVIDUAL + NUEVO PRODUCTO; Agregar CODIGO a los modals (codigo de producto del proveedor)
- [x] EDITAR LINEA INDIVIDUAL + NUEVO PRODUCTO; Agregar atributo CODIGO en HTML
- [x] EDITAR LINEA INDIVIDUAL + NUEVO PRODUCTO; Implementar CODIGO (codigo de producto del proveedor)

- [x] <sup>~~EDITAR LINEA INDIVIDUAL + NUEVO PRODUCTO; Quitar doble confirmación (se puede simplemente volver a editar)~~</sup>

---

##  VENTA

- [x] <sup>~~PREGUNTAR; ¿Cómo deberíamos chequear que una venta no afecta más stock del que supuestamente existe?~~</sup> **ASUMIMOS QUE LA VENTA CHEQUEA IRL EL STOCK ACTUAL, ERGO STOCK EN BD PUEDE NO SER REALMENTE LA CANTIDAD (entonces el stock simplemente se resetea a cero sin volverse negativo)**

* CSS GENERAL; Estaría bueno si todos los valores tuviesen unidades ($ por ejemplo, ideal considerar también los de cantidad)
* BUSCADOR; Considerar mostrar un TOAST indicando errores (input repetido, búsqueda vacía, sin resultados, etc)
* CARRITO; Estaría bueno si CANTIDAD tuviese 2 botones para aumentar/disminuir con clicks (deshabilitando los propios del `<input>`)

---

##  CAJA

- [x] <sup>~~AGREGAR GANANCIA_TOTAL (junto a SALDO_TOTAL; mov. excepcional más fino)~~</sup>

- [x] <sup>~~CERRAR CAJA; Implementar CAJA EFECTIVO~~</sup>
- [x] <sup>~~CERRAR CAJA; Implementar CONTADOR EFECTIVO~~</sup>
- [x] <sup>~~CERRAR CAJA; Hacer fetch JSON para backend~~</sup>

- [x] <sup>~~MOVIMIENTO EXCEPCIONAL; Fix error 500~~</sup>
- [x] <sup>~~MOVIMIENTO EXCEPCIONAL; Reload después de hacer fetch~~</sup>


* Considerar implementar ALGUNA FORMA DE REVERTIR COMPRAS Y VENTAS
* DEBERÍA GENERARSE un scroll horizontal en caso de agregar otro fondo

---

##  COMPRA

---
    
##  USUARIO (DEJAR PARA VERSIÓN FUTURA)

*   Un empleado debería tener estas diferencias respecto de un administrador:
    -   PRODUCTOS: No puede editar productos
    -   CAJA: No puede generar gastos excepcionales

---

##  CSS

- [ ] CSS TABLAS; El scrollbar vertical solamente debería afectar a `<tbody>`
- [ ] Troubleshooting de cómo en algunos navegadores se rompen las dimensiones (e.g. thinkpad)
- [x] <sup>~~CSS; Agregar efectos a los botones para dar feedback visual de que se accionó un botón.~~</sup>

* Setear comentarios separadores de bloques de reglas CSS para navegarlo más fácilmente ( https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Organizing )
* Maximizar espacio para listado de productos.
* Evitar scroll horizontal lo máximo posible.
* Considerar usar sombras para mejorar el formato.
* Considerar cambiar TODOS los window.confirm() por opciones para hacer UNDO por un tiempo (similar a cómo funciona Gmail por ejemplo). Esto podría aplicarse a todo proceso que pueda perderse como un formulario dentro de un modal...

---

## DATABASE

---

## PDF2CSV
