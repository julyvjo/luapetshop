# TO-DO LIST

##  GENERAL

- [ ] **PREGUNTAR; Chequear si es correcto implementar los JS de la forma que hice esto (no se si es necesario usar "import" o algo así en los otros archivos para que usen las funciones que defina acá)**

- [ ] NAVBAR; Fixear redirección a otras URL (por ej desde o hacia /caja/[id_caja])
- [ ] MEDIOS DE PAGO; IMPLEMENTAR COMISIONES de cada método **(Falta que Emmik nos pase esa info también)**
- [ ] CSS TABLAS; El scrollbar vertical solamente debería afectar a `<tbody>`
- [ ] CSS TABLAS; Para maximizar ancho disponible para nombre del producto, quizás se puede abreviar y reducir el ancho de esas columnas que solamente van a mostrar un número o incluso un valor fijo. (De nuevo agregado por nueva columna PROVEEDOR)

- [x] ~~EMMIK; Analizar propuesta de implementar códigos de barras~~ **DE MOMENTO NO SE VA A IMPLEMENTAR**
- [x] ~~EMMIK; Analizar propuesta de permitir setear total de venta arbitrario (e.g. para redondear)~~ **RECOMENDACIÓN PERSONAL DADA A EMMIK; NOSOTROS NO DEBERÍAMOS MODIFICAR NADA**
- [x] ~~HEADER; Minimizar márgenes inferior y superior para maximizar espacio de trabajo~~
- [x] ~~FOOTER; Reemplazar por PageNavigation en las páginas donde aparezca para maximizar espacio de trabajo~~

* CSS; Evitar scroll horizontal lo máximo posible.
* CSS; Considerar usar sombras para mejorar el formato.
* UX; Considerar cambiar TODOS los window.confirm() por opciones para hacer UNDO por un tiempo (similar a cómo funciona Gmail por ejemplo). Esto podría aplicarse a todo proceso que pueda perderse como un formulario dentro de un modal...

---

##  PRODUCTO

- [ ] TABLA + EDITAR LINEA INDIVIDUAL + NUEVO PRODUCTO; Agregar e implementar columna PROVEEDOR
- [ ] EDITAR LINEA INDIVIDUAL; Ajustar pre-carga a nuevo orden de columnas;
- [ ] IMPLEMENTAR rutas a la imagen del producto (th:src=${atributo})
- [ ] CAMBIAR tipo de stock por CATEGORIA
- [ ] NUEVO PRODUCTO + EDITAR LINEA INDIVIDUAL; Implementar CATEGORIA de productos (si o si tiene que tener una id_categoría asignada)
- [ ] NUEVO PRODUCTO + EDITAR LINEA INDIVIDUAL; Ajustar validación para volver a valores default si por ejemplo los inputs quedaron vacíos.
- [ ] NUEVO PRODUCTO + EDITAR LINEA INDIVIDUAL; IMPLEMENTAR IMAGEN DE CADA PRODUCTO.

---

##  VENTA

- [ ] FINALIZAR VENTA; Implementar fetch para disparar el proceso de crear venta.
- [ ] HISTORIAL; Implementar *una vez que CAJA esté completo* (ya que debería almacenar todas las ventas de ese mismo día)
- [ ] CSS CARRITO; Setear anchos fijos a cada columna para evitar redimensiones al agregar productos.


- [x] ~~PREGUNTAR; ¿Cómo deberíamos chequear que una venta no afecta más stock del que supuestamente existe?~~ **ASUMIMOS QUE LA VENTA CHEQUEA IRL EL STOCK ACTUAL, ERGO STOCK EN BD PUEDE NO SER REALMENTE LA CANTIDAD (entonces el stock simplemente se resetea a cero sin volverse negativo)**
* CSS GENERAL; Estaría bueno si todos los valores tuviesen unidades ($ por ejemplo, ideal considerar también los de cantidad)
* BUSCADOR; Considerar mostrar un TOAST indicando errores (input repetido, búsqueda vacía, sin resultados, etc)
* CARRITO; Estaría bueno si CANTIDAD tuviese 2 botones para aumentar/disminuir con clicks (deshabilitando los propios del `<input>`)

---

##  CAJA

- [ ] FONDOS; Cada fondo debería tener CAJA INICIAL + VARIACIÓN DEL DÍA + TOTAL
- [ ] IMPLEMENTAR botón "Detalles" para llevar a caja/[id_caja] donde estarían todos los detalles del fondo.
- [ ] CREAR formulario/modal para registrar COMPRAS EXCEPCIONALES (tranquilamente podría necesitarse hacer más de 1; incluso esto puede moverse a COMPRA)

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

*   Eliminar producto_proveedor
*   Asociar proveedores a productos (Rel. 1 a 1)

---

## PDF2CSV

- [ ] Consultar a proveedores si se puede conseguir un formato distinto al pdf normal, el disenyo hace dificil parsear los precios y nombres de los productos
- [ ] Review con emmik sobre posibilidad de hacer un parsing manual o semi-automatico en caso de no conseguir csv de proveedores