# TO-DO LIST

##  PREGUNTAS

- [ ] EMMIK; Cómo funcionaría GANANCIA DIARIA? Cada fondo tiene que registrar esto individualmente?
- [ ] EMMIK; FECHAS. Qué formato de fecha le queda más cómodo visualmente? (YYYY/MMM/DD, DD/MM/YY, etc.)
- [ ] EMMIK; VENTA. Al cambiar TOTAL SIN recargos (por ej. modificando cantidad de algún producto) la diferencia SIEMPRE recae en el monto del método de pago principal... Es necesario en caso de agregar un método de pago complementario, que pase a modificarse el monto de este último?
- [ ] EMMIK; VENTA. Los montos de los métodos de pago deberían SIEMPRE mostrarse con los recargos incluidos?

    == == == == ==

* <sup>~~EMMIK; FEEDBACK columnas del carrito venta (nombres; qué columnas hay, etc.)~~</sup> **Tudo bem tudo legal.**
* <sup>~~EMMIK; FEEDBACK para nombres de columnas CODIGO DE BARRAS, PROVEEDOR y CATEGORIA~~</sup> **Tudo bom tudo legal.**
* <sup>~~EMMIK; CERRAR CAJA individualmente o todas al mismo tiempo? también preguntar si necesita una fecha de último cierre de caja para tener referencia de cuánto tiempo llevan registrando todo sin chequear.~~</sup> **Cerramos todas las cajas JUNTAS.**
* <sup>~~JULY; Para el listado de proveedores... ¿Cómo se modificaría? (Agregar, editar, eliminar proveedores)~~</sup> **Directo desde la DB se harían las modificaciones**

* <sup>~~EMMIK; METODOS DE PAGO, necesitamos los modificadores/comisiones/recargos reales para actualizar~~</sup> **Emmik pensaba que si selecciona un método de pago, que solamente guarde el valor del modificador para después DESCONTARLO DEL PRECIO DE VENTA PARA PODER TENER LA GANANCIA REAL (considerando precio de compra). Es decir, LAS COMISIONES CORREN POR PARTE DEL PETSHOP, NO SE LE SUMA AL COSTO QUE PAGA EL CLIENTE.**
* <sup>~~EMMIK; CUENTA_DETAILS, FEEDBACK + Saber si es necesario agregar/quitar columnas (o qué información debería mostrar)~~</sup> **AGREGAR COMISIONES/GANANCIA**
---

##  GENERAL

- [ ] MEDIOS DE PAGO; ACTUALIZAR COMISIONES de cada método acorde a feedback (para que sean valores reales)

- [ ] TESTING; (Cuando ya se termine de implementar todo) Realizar testing de todo.

- [ ] SEGURIDAD; Revisar y mejorar seguridad de toda la info.

* Considerar agregar unidad de valores en los outputs (por ejemplo $)

---

##  PRODUCTO

- [x] IMAGEN; Rutas a la imagen del producto (th:src=${atributo})
- [x] IMAGEN; Agregar imágenes de productos (Quizas en nueva ruta?).
- [ ] IMAGEN; Implementar agregar/modificar imagen de un producto (nuevo o existente).


- [x] EDITAR LINEA INDIVIDUAL + NUEVO PRODUCTO; Implementar autompletado de valores en $C/%R/$G/$V
- [] EDITAR LINEA INDIVIDUAL + NUEVO PRODUCTO; Chequear que se haga fetch correctamente.

---

##  VENTA

- [x] HISTORIAL VENTA; Corregir formato CSS.

- [x] METODOS DE PAGO MODIFICADORES; RE-Implementar modificadores?!?
- [x] METODOS DE PAGO; Testear y fixear bugs de la nueva implementación de los modificadores/recargos.

- [x] HISTORIAL; Implementar *una vez que CAJA esté completo* (ya que debería almacenar todas las ventas de ese mismo día)

- [x] <sup>~~PREGUNTAR; ¿Cómo deberíamos chequear que una venta no afecta más stock del que supuestamente existe?~~</sup> **ASUMIMOS QUE LA VENTA CHEQUEA IRL EL STOCK ACTUAL, ERGO STOCK EN BD PUEDE NO SER REALMENTE LA CANTIDAD (entonces el stock simplemente se resetea a cero sin volverse negativo)**

* CSS GENERAL; Estaría bueno si todos los valores tuviesen unidades ($ por ejemplo, ideal considerar también los de cantidad)
* BUSCADOR; Considerar mostrar un TOAST indicando errores (input repetido, búsqueda vacía, sin resultados, etc)
* CARRITO; Estaría bueno si CANTIDAD tuviese 2 botones para aumentar/disminuir con clicks (deshabilitando los propios del `<input>`)

---

##  CAJA

- [x] CERRAR CAJA; Implementar CAJA EFECTIVO
- [x] CERRAR CAJA; Implementar CONTADOR EFECTIVO
- [ ] CERRAR CAJA; Hacer fetch JSON para backend

- [x] MOVIMIENTO EXCEPCIONAL; Hacer fetch JSON para backend


* Considerar implementar ALGUNA FORMA DE REVERTIR COMPRAS Y VENTAS
* DEBERÍA GENERARSE un scroll horizontal en caso de agregar otro fondo

---

##  PROVEEDOR

- [ ] PLANIFICAR REDISEÑO COMPLETO (Posible conversor de PDF de cada proveedor a CSV)

* SIN RIVAL; Ver como recortar PDF a la sección relevante (mascotas? perros? gatos?)
* PER-ROS; Tomar como inspiración para diseño de inventario (categorías gráficas + imágenes)

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
- [ ] CSS TABLAS; Para maximizar ancho disponible para nombre del producto, quizás se puede abreviar y reducir el ancho de esas columnas que solamente van a mostrar un número o incluso un valor fijo. (De nuevo agregado por nueva columna PROVEEDOR)
- [x] CSS; Modificar variables de color de TEXTOS para que usen su propia variable (fix para múltiples páginas con el cambio de bgcolor)
- [ ] CSS; Agregar efectos a los botones para dar feedback visual de que se accionó un botón.

- [ ] Setear comentarios separadores de bloques de reglas CSS para navegarlo más fácilmente ( https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Organizing )
- [ ] Troubleshooting de cómo en algunos navegadores se rompen las dimensiones (e.g. thinkpad)

* CSS; Maximizar espacio para listado de productos.
* CSS; Evitar scroll horizontal lo máximo posible.
* CSS; Considerar usar sombras para mejorar el formato.
* UX; Considerar cambiar TODOS los window.confirm() por opciones para hacer UNDO por un tiempo (similar a cómo funciona Gmail por ejemplo). Esto podría aplicarse a todo proceso que pueda perderse como un formulario dentro de un modal...

---

## DATABASE

- [ ] CUENTAS; Agregar GANANCIA (Se podría calcular... pero capaz es útil tenerlo guardado también?)
- [ ] GENERAL; Rework de estructura de la base de datos
- [ ] GENERAL; Asociar proveedores a productos (Rel. 1 a 1)

- [x] PRODUCTO; Eliminar producto_proveedor

---

## PDF2CSV

- [ ] Consultar a proveedores si se puede conseguir un formato distinto al pdf normal, el disenyo hace dificil parsear los precios y nombres de los productos
- [ ] Review con emmik sobre posibilidad de hacer un parsing manual o semi-automatico en caso de no conseguir csv de proveedores