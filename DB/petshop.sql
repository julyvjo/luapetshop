-- DELETE FROM nombre_tabla;
-- DELETE FROM Categoria;
-- DELETE FROM Producto;
-- DELETE FROM Proveedor;
-- DELETE FROM Producto_Proveedor;
-- DELETE FROM Compra;
-- DELETE FROM Venta;
-- DELETE FROM Linea_Venta;
-- DELETE FROM Cuenta;
-- DELETE FROM Medio_Pago;

-- SELECT resetDB();


CREATE TABLE Categoria (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255)
    --modificador
);


CREATE TABLE Producto (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    id_categoria INT,
    --updated DATETIME,
    nombre VARCHAR(255),
    imagen VARCHAR(255),
    --codigo_ref
    descripcion VARCHAR(1024),
    --tamanio ?????? creo que no va
    precio_compra DECIMAL(12, 2),
    -- rentabilidad depende de como emmik mida este valor, 0 a 1? 0 a 100? 
    ganancia DECIMAL(12, 2),
    stock INT,

    FOREIGN KEY (id_categoria) REFERENCES Categoria (id_categoria)
);


CREATE TABLE Proveedor (
    id_proveedor INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255)
);


CREATE TABLE Producto_Proveedor (
    id_producto_proveedor INT AUTO_INCREMENT PRIMARY KEY,
    id_proveedor INT,
    id_producto INT,
    precio_compra DECIMAL(12, 2),

    FOREIGN KEY (id_proveedor) REFERENCES Proveedor (id_proveedor)
);

CREATE TABLE Compra (
    id_compra INT AUTO_INCREMENT PRIMARY KEY,
    id_proveedor INT, --foreign key
    total DECIMAL(12, 2),

    FOREIGN KEY (id_proveedor) REFERENCES Proveedor (id_proveedor)
);


CREATE TABLE Cuenta (
    id_cuenta INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR,
    saldo DECIMAL(12, 2)
);

CREATE TABLE Medio_Pago (
    id_medio_pago INT AUTO_INCREMENT PRIMARY KEY,
    id_cuenta INT,
    nombre VARCHAR(255),
    modificador DECIMAL(5, 2)

    FOREIGN KEY (id_cuenta) REFERENCES Cuenta (id_cuenta)
);

CREATE TABLE Venta (
    id_venta INT AUTO_INCREMENT PRIMARY KEY,
    id_medio_pago INT,
    fyh DATETIME,
    total DECIMAL(12, 2),
    estado char, -- completa / incompleta / cancelada ????
);

CREATE TABLE Linea_Venta (
    id_linea_venta INT AUTO_INCREMENT PRIMARY KEY,
    id_venta INT,
    id_producto INT,
    precio_venta DECIMAL(12, 2),
    cantidad INT,

    FOREIGN KEY (id_venta) REFERENCES Venta (id_venta),
    FOREIGN KEY (id_producto) REFERENCES Producto (id_producto)
);





--================ INSERTS ================--

--INSERT Categoria
INSERT INTO Categoria ('nombre') values 
('cat 1'),
('cat 2'),
('cat 3'),
('cat 4'),
('cat 5');

--INSERT Producto
INSERT INTO Producto 
    (id_categoria, nombre, imagen, descripcion, precio_compra, ganancia, stock)
VALUES 
    (1, 'Producto 1', 'imagen1.png', 'Descripción del producto 1', 10.99, 0.5, 100),
    (2, 'Producto 2', 'imagen2.png', 'Descripción del producto 2', 15.99, 0.3, 50),
    (3, 'Producto 3', 'imagen3.png', 'Descripción del producto 3', 20.99, 0.4, 80),
    (4, 'Producto 4', 'imagen4.png', 'Descripción del producto 4', 12.99, 0.6, 70),
    (5, 'Producto 5', 'imagen5.png', 'Descripción del producto 5', 18.99, 0.2, 90),
    (1, 'Producto 6', 'imagen6.png', 'Descripción del producto 6', 11.99, 0.7, 120),
    (3, 'Producto 7', 'imagen7.png', 'Descripción del producto 7', 14.99, 0.4, 60),
    (2, 'Producto 8', 'imagen8.png', 'Descripción del producto 8', 16.99, 0.5, 110),
    (4, 'Producto 9', 'imagen9.png', 'Descripción del producto 9', 19.99, 0.3, 80),
    (5, 'Producto 10', 'imagen10.png', 'Descripción del producto 10', 22.99, 0.6, 95),
    (3, 'Producto 11', 'imagen11.png', 'Descripción del producto 11', 13.99, 0.2, 65),
    (1, 'Producto 12', 'imagen12.png', 'Descripción del producto 12', 17.99, 0.4, 105),
    (2, 'Producto 13', 'imagen13.png', 'Descripción del producto 13', 21.99, 0.5, 85),
    (4, 'Producto 14', 'imagen14.png', 'Descripción del producto 14', 24.99, 0.3, 75),
    (5, 'Producto 15', 'imagen15.png', 'Descripción del producto 15', 27.99, 0.6, 100);

