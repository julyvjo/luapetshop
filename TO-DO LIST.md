# TO-DO LIST

##  GENERAL

- [x] ~~PREGUNTAR; Al hacer un envío de un JSON al backend desde VENTA/COMPRA, ¿Qué onda la fecha?~~ **(no te preocupes, se hace en el back)**
- [ ] PREGUNTAR; Chequear si es correcto implementar los JS de la forma que hice esto (no se si es necesario usar "import" o algo así en los otros archivos para que usen las funciones que defina acá)

- [ ] CSS; Considerar usar sombras para mejorar el formato.
- [ ] UX; Considerar cambiar TODOS los window.confirm() por opciones para hacer UNDO por un tiempo (similar a cómo funciona Gmail por ejemplo). Esto podría aplicarse a todo proceso que pueda perderse como un formulario dentro de un modal...



##  PRODUCTO

- [ ] PREGUNTAR EMMIK; La tabla producto debería mostrar el precio al que se vendería? Lo mismo para el formulario de agregar y modificar producto; debería mostrar precio venta?
- [x] ~~PREGUNTAR; Implementar estética del buscador en VENTA?~~ **(no hace falta, al menos por ahora que quede asi)**
- [x] ~~PREGUNTAR; Cómo debería levantar la foto desde el DB (usando thymeleaf para "pre-cargarlo"?)~~ **(el atributo de imagen trae la ruta a la img, asi que se usa un th:src=${atributo} (la sintaxis puede variar))**

- [ ] NUEVO PRODUCTO + EDITAR LINEA INDIVIDUAL; Ajustar validación para volver a valores default si por ejemplo los inputs quedaron vacíos.
- [ ] NUEVO PRODUCTO + EDITAR LINEA INDIVIDUAL; Agregar alguna forma de establecer ID del producto editado al enviar el formulario.
- [x] ~~NUEVO PRODUCTO + EDITAR LINEA INDIVIDUAL; Evitar cerrar el modal haciendo click fuera del formulario, incluso si se apreta ESCAPE~~

- [ ] NUEVO PROUDCTO; Revisar si se va a implementar de esta forma; ajustar formato.
- [ ] NUEVO PROUDCTO; Ajustar formato.
- [ ] METADATA PRODUCTO; Necesito que cada producto tenga un valor que determine COMO INTERPRETAR SU STOCK (Peso, Volumen, Paquetes, etc.) => para poder validar input de CANTIDAD en VENTA
- [x] ~~EDITAR LINEA INDIVIDUAL; Formulario debería precargarse con toda la info actual de la fila.~~



##  VENTA

- [x] ~~PREGUNTAR; Al finalizar una venta, es correcto recargar la página? Ó debería evitarlo y reiniciar la tabla manualmente...~~ **(esto podemos verlo en conjunto después, pero desde el back puedo hacer un redirect para que te lleve automaticamente a otro lado)**
- [x] ~~PREGUNTAR; En el carrito de venta, CANTIDAD cómo debería saber el stock actual? (para setear máximo)~~ **(No está pensado para que tenga que validar ese stock, por ahora damos por sentado que ya saben cuanto stock tienen)**
- [x] ~~PREGUNTAR; El objeto carritoVenta, cómo debería indicar que NO se usó un método de pago complementario?~~ **(aun no tengo resuelto lo de los metodos de pago complementarios la verdad, asi que en estos dias lo deberiamos resolver)**
- [x] ~~PREGUNTAR; En el carrito de venta, el scrollbar debería ser solamente para < tbody > para dejar siempre a la vista el header?~~ **(No se si entiendo del todo la pregunta pero si es algo puramente visual dejalo de la forma mas sencilla para vos o la que te haga mas sentido, np)**

- [ ] CSS GENERAL; Estaría bueno si todos los valroes tuviesen unidades ($ por ejemplo, ideal considerar también los de cantidad)
- [ ] CSS GENERAL; Para maximizar ancho disponible para nombre del producto, quizás se puede abreviar y reducir el ancho de esas columnas que solamente van a mostrar un número o incluso un valor fijo.
- [ ] BUSCADOR; Considerar mostrar un TOAST indicando errores (input repetido, búsqueda vacía, sin resultados, etc).
- [ ] CARRITO; Estaría bueno si CANTIDAD tuviese 2 botones para aumentar/disminuir con clicks (deshabilitando los propios del < input >)
- [ ] CSS CARRITO; Setear anchos fijos a cada columna para evitar redimensiones al agregar productos.
- [ ] METODOS DE PAGO; Estaría bueno que METODO DE PAGO COMPLEMENTARIO pudiese volver al valor default tanto como opción como apretando "Escape" por ejemplo.



##  CAJA

- [x] ~~PREGUNTAR; Qué información tiene que mostrarse en cada fondo? (ideal: sin overflow)~~ **(para cada cuenta debería haber un resumen de lo hecho durante el día si no me equivoco, los movimientos en si yo los pondria en otro lugar a parte la verdad, pero creo que tenemos que pensar en algun input para hacerle "cargas" o "descargas" de saldo arbitrariamente y mostrar cuanta $$ hay actualmente en cada caja y no se bien que más, este hay que ir diseñandolo aun)**

- [ ] Debería generarse un scroll horizontal en caso de agregar otro fondo.
- [ ] Implementar botón "Detalles" para abrir un modal con la información completa, en cada fondo.
- [ ] Debería considerarse hacer un formulario/modal para registrar compras excepcionales (tranquilamente podría necesitarse hacer más de 1, o incluso esto moverse a COMPRA)



##  PROVEEDOR

- [x] ~~PREGUNTAR; Implementar estética del buscador en VENTA?~~ **(misma respuesta que productos)**
- [x] ~~PREGUNTAR; Qué función tiene la tabla POR DEFAULT? (Es decir, qué utilidad trae si uno no busca nada, no sería lo mismo que la tabla producto?)~~ **(entiendo que tiene que haber un lugar donde buscar los precios de cada proveedor, para después poder actualizar el valor al que venden las cosas digamos, no está del todo claro igual, pero deberían poder ir actualizando los precios (tanto los precios de cada producto de cada proveedor, como los precios de los productos en si, igual es enroscado te lo explico mejor por voice))**

- [ ] Chequear qué información debería mostrarse en la tabla.
- [ ] Implementar "agregarProveedor" (botón modal que debería ser formulario para agregar un proveedor)



##  COMPRA

- [x] ~~PREGUNTAR; Chequear si sería válido implementar "agregarProveedor" de PROVEEDOR también acá.~~ **(Esto por ahora la verdad que no, los proveedores no cambian casi nunca, si hay que dar de alta/baja algo se hace directo desde la DB sin usar una GUI)**
- [ ] PREGUNTAR; Chequear si esta página no debería permitir registrar COMPRAS EXCEPCIONALES. (Ejemplo, usaron la plata de alguno de los fondos para insumos propios del petshop, o sacaron para uso personal)

- [ ] SELECT PROVEEDOR; Hay que hacer que traiga la lista de proveedores de la DB en lugar de tenerlos manualmente en el HTML


    
##  USUARIO

- [ ] Analizar si realmente es necesario implementar esta sección (potencial conflico si hay empleados)



##  CSS

- [ ] Setear comentarios separadores de bloques de reglas CSS para navegarlo más fácilmente ( https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Organizing )
- [ ] Troubleshooting de cómo en algunos navegadores se rompen las dimensiones