-- drop database luapetshop;
-- CREATE DATABASE luapetshop;

CREATE TABLE categoria (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255)
);

CREATE TABLE producto (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    id_categoria INT,
    nombre VARCHAR(255),
    imagen VARCHAR(255),
    descripcion VARCHAR(1024),
    precio_compra DECIMAL(12, 2),
    rentabilidad DECIMAL(5, 2),
    ganancia DECIMAL(12, 2),
    stock INT,
    FOREIGN KEY (id_categoria) REFERENCES categoria (id_categoria)
);

CREATE TABLE proveedor (
    id_proveedor INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255)
);

CREATE TABLE cuenta (
    id_cuenta INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    actualizado DATETIME,
    fecha_apertura DATETIME,
    saldo_inicial DECIMAL(12, 2),
    saldo DECIMAL(12, 2)
);

CREATE TABLE movimiento (
	id_movimiento INT AUTO_INCREMENT PRIMARY KEY,
	id_cuenta INT,
	fecha DATETIME,
	monto DECIMAL(12, 2),
	tipo char,
	FOREIGN KEY (id_cuenta) REFERENCES cuenta (id_cuenta)
);

CREATE TABLE compra (
    id_compra INT AUTO_INCREMENT PRIMARY KEY,
    id_movimiento INT,
    id_proveedor INT,
    fecha DATETIME,
    total DECIMAL(12, 2),
    FOREIGN KEY (id_proveedor) REFERENCES proveedor (id_proveedor),
    FOREIGN KEY (id_movimiento) REFERENCES movimiento (id_movimiento)
);

CREATE TABLE medio_pago (
    id_medio_pago INT AUTO_INCREMENT PRIMARY KEY,
    id_cuenta INT,
    nombre VARCHAR(255),
    modificador DECIMAL(5, 2),
    FOREIGN KEY (id_cuenta) REFERENCES cuenta (id_cuenta)
);

CREATE TABLE venta (
    id_venta INT AUTO_INCREMENT PRIMARY KEY,
    id_movimiento INT,
    id_medio_pago1 INT,
    id_medio_pago2 INT,
    parcial1 DECIMAL(12, 2),
    parcial2 DECIMAL(12, 2),
    fecha DATETIME,
    total DECIMAL(12, 2),
    estado char,
    FOREIGN KEY (id_movimiento) REFERENCES movimiento (id_movimiento),
    FOREIGN KEY (id_medio_pago1) REFERENCES medio_pago (id_medio_pago),
    FOREIGN KEY (id_medio_pago2) REFERENCES medio_pago (id_medio_pago)
);

CREATE TABLE linea_venta (
    id_linea_venta INT AUTO_INCREMENT PRIMARY KEY,
    id_venta INT,
    id_producto INT,
    precio_venta DECIMAL(12, 2),
    cantidad INT,
    FOREIGN KEY (id_venta) REFERENCES venta (id_venta),
    FOREIGN KEY (id_producto) REFERENCES producto (id_producto)
);

CREATE TABLE usuario(
	id_usuario int AUTO_INCREMENT PRIMARY KEY,
	username varchar(255),
	password varchar(512)
);



-- ================ INSERTS ================--

-- INSERT Categoria
INSERT INTO categoria (nombre) values 
('categoria 1'),
('categoria 2'),
('categoria 3'),
('categoria 4'),
('categoria 5');

-- INSERT Producto
INSERT INTO producto 
    (id_categoria, nombre, imagen, descripcion, precio_compra, rentabilidad, ganancia, stock)
VALUES 
    (1, 'Producto 1', 'imagen1.png', 'Descripción del producto 1', 10.99, 0.5, 0, 100),
    (2, 'Producto 2', 'imagen2.png', 'Descripción del producto 2', 15.99, 0.3, 0, 50),
    (3, 'Producto 3', 'imagen3.png', 'Descripción del producto 3', 20.99, 0.4, 0, 80),
    (4, 'Producto 4', 'imagen4.png', 'Descripción del producto 4', 12.99, 0.6, 0, 70),
    (5, 'Producto 5', 'imagen5.png', 'Descripción del producto 5', 18.99, 0.2, 0, 90),
    (1, 'Producto 6', 'imagen6.png', 'Descripción del producto 6', 11.99, 0.7, 0, 120),
    (3, 'Producto 7', 'imagen7.png', 'Descripción del producto 7', 14.99, 0.4, 0, 60),
    (2, 'Producto 8', 'imagen8.png', 'Descripción del producto 8', 16.99, 0.5, 0, 110),
    (4, 'Producto 9', 'imagen9.png', 'Descripción del producto 9', 19.99, 0.3, 0, 80),
    (5, 'Producto 10', 'imagen10.png', 'Descripción del producto 10', 22.99, 0.6, 0, 95),
    (3, 'Producto 11', 'imagen11.png', 'Descripción del producto 11', 13.99, 0.2, 0, 65),
    (1, 'Producto 12', 'imagen12.png', 'Descripción del producto 12', 17.99, 0.4, 0, 105),
    (2, 'Producto 13', 'imagen13.png', 'Descripción del producto 13', 21.99, 0.5, 0, 85),
    (4, 'Producto 14', 'imagen14.png', 'Descripción del producto 14', 24.99, 0.3, 0, 75),
    (5, 'Producto 15', 'imagen15.png', 'Descripción del producto 15', 27.99, 0.6, 0, 100);

