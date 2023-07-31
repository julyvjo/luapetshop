# TO-DO LIST

##  GENERAL

- [ ] **PREGUNTAR; Para el listado de proveedores... ¿Cómo se modificaría? (Agregar, editar, eliminar proveedores)**

- [ ] PREGUNTAR JULY; Preguntar por conceptos TRY/CATCH, EXCEPTIONS y otros conceptos de POO.

- [ ] PREGUNTAR; Chequear si es correcto implementar los JS de la forma que hice esto (no se si es necesario usar "import" o algo así en los otros archivos para que usen las funciones que defina acá)

- [ ] MEDIOS DE PAGO; IMPLEMENTAR COMISIONES de cada método **(Falta que Emmik nos pase esa info también)**
- [ ] CSS TABLAS; El scrollbar vertical solamente debería afectar a `<tbody>`
- [ ] CSS TABLAS; Para maximizar ancho disponible para nombre del producto, quizás se puede abreviar y reducir el ancho de esas columnas que solamente van a mostrar un número o incluso un valor fijo. (De nuevo agregado por nueva columna PROVEEDOR)
- [ ] CSS; Modificar variables de color de TEXTOS para que usen su propia variable (fix para múltiples páginas con el cambio de bgcolor)
- [ ] ERROR LOGS; Traducir al español!!

- [x] <sup>~~EMMIK; Analizar propuesta de implementar códigos de barras~~</sup> **DE MOMENTO HAY QUE CONFIRMAR IMPLEMENTACIÓN**
- [x] <sup>~~EMMIK; Analizar propuesta de permitir setear total de venta arbitrario (e.g. para redondear)~~</sup> **RECOMENDACIÓN PERSONAL DADA A EMMIK; NOSOTROS NO DEBERÍAMOS MODIFICAR NADA**

* CSS; Maximizar espacio para listado de productos.
* CSS; Evitar scroll horizontal lo máximo posible.
* CSS; Considerar usar sombras para mejorar el formato.
* UX; Considerar cambiar TODOS los window.confirm() por opciones para hacer UNDO por un tiempo (similar a cómo funciona Gmail por ejemplo). Esto podría aplicarse a todo proceso que pueda perderse como un formulario dentro de un modal...

---

##  PRODUCTO

- [ ] **PREGUNTAR EMMIK; FEEDBACK para nombres de columnas CODIGO DE BARRAS, PROVEEDOR y CATEGORIA**

- [ ] TABLA + EDITAR LINEA INDIVIDUAL + NUEVO PRODUCTO; Agregar e implementar columna PROVEEDOR
- [ ] IMPLEMENTAR rutas a la imagen del producto (th:src=${atributo})
- [ ] EDITAR LINEA INDIVIDUAL + NUEVO PRODUCTO; Ajustar validación para volver a valores default si por ejemplo los inputs quedaron vacíos.
- [ ] EDITAR LINEA INDIVIDUAL + NUEVO PRODUCTO; IMPLEMENTAR IMAGEN DE CADA PRODUCTO.

---

##  VENTA

- [ ] **PREGUNTAR EMMIK; FEEDBACK columnas del carrito venta (nombres; qué columnas hay, etc.)**
- [ ] PREGUNTAR; Debería blanquear TOTAL SIN recargos/modificadores de los métodos de pago? (o sea, mostrar este total en conjunto con los montos de cada método de pago y el total con recargos incluidos)

- [ ] PREGUNTAR POR BUG; Al cambiar TOTAL SIN recargos (por ej. modificando cantidad de algún producto) la diferencia SIEMPRE recae en el monto del método de pago principal... Es necesario en caso de agregar un método de pago complementario, que pase a modificarse el monto de este último?
- [ ] PREGUNTAR POR BUG; Los montos de los métodos de pago deberían SIEMPRE mostrarse con los recargos incluidos?

- [ ] METODOS DE PAGO; Testear y fixear bugs de la nueva implementación de los modificadores/recargos.
- [ ] FINALIZAR VENTA; Implementar fetch para disparar el proceso de crear venta.
- [ ] HISTORIAL; Implementar *una vez que CAJA esté completo* (ya que debería almacenar todas las ventas de ese mismo día)
- [ ] CSS CARRITO; Setear anchos fijos a cada columna para evitar redimensiones al agregar productos.

