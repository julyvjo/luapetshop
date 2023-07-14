# TO-DO LIST

##  GENERAL

- [ ] **PREGUNTAR; Chequear si es correcto implementar los JS de la forma que hice esto (no se si es necesario usar "import" o algo así en los otros archivos para que usen las funciones que defina acá)**

- [ ] MEDIOS DE PAGO; IMPLEMENTAR COMISIONES de cada método (Falta que Emmik nos pase esa info también)
- [ ] CSS TABLAS; El scrollbar vertical solamente debería afectar a `<tbody>`
- [ ] CSS TABLAS; Para maximizar ancho disponible para nombre del producto, quizás se puede abreviar y reducir el ancho de esas columnas que solamente van a mostrar un número o incluso un valor fijo.

* CSS; Evitar scroll horizontal lo máximo posible.
* CSS; Considerar usar sombras para mejorar el formato.
* UX; Considerar cambiar TODOS los window.confirm() por opciones para hacer UNDO por un tiempo (similar a cómo funciona Gmail por ejemplo). Esto podría aplicarse a todo proceso que pueda perderse como un formulario dentro de un modal...

---

##  PRODUCTO

- [ ] **PREGUNTAR EMMIK; (metadata producto) Necesito que cada producto tenga un valor que determine COMO INTERPRETAR SU STOCK (Peso, Volumen, Paquetes, etc.) => para poder validar input de CANTIDAD en VENTA**

- [ ] RENOMBRAR y REORDENAR columnas (ver listado en Notion)
- [ ] OCULTAR columna DESCRIPCION (Emmik no tiene planeado usarlo, pero es metadata útil)
- [ ] AGREGAR columna PRECIO VENTA (técnicamente se puede calcular)
- [ ] AGREGAR columna PROVEEDOR (un mismo producto puede diferir solamente en esto)
- [ ] IMPLEMENTAR rutas a la imagen del producto (th:src=${atributo})
- [ ] CAMBIAR tipo de stock por CATEGORIA

- [ ] NUEVO PRODUCTO + EDITAR LINEA INDIVIDUAL; Ajustar validación para volver a valores default si por ejemplo los inputs quedaron vacíos.
- [ ] NUEVO PRODUCTO + EDITAR LINEA INDIVIDUAL; IMPLEMENTAR IMAGEN DE CADA PRODUCTO.

* NOTA NOMBRES DE LAS COLUMNAS:
    -   (Foto)
    -   Nombre
    -   Stock
    -   $c (precio_compra)
    -   $r (rentabilidad)
    -   $g (ganancia)
    -   $v (precio_venta)
    -   (Editar línea)

---

##  VENTA

- [x] ~~PREGUNTAR; (endpoint) El objeto carritoVenta, cómo debería indicar que NO se usó un método de pago complementario?~~ **Se usaría el valor id_medio_pago "0"**

- [x] ~~ENDPOINT; Asegurarme que el JSON para el endpoint tenga realmente las unidades correctas~~
- [ ] HISTORIAL; Implementar *una vez que CAJA esté completo* (ya que debería almacenar todas las ventas de ese mismo día)
- [ ] CSS CARRITO; Setear anchos fijos a cada columna para evitar redimensiones al agregar productos.

* CSS GENERAL; Estaría bueno si todos los valroes tuviesen unidades ($ por ejemplo, ideal considerar también los de cantidad)
* BUSCADOR; Considerar mostrar un TOAST indicando errores (input repetido, búsqueda vacía, sin resultados, etc)
* CARRITO; Estaría bueno si CANTIDAD tuviese 2 botones para aumentar/disminuir con clicks (deshabilitando los propios del `<input>`)

---

##  CAJA

- [x] ~~PREGUNTAR; Qué información tiene que mostrarse en cada fondo? (ideal: sin overflow)~~ **(para cada cuenta debería haber un resumen de lo hecho durante el día si no me equivoco, los movimientos en si yo los pondria en otro lugar a parte la verdad, pero creo que tenemos que pensar en algun input para hacerle "cargas" o "descargas" de saldo arbitrariamente y mostrar cuanta $$ hay actualmente en cada caja y no se bien que más, este hay que ir diseñandolo aun)**

- [ ] FONDOS; Cada fondo debería tener CAJA INICIAL + VARIACIÓN DEL DÍA + TOTAL
- [ ] CREAR formulario/modal para registrar COMPRAS EXCEPCIONALES (tranquilamente podría necesitarse hacer más de 1; incluso esto puede moverse a COMPRA)
- [ ] IMPLEMENTAR botón "Detalles" para abrir un modal con la información completa, en cada fondo.

* Considerar implementar ALGUNA FORMA DE REVERTIR COMPRAS Y VENTAS
* Debería generarse un scroll horizontal en caso de agregar otro fondo

---

##  PROVEEDOR

- [ ] PLANIFICAR REDISEÑO COMPLETO (Posible conversor de PDF de cada proveedor a CSV)

* SIN RIVAL; Ver como recortar PDF a la sección relevante (mascotas? perros? gatos?)
* PER-ROS; Tomar como inspiración para diseño de inventario (categorías gráficas + imágenes)

---

##  COMPRA

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