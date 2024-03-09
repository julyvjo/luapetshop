import pandas as pd
import mysql.connector

# Configuración de la conexión a la base de datos MySQL
conexion_bd = mysql.connector.connect(
    host="",
    user="",
    password="",
    database=""
)

proveedor = {
    'Sin rival':1,
    'B A':2,
    'Lonco':3,
    'Faican':4,
    'Salice':5,
    'Per ros':6,
    'Dakota':7,
    'Rugiendo':8,
    'Mascota':9,
    'El bigote':10,
    'Valmor':11,
    'Edu':12,
}



# Ruta al archivo CSV
archivo_csv = "datos_prod.csv"

# Cargar datos desde el archivo CSV usando pandas
datos_csv = pd.read_csv(archivo_csv, delimiter=";")

# Crear un cursor para ejecutar consultas SQL
cursor = conexion_bd.cursor()

rentabilidad = 0.3
stock = 9999999
descripcion = 'Descripcion de producto'
categoria = 1
imagen = 'default.png'

# Iterar a través de las filas del DataFrame y cargar datos en la base de datos
for indice, fila in datos_csv.iterrows():
    codigo = fila['codigo']
    nombre = fila['nombre']
    
    precio_venta = float(fila['precio'].replace(',', ''))
    precio_compra = round(precio_venta / 1.3, 2)

    ganancia = precio_venta - precio_compra

    nombre_prov = fila['proveedor']
    prov_id = proveedor[nombre_prov]

    print(codigo, nombre, precio_venta, precio_compra, rentabilidad, str(prov_id))
    # Consulta SQL para insertar datos en la tabla
    consulta = "INSERT INTO producto (codigo, nombre, precio_venta, rentabilidad, precio_compra, id_proveedor, stock, descripcion, id_categoria, imagen, ganancia) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    valores = (codigo, nombre, precio_venta, rentabilidad, precio_compra, prov_id, stock, descripcion, categoria, imagen, ganancia)

    # Ejecutar la consulta
    cursor.execute(consulta, valores)

# Confirmar la transacción y cerrar la conexión
conexion_bd.commit()
conexion_bd.close()

print("Carga masiva de datos completada.")
