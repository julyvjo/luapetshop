# TO-DO LIST

##  GENERAL
    - [ ]   PREGUNTAR; ¿Se puede reubicar todo lo referido a BOOTSTRAP? Así organizo mejor CSS y JS.
    - [ ]   PREGUNTAR; Al hacer un envío de un JSON al backend desde VENTA/COMPRA, ¿Qué onda la fecha?
    - [ ]   PREGUNTAR; Chequear si es correcto implementar los JS de la forma que hice esto (no se si es necesario usar "import" o algo así en los otros archivos para que usen las funciones que defina acá)
    
    - [ ]   CSS; considerar usar sombras para mejorar el formato.



##  PRODUCTO
    - [ ]   PREGUNTAR; Implementar estética del buscador en VENTA?

    - [ ]   NUEVO PROUDCTO; Revisar si se va a implementar de esta forma; ajustar formato.
    - [ ]   METADATA PRODUCTO; Necesito que cada producto tenga un valor que determine COMO INTERPRETAR SU STOCK (Kg, cantidad, etc.) => para poder validar input de CANTIDAD en VENTA



##  VENTA
    - [ ]   PREGUNTAR; Al finalizar una venta, es correcto recargar la página? Ó debería evitarlo y reiniciar la tabla manualmente...
    - [ ]   PREGUNTAR; En el carrito de venta, CANTIDAD cómo debería saber el stock actual? (para setear máximo)
    - [ ]   PREGUNTAR; El objeto carritoVenta, cómo debería indicar que NO se usó un método de pago complementario?

    - [ ]   CSS GENERAL; Estaría bueno si todos los valroes tuviesen unidades ($ por ejemplo, ideal considerar también los de cantidad)
    - [ ]   CSS GENERAL; Para maximizar ancho disponible para nombre del producto, quizás se puede abreviar y achi
    - [ ]   BUSCADOR; Considerar mostrar un TOAST indicando errores (input repetido, búsqueda vacía, sin resultados, etc).
    - [ ]   CARRITO; Estaría bueno si CANTIDAD tuviese 2 botones para aumentar/disminuir con clicks (deshabilitando los propios del <input>)
    - [ ]   CSS CARRITO; Scrollbar debería ser solamente para <tbody> para dejar siempre a la vista el header. (Tal vez preguntar si hay preferencia para esto...)
    - [ ]   CSS CARRITO; Setear anchos fijos a cada columna para evitar redimensiones al agregar productos.
    - [ ]   METODOS DE PAGO; Estaría bueno que METODO DE PAGO COMPLEMENTARIO pudiese volver al valor default tanto como opción como apretando "Escape" por ejemplo.



##  CAJA
    - [ ]   Debería generarse un scroll horizontal en caso de agregar otro fondo.
    - [ ]   Anotar qué información tiene que mostrarse en cada fondo (ideal: sin overflow)
    - [ ]   Implementar botón "Detalles" para abrir un modal con la información completa, en cada fondo.



##  PROVEEDOR
    - [ ]   PREGUNTAR; Implementar estética del buscador en VENTA?

    - [ ]   Chequear qué información debería mostrarse en la tabla.
    - [ ]   Implementar "agregarProveedor" (botón modal que debería ser formulario para agregar un proveedor)



##  COMPRA
    - [ ]   PREGUNTAR; Chequear si sería válido implementar "agregarProveedor" de PROVEEDOR también acá.

    - [ ]   SELECT PROVEEDOR; Hay que hacer que traiga la lista de proveedores de la DB en lugar de tenerlos manualmente en el HTML


    
##  USUARIO
    - [ ]   Analizar si realmente es necesario implementar esta sección (potencial conflico si hay empleados)



##  CSS
    - [ ]   Setear comentarios separadores de bloques de reglas CSS para navegarlo más fácilmente ( https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Organizing )
    - [ ]   Analizar si puede ser mejor crear múltiples archivos CSS para simplificar navegación de las reglas CSS (por ejemplo separar reglas de CSS de elementos de una página en específico, ordenadas usando los mismos bloques en todos los archivos CSS para poder comparar rápidamente la sección de la página que estaría ajustando)
    - [ ]  Troubleshooting de cómo en algunos navegadores se rompen las dimensiones