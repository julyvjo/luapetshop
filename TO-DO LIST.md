# TO-DO LIST

##  PREGUNTAS

- [ ] EMMIK; FECHAS. Qué formato de fecha le queda más cómodo visualmente? (YYYY/MMM/DD, DD/MM/YY, etc.)

- [ ] EMMIK; VENTA. Al cambiar TOTAL SIN recargos (por ej. modificando cantidad de algún producto) la diferencia SIEMPRE recae en el monto del método de pago principal... Es necesario en caso de agregar un método de pago complementario, que pase a modificarse el monto de este último?

---

##  GENERAL


- [ ] TESTING; (Cuando ya se termine de implementar todo) Realizar testing de todo.

- [ ] SEGURIDAD; Revisar y mejorar seguridad de toda la info.

- [x] MEDIOS DE PAGO; ACTUALIZAR COMISIONES de cada método acorde a feedback (para que sean valores reales)

- [ ] DOCUMENTACION; Analizar si hay que crear una documentación específicamente para el user.

* Considerar agregar unidad de valores en los outputs (por ejemplo $)

---

##  PRODUCTO

---

##  VENTA

* CSS GENERAL; Estaría bueno si todos los valores tuviesen unidades ($ por ejemplo, ideal considerar también los de cantidad)
* BUSCADOR; Considerar mostrar un TOAST indicando errores (input repetido, búsqueda vacía, sin resultados, etc)
* CARRITO; Estaría bueno si CANTIDAD tuviese 2 botones para aumentar/disminuir con clicks (deshabilitando los propios del `<input>`)

---

##  CAJA

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

* Setear comentarios separadores de bloques de reglas CSS para navegarlo más fácilmente ( https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Organizing )
* Maximizar espacio para listado de productos.
* Evitar scroll horizontal lo máximo posible.
* Considerar usar sombras para mejorar el formato.
* Considerar cambiar TODOS los window.confirm() por opciones para hacer UNDO por un tiempo (similar a cómo funciona Gmail por ejemplo). Esto podría aplicarse a todo proceso que pueda perderse como un formulario dentro de un modal...

---

## DATABASE

---

## PDF2CSV