-- INSERT Proveedor
INSERT INTO Proveedor
    (nombre)
VALUES
    ('Proveedor 1'),
    ('Proveedor 2'),
    ('Proveedor 3'),
    ('Proveedor 4'),
    ('Proveedor 5'),
    ('Proveedor 6'),
    ('Proveedor 7');

-- INSERT Producto_Proveedor
INSERT INTO Producto_Proveedor (id_proveedor, id_producto, precio_compra)
VALUES
    (1, 1, 10.99),
    (2, 2, 15.99),
    (3, 3, 20.99),
    (4, 4, 12.99),
    (5, 5, 18.99),
    (6, 6, 11.99),
    (7, 7, 14.99),
    (1, 8, 16.99),
    (2, 9, 19.99),
    (3, 10, 22.99),
    (4, 11, 13.99),
    (5, 12, 17.99),
    (6, 13, 21.99),
    (7, 14, 24.99),
    (1, 15, 27.99);


-- INSERT Compra
INSERT INTO Compra (id_proveedor, total)
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


-- INSERT Cuenta
INSERT INTO Cuenta
    (nombre, saldo)
VALUES
    ('Banco Provincia', 50000),
    ('Mercado Pago', 33000),
    ('Efectivo', 30000);

-- INSERT Medio_Pago
INSERT INTO Medio_Pago
    (id_cuenta, nombre, modificador)
VALUES
    (1, 'QR Provincia', 1.2),
    (1, 'Transferencia Provincia', 1.1),
    (2, 'Transferencia Mercado Pago', 1.1),
    (3, 'Efectivo', 1);

-- INSERT Venta
INSERT INTO Venta 
    (id_medio_pago, fyh, total, estado)
VALUES
    (1, NOW(), 150.50, 'C'),
    (2, NOW(), 200.75, 'A'),
    (3, NOW(), 250.25, 'I'),
    (1, NOW(), 180.80, 'C'),
    (2, NOW(), 220.10, 'A'),
    (3, NOW(), 190.45, 'I'),
    (1, NOW(), 210.60, 'C'),
    (2, NOW(), 170.35, 'A'),
    (3, NOW(), 230.90, 'I'),
    (1, NOW(), 270.70, 'C'),
    (2, NOW(), 160.65, 'A'),
    (3, NOW(), 240.95, 'I'),
    (1, NOW(), 260.55, 'C'),
    (2, NOW(), 280.40, 'A'),
    (3, NOW(), 210.30, 'I');


-- INSERT Linea_Venta
INSERT INTO Linea_Venta 
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

-- Continuar insertando ventas y líneas de venta según sea necesario.



DELIMITER //
CREATE FUNCTION resetDB()
RETURNS INT
BEGIN
    ALTER TABLE Categoria AUTO_INCREMENT = 1;
    ALTER TABLE Producto AUTO_INCREMENT = 1;
    ALTER TABLE Proveedor AUTO_INCREMENT = 1;
    ALTER TABLE Producto_Proveedor AUTO_INCREMENT = 1;
    ALTER TABLE Compra AUTO_INCREMENT = 1;
    ALTER TABLE Venta AUTO_INCREMENT = 1;
    ALTER TABLE Linea_Venta AUTO_INCREMENT = 1;
    ALTER TABLE Cuenta AUTO_INCREMENT = 1;
    ALTER TABLE Medio_Pago AUTO_INCREMENT = 1;
    
    RETURN 1;
END //
DELIMITER ;
