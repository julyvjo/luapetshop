# TO-DO LIST

##  PREGUNTAS

- [ ] **EMMIK; FEEDBACK para nombres de columnas CODIGO DE BARRAS, PROVEEDOR y CATEGORIA**
- [ ] **EMMIK; CERRAR CAJA individualmente o todas al mismo tiempo? también preguntar si necesita una fecha de último cierre de caja para tener referencia de cuánto tiempo llevan registrando todo sin chequear.**
- [ ] **EMMIK; FEEDBACK columnas del carrito venta (nombres; qué columnas hay, etc.)**
- [ ] **EMMIK; METODOS DE PAGO, necesitamos los modificadores/comisiones/recargos reales para actualizar**
- [ ] **EMMIK; CUENTA_DETAILS, FEEDBACK + Saber si es necesario agregar/quitar columnas (o qué información debería mostrar)**

- [x] JULY; GUARDAR COMPRA, no se cómo hacer troubleshooting con el SyntaxError que devuelve...
- [x] JULY; GUARDAR VENTA, no se cómo hacer troubleshooting con el SyntaxError que devuelve...
- [ ] JULY; NUEVO PRODUCTO, testear posibles errores al enviar/recibir JSON...
- [ ] JULY; EDITAR LINEA, testear posibles errores al enviar/recibir JSON...
- [ ] JULY; Para el listado de proveedores... ¿Cómo se modificaría? (Agregar, editar, eliminar proveedores)
- [ ] JULY; Preguntar por conceptos TRY/CATCH, EXCEPTIONS y otros conceptos de POO.

- [ ] VENTA; Debería blanquear TOTAL SIN recargos/modificadores de los métodos de pago? (o sea, mostrar este total en conjunto con los montos de cada método de pago y el total con recargos incluidos)
- [ ] VENTA; (Posible bug) Al cambiar TOTAL SIN recargos (por ej. modificando cantidad de algún producto) la diferencia SIEMPRE recae en el monto del método de pago principal... Es necesario en caso de agregar un método de pago complementario, que pase a modificarse el monto de este último?
- [ ] VENTA; (Posible bug) Los montos de los métodos de pago deberían SIEMPRE mostrarse con los recargos incluidos?

- [ ] OFF-TOPIC; Chequear si es correcto implementar los JS de la forma que hice esto (no se si es necesario usar "import" o algo así en los otros archivos para que usen las funciones que defina acá)

---

##  GENERAL

- [ ] MEDIOS DE PAGO; ACTUALIZAR COMISIONES de cada método acorde a feedback (para que sean valores reales)
- [ ] CSS TABLAS; El scrollbar vertical solamente debería afectar a `<tbody>`
- [ ] CSS TABLAS; Para maximizar ancho disponible para nombre del producto, quizás se puede abreviar y reducir el ancho de esas columnas que solamente van a mostrar un número o incluso un valor fijo. (De nuevo agregado por nueva columna PROVEEDOR)
- [ ] CSS; Modificar variables de color de TEXTOS para que usen su propia variable (fix para múltiples páginas con el cambio de bgcolor)
- [ ] ERROR LOGS; Traducir al español!!

- [x] <sup>~~EMMIK; Analizar propuesta de implementar códigos de barras~~</sup> **DE MOMENTO HAY QUE CONFIRMAR IMPLEMENTACIÓN**
- [x] <sup>~~EMMIK; Analizar propuesta de permitir setear total de venta arbitrario (e.g. para redondear)~~</sup> **RECOMENDACIÓN PERSONAL DADA A EMMIK; NOSOTROS NO DEBERÍAMOS MODIFICAR NADA**

* Considerar agregar unidad de valores en los outputs (por ejemplo $)
* CSS; Maximizar espacio para listado de productos.
* CSS; Evitar scroll horizontal lo máximo posible.
* CSS; Considerar usar sombras para mejorar el formato.
* UX; Considerar cambiar TODOS los window.confirm() por opciones para hacer UNDO por un tiempo (similar a cómo funciona Gmail por ejemplo). Esto podría aplicarse a todo proceso que pueda perderse como un formulario dentro de un modal...

---

##  PRODUCTO

- [ ] EDITAR LINEA INDIVIDUAL + NUEVO PRODUCTO; Ajustar validación para volver a valores default si por ejemplo los inputs quedaron vacíos.

