# TO-DO LIST

##  GENERAL

- [ ] PREGUNTAR; Al hacer un envío de un JSON al backend desde VENTA/COMPRA, ¿Qué onda la fecha?
- [ ] PREGUNTAR; Chequear si es correcto implementar los JS de la forma que hice esto (no se si es necesario usar "import" o algo así en los otros archivos para que usen las funciones que defina acá)

- [ ] CSS; Considerar usar sombras para mejorar el formato.
- [ ] UX; Considerar cambiar TODOS los window.confirm() por opciones para hacer UNDO por un tiempo (similar a cómo funciona Gmail por ejemplo). Esto podría aplicarse a todo proceso que pueda perderse como un formulario dentro de un modal...



##  PRODUCTO

- [ ] PREGUNTAR; Implementar estética del buscador en VENTA?
- [ ] PREGUNTAR; Cómo debería levantar la foto desde el DB (usando thymeleaf para "pre-cargarlo"?)

- [ ] NUEVO PROUDCTO; Revisar si se va a implementar de esta forma; ajustar formato.
- [ ] NUEVO PROUDCTO; Ajustar formato.
- [ ] METADATA PRODUCTO; Necesito que cada producto tenga un valor que determine COMO INTERPRETAR SU STOCK (Peso, Volumen, Paquetes, etc.) => para poder validar input de CANTIDAD en VENTA
- [ ] EDITAR LINEA INDIVIDUAL; Formulario debería precargarse con toda la info actual de la fila.



##  VENTA

- [ ] PREGUNTAR; Al finalizar una venta, es correcto recargar la página? Ó debería evitarlo y reiniciar la tabla manualmente...
- [ ] PREGUNTAR; En el carrito de venta, CANTIDAD cómo debería saber el stock actual? (para setear máximo)
- [ ] PREGUNTAR; El objeto carritoVenta, cómo debería indicar que NO se usó un método de pago complementario?
- [ ] PREGUNTAR; En el carrito de venta, el scrollbar debería ser solamente para <tbody> para dejar siempre a la vista el header?

- [ ] CSS GENERAL; Estaría bueno si todos los valroes tuviesen unidades ($ por ejemplo, ideal considerar también los de cantidad)
- [ ] CSS GENERAL; Para maximizar ancho disponible para nombre del producto, quizás se puede abreviar y reducir el ancho de esas columnas que solamente van a mostrar un número o incluso un valor fijo.
- [ ] BUSCADOR; Considerar mostrar un TOAST indicando errores (input repetido, búsqueda vacía, sin resultados, etc).
- [ ] CARRITO; Estaría bueno si CANTIDAD tuviese 2 botones para aumentar/disminuir con clicks (deshabilitando los propios del <input>)
- [ ] CSS CARRITO; Setear anchos fijos a cada columna para evitar redimensiones al agregar productos.
- [ ] METODOS DE PAGO; Estaría bueno que METODO DE PAGO COMPLEMENTARIO pudiese volver al valor default tanto como opción como apretando "Escape" por ejemplo.



##  CAJA

- [ ] PREGUNTAR; Qué información tiene que mostrarse en cada fondo? (ideal: sin overflow)

- [ ] Debería generarse un scroll horizontal en caso de agregar otro fondo.
- [ ] Implementar botón "Detalles" para abrir un modal con la información completa, en cada fondo.
- [ ] Debería considerarse hacer un formulario/modal para registrar compras excepcionales (tranquilamente podría necesitarse hacer más de 1, o incluso esto moverse a COMPRA)



##  PROVEEDOR

- [ ] PREGUNTAR; Implementar estética del buscador en VENTA?
- [ ] PREGUNTAR; Qué función tiene la tabla POR DEFAULT? (Es decir, qué utilidad trae si uno no busca nada, no sería lo mismo que la tabla producto?)

- [ ] Chequear qué información debería mostrarse en la tabla.
- [ ] Implementar "agregarProveedor" (botón modal que debería ser formulario para agregar un proveedor)



##  COMPRA

- [ ] PREGUNTAR; Chequear si sería válido implementar "agregarProveedor" de PROVEEDOR también acá.
- [ ] PREGUNTAR; Chequear si esta página no debería permitir registrar COMPRAS EXCEPCIONALES. (Ejemplo, usaron la plata de alguno de los fondos para insumos propios del petshop, o sacaron para uso personal)

- [ ] SELECT PROVEEDOR; Hay que hacer que traiga la lista de proveedores de la DB en lugar de tenerlos manualmente en el HTML


    
##  USUARIO

- [ ] Analizar si realmente es necesario implementar esta sección (potencial conflico si hay empleados)



##  CSS

- [ ] Setear comentarios separadores de bloques de reglas CSS para navegarlo más fácilmente ( https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Organizing )
- [ ] Troubleshooting de cómo en algunos navegadores se rompen las dimensiones