- [x] <sup>~~BUG; Al cambiar método de pago COMPLEMENTARIO, el monto de este se reinicia a 0.~~</sup>
- [x] <sup>~~PREGUNTAR; ¿Cómo deberíamos chequear que una venta no afecta más stock del que supuestamente existe?~~</sup> **ASUMIMOS QUE LA VENTA CHEQUEA IRL EL STOCK ACTUAL, ERGO STOCK EN BD PUEDE NO SER REALMENTE LA CANTIDAD (entonces el stock simplemente se resetea a cero sin volverse negativo)**

* CSS GENERAL; Estaría bueno si todos los valores tuviesen unidades ($ por ejemplo, ideal considerar también los de cantidad)
* BUSCADOR; Considerar mostrar un TOAST indicando errores (input repetido, búsqueda vacía, sin resultados, etc)
* CARRITO; Estaría bueno si CANTIDAD tuviese 2 botones para aumentar/disminuir con clicks (deshabilitando los propios del `<input>`)

---

##  CAJA

- [ ] **PREGUNTAR EMMIK; CERRAR CAJA individualmente o todas al mismo tiempo? también preguntar si necesita una fecha de último cierre de caja para tener referencia de cuánto tiempo llevan registrando todo sin chequear.**

- [ ] FONDOS; Cada fondo debería tener CAJA INICIAL + VARIACIÓN DEL DÍA + TOTAL
- [ ] CERRAR CAJA; CONSIDERAR agregar fecha de último cierre de caja.
- [ ] FONDOS; Ajustar correctamente formato de información de cada fondo ACORDE A FEEDBACK.
- [ ] CREAR formulario/modal para registrar COMPRAS EXCEPCIONALES (tranquilamente podría necesitarse hacer más de 1; incluso esto puede moverse a COMPRA)

- [x] <sup>~~IMPLEMENTAR botón "Detalles" para llevar a caja/[id_caja] donde estarían todos los detalles del fondo.~~</sup>
- [x] <sup>~~FONDOS; Implementar lógica para botones DETALLES (tienen que redireccionar a `/caja/<id_cuenta>`)~~</sup>

* Considerar implementar ALGUNA FORMA DE REVERTIR COMPRAS Y VENTAS
* DEBERÍA GENERARSE un scroll horizontal en caso de agregar otro fondo

---

##  PROVEEDOR

- [ ] PLANIFICAR REDISEÑO COMPLETO (Posible conversor de PDF de cada proveedor a CSV)

* SIN RIVAL; Ver como recortar PDF a la sección relevante (mascotas? perros? gatos?)
* PER-ROS; Tomar como inspiración para diseño de inventario (categorías gráficas + imágenes)

---

##  COMPRA

- [ ] GUARDAR COMPRA; Implementar fetch para disparar el proceso de crear compra.
- [ ] **PREGUNTAR; Chequear si esta página no debería permitir registrar COMPRAS EXCEPCIONALES. (Ejemplo, usaron la plata de alguno de los fondos para insumos propios del petshop, o sacaron para uso personal)**

---
    
##  USUARIO (DEJAR PARA VERSIÓN FUTURA)

*   Un empleado debería tener estas diferencias respecto de un administrador:
    -   PRODUCTOS: No puede editar productos
    -   CAJA: No puede generar gastos excepcionales

---

##  CSS

- [ ] Setear comentarios separadores de bloques de reglas CSS para navegarlo más fácilmente ( https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Organizing )
- [ ] Troubleshooting de cómo en algunos navegadores se rompen las dimensiones (e.g. thinkpad)

---

## DATABASE

- [ ] Rework de estructura de la base de datos
- [ ] PRODUCTO; Agregar id_proveedor
- [ ] PRODUCTO; Agregar codigo_producto (código de barras)

*   Eliminar producto_proveedor
*   Asociar proveedores a productos (Rel. 1 a 1)

---

## PDF2CSV

- [ ] Consultar a proveedores si se puede conseguir un formato distinto al pdf normal, el disenyo hace dificil parsear los precios y nombres de los productos
- [ ] Review con emmik sobre posibilidad de hacer un parsing manual o semi-automatico en caso de no conseguir csv de proveedores