- [x] TABLA + EDITAR LINEA INDIVIDUAL + NUEVO PRODUCTO; Agregar e implementar columna PROVEEDOR
- [x] IMPLEMENTAR rutas a la imagen del producto (th:src=${atributo})
- [x] EDITAR LINEA INDIVIDUAL + NUEVO PRODUCTO; IMPLEMENTAR IMAGEN DE CADA PRODUCTO.
- [x] <sup>~~GUARDAR NUEVO PRODUCTO; Implementar fetch para disparar el proceso de crear un nuevo producto.~~</sup>
- [x] <sup>~~GUARDAR EDITAR LINEA; Implementar fetch para disparar el proceso de crear una nueva modificación.~~</sup>

---

##  VENTA

- [ ] HISTORIAL; Implementar *una vez que CAJA esté completo* (ya que debería almacenar todas las ventas de ese mismo día)

- [x] METODOS DE PAGO; Testear y fixear bugs de la nueva implementación de los modificadores/recargos.
- [x] FINALIZAR VENTA; Implementar fetch para disparar el proceso de crear venta.
- [x] <sup>~~CSS CARRITO; Setear anchos fijos a cada columna para evitar redimensiones al agregar productos.~~</sup>
- [x] <sup>~~BUG; Al cambiar método de pago COMPLEMENTARIO, el monto de este se reinicia a 0.~~</sup>
- [x] <sup>~~PREGUNTAR; ¿Cómo deberíamos chequear que una venta no afecta más stock del que supuestamente existe?~~</sup> **ASUMIMOS QUE LA VENTA CHEQUEA IRL EL STOCK ACTUAL, ERGO STOCK EN BD PUEDE NO SER REALMENTE LA CANTIDAD (entonces el stock simplemente se resetea a cero sin volverse negativo)**

* CSS GENERAL; Estaría bueno si todos los valores tuviesen unidades ($ por ejemplo, ideal considerar también los de cantidad)
* BUSCADOR; Considerar mostrar un TOAST indicando errores (input repetido, búsqueda vacía, sin resultados, etc)
* CARRITO; Estaría bueno si CANTIDAD tuviese 2 botones para aumentar/disminuir con clicks (deshabilitando los propios del `<input>`)

---

##  CAJA

- [ ] CERRAR CAJA; CONSIDERAR agregar fecha de último cierre de caja.
- [ ] CREAR formulario/modal para registrar COMPRAS EXCEPCIONALES (tranquilamente podría necesitarse hacer más de 1; incluso esto puede moverse a COMPRA)

- [x] <sup>~~CUENTA_DETAILS; Agregar placeholder a la tabla (o considerar fijar anchos para evitar romper la UI si no hay registros)~~</sup>
- [x] <sup>~~CUENTA_DETAILS; Rediseñar CSS~~</sup>
- [x] <sup>~~CUENTA_DETAILS; Implementar botón VOLVER usando el método mejorado~~</sup>
- [x] <sup>~~FONDOS; Cada fondo debería tener CAJA INICIAL + VARIACIÓN DEL DÍA + TOTAL~~</sup>
- [x] <sup>~~FONDOS; Ajustar correctamente formato de información de cada fondo ACORDE A FEEDBACK.~~</sup>
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

- [ ] **PREGUNTAR; Chequear si esta página no debería permitir registrar COMPRAS EXCEPCIONALES. (Ejemplo, usaron la plata de alguno de los fondos para insumos propios del petshop, o sacaron para uso personal)**

- [x] <sup>~~GUARDAR COMPRA; Implementar fetch para disparar el proceso de crear compra.~~</sup>
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

- [ ] Chequear posibles problemas con números float pasados como string en el JSON de todos los endpoint.
- [ ] Rework de estructura de la base de datos
- [ ] PRODUCTO; Agregar id_proveedor
- [ ] PRODUCTO; Agregar codigo_producto (código de barras)

*   Eliminar producto_proveedor
*   Asociar proveedores a productos (Rel. 1 a 1)

---

## PDF2CSV

- [ ] Consultar a proveedores si se puede conseguir un formato distinto al pdf normal, el disenyo hace dificil parsear los precios y nombres de los productos
- [ ] Review con emmik sobre posibilidad de hacer un parsing manual o semi-automatico en caso de no conseguir csv de proveedores