-- INSERT Proveedor
INSERT INTO proveedor
    (nombre)
VALUES
    ('Proveedor 1'),
    ('Proveedor 2'),
    ('Proveedor 3'),
    ('Proveedor 4'),
    ('Proveedor 5'),
    ('Proveedor 6'),
    ('Proveedor 7');

-- INSERT Cuenta
INSERT INTO cuenta
    (nombre, saldo)
VALUES
    ('Banco Provincia', 50000),
    ('Mercado Pago', 33000),
    ('Efectivo', 30000);
   
-- INSERT MOVIMIENTO
INSERT INTO movimiento (id_cuenta, monto, tipo)
VALUES
	(1, 2000.0, 'V'),
	(2, 1500.0, 'C'),
	(3, 3000.0, 'I'),
	(2, 7000.0, 'E'),
	(3, 5000.0, 'V'),
	(1, 3000.0, 'C');
   
-- INSERT Compra
INSERT INTO compra (id_proveedor, total)
VALUES
    (1, 15000),
    (2, 20000),
    (3, 25000),
    (4, 18000),
    (5, 22000),
    (6, 19000),
    (7, 21000),
    (1, 17000),
    (2, 23000),
    (3, 27000),
    (4, 16000),
    (5, 24000),
    (6, 26000),
    (7, 28000),
    (1, 21000),
    (2, 29000),
    (3, 31000),
    (4, 33000);


-- INSERT Medio_Pago
INSERT INTO medio_pago
    (id_cuenta, nombre, modificador)
VALUES
    (1, 'QR Provincia', 1.2),
    (1, 'Transferencia Provincia', 1.1),
    (2, 'Transferencia Mercado Pago', 1.1),
    (3, 'Efectivo', 1);

-- INSERT Venta
INSERT INTO venta 
    (id_medio_pago1, fecha, total, estado)
VALUES
    (1, NOW(), 150.50, 'C'),
    (2, NOW(), 200.75, 'C'),
    (3, NOW(), 250.25, 'C'),
    (1, NOW(), 180.80, 'C'),
    (2, NOW(), 220.10, 'A'),
    (3, NOW(), 190.45, 'C'),
    (1, NOW(), 210.60, 'C'),
    (2, NOW(), 170.35, 'A'),
    (3, NOW(), 230.90, 'C'),
    (1, NOW(), 270.70, 'C'),
    (2, NOW(), 160.65, 'C'),
    (3, NOW(), 240.95, 'A'),
    (1, NOW(), 260.55, 'C'),
    (2, NOW(), 280.40, 'C'),
    (3, NOW(), 210.30, 'C');


-- INSERT Linea_Venta
INSERT INTO linea_venta 
    (id_venta, id_producto, precio_venta, cantidad)
VALUES
    (1, 1, 10.99, 3),
    (1, 2, 15.99, 2),
    (1, 3, 20.99, 1),
    (2, 4, 12.99, 4),
    (2, 5, 18.99, 2),
    (2, 6, 11.99, 3),
    (3, 7, 14.99, 1),
    (3, 8, 16.99, 2),
    (3, 9, 19.99, 3),
    (4, 10, 22.99, 2),
    (4, 11, 13.99, 1),
    (4, 12, 17.99, 4),
    (5, 13, 21.99, 3),
    (5, 14, 24.99, 2),
    (5, 15, 27.99, 1),
    (6, 1, 10.99, 2),
    (6, 2, 15.99, 3),
    (6, 3, 20.99, 1),
    (7, 4, 12.99, 4),
    (7, 5, 18.99, 2),
    (7, 6, 11.99, 3),
    (8, 7, 14.99, 1),
    (8, 8, 16.99, 2),
    (8, 9, 19.99, 3),
    (9, 10, 22.99, 2),
    (9, 11, 13.99, 1),
    (9, 12, 17.99, 4),
    (10, 13, 21.99, 3),
    (10, 14, 24.99, 2),
    (10, 15, 27.99, 1);

   insert into usuario
   (username, password)
   values
   ('admin','$2a$10$BoJ47v3ebE/vnLMVQ1EvdOFunxxJZOCqVtmdVNEdg6aR1Gq9lBqS.');

