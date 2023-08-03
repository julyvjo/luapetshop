-- MySQL dump 10.13  Distrib 8.0.33, for Linux (x86_64)
--
-- Host: localhost    Database: luapetshop
-- ------------------------------------------------------
-- Server version	8.0.33-0ubuntu0.22.04.4

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `id_categoria` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'categoria 1'),(2,'categoria 2'),(3,'categoria 3'),(4,'categoria 4'),(5,'categoria 5');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compra`
--

DROP TABLE IF EXISTS `compra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compra` (
  `id_compra` int NOT NULL AUTO_INCREMENT,
  `id_movimiento` int DEFAULT NULL,
  `id_proveedor` int DEFAULT NULL,
  `id_medio_pago` int DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `total` decimal(12,2) DEFAULT NULL,
  PRIMARY KEY (`id_compra`),
  KEY `id_proveedor` (`id_proveedor`),
  KEY `id_movimiento` (`id_movimiento`),
  KEY `id_medio_pago` (`id_medio_pago`),
  CONSTRAINT `compra_ibfk_1` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedor` (`id_proveedor`),
  CONSTRAINT `compra_ibfk_2` FOREIGN KEY (`id_movimiento`) REFERENCES `movimiento` (`id_movimiento`),
  CONSTRAINT `compra_ibfk_3` FOREIGN KEY (`id_medio_pago`) REFERENCES `medio_pago` (`id_medio_pago`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compra`
--

LOCK TABLES `compra` WRITE;
/*!40000 ALTER TABLE `compra` DISABLE KEYS */;
INSERT INTO `compra` VALUES (1,NULL,1,NULL,NULL,15000.00),(2,NULL,2,NULL,NULL,20000.00),(3,NULL,3,NULL,NULL,25000.00),(4,NULL,4,NULL,NULL,18000.00),(5,NULL,5,NULL,NULL,22000.00),(6,NULL,6,NULL,NULL,19000.00),(7,NULL,7,NULL,NULL,21000.00),(8,NULL,1,NULL,NULL,17000.00),(9,NULL,2,NULL,NULL,23000.00),(10,NULL,3,NULL,NULL,27000.00),(11,NULL,4,NULL,NULL,16000.00),(12,NULL,5,NULL,NULL,24000.00),(13,NULL,6,NULL,NULL,26000.00),(14,NULL,7,NULL,NULL,28000.00),(15,NULL,1,NULL,NULL,21000.00),(16,NULL,2,NULL,NULL,29000.00),(17,NULL,3,NULL,NULL,31000.00),(18,NULL,4,NULL,NULL,33000.00),(19,NULL,1,4,'2023-08-01 23:10:40',345.50),(20,25,1,4,'2023-08-01 23:13:27',345.70);
/*!40000 ALTER TABLE `compra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cuenta`
--

DROP TABLE IF EXISTS `cuenta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cuenta` (
  `id_cuenta` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `actualizado` datetime DEFAULT NULL,
  `fecha_apertura` datetime DEFAULT NULL,
  `saldo_inicial` decimal(12,2) DEFAULT NULL,
  `saldo` decimal(12,2) DEFAULT NULL,
  PRIMARY KEY (`id_cuenta`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuenta`
--

LOCK TABLES `cuenta` WRITE;
/*!40000 ALTER TABLE `cuenta` DISABLE KEYS */;
INSERT INTO `cuenta` VALUES (1,'Banco Provincia','2023-07-22 18:19:19','2023-07-14 00:00:00',0.00,51200.00),(2,'Mercado Pago','2023-07-22 18:19:19','2023-07-14 00:00:00',0.00,33400.00),(3,'Efectivo','2023-07-14 00:00:00','2023-07-14 00:00:00',0.00,29308.80);
/*!40000 ALTER TABLE `cuenta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `linea_venta`
--

DROP TABLE IF EXISTS `linea_venta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `linea_venta` (
  `id_linea_venta` int NOT NULL AUTO_INCREMENT,
  `id_venta` int DEFAULT NULL,
  `id_producto` int DEFAULT NULL,
  `precio_venta` decimal(12,2) DEFAULT NULL,
  `cantidad` int DEFAULT NULL,
  PRIMARY KEY (`id_linea_venta`),
  KEY `id_venta` (`id_venta`),
  KEY `id_producto` (`id_producto`),
  CONSTRAINT `linea_venta_ibfk_1` FOREIGN KEY (`id_venta`) REFERENCES `venta` (`id_venta`),
  CONSTRAINT `linea_venta_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `linea_venta`
--

LOCK TABLES `linea_venta` WRITE;
/*!40000 ALTER TABLE `linea_venta` DISABLE KEYS */;
INSERT INTO `linea_venta` VALUES (1,1,1,10.99,3),(2,1,2,15.99,2),(3,1,3,20.99,1),(4,2,4,12.99,4),(5,2,5,18.99,2),(6,2,6,11.99,3),(7,3,7,14.99,1),(8,3,8,16.99,2),(9,3,9,19.99,3),(10,4,10,22.99,2),(11,4,11,13.99,1),(12,4,12,17.99,4),(13,5,13,21.99,3),(14,5,14,24.99,2),(15,5,15,27.99,1),(16,6,1,10.99,2),(17,6,2,15.99,3),(18,6,3,20.99,1),(19,7,4,12.99,4),(20,7,5,18.99,2),(21,7,6,11.99,3),(22,8,7,14.99,1),(23,8,8,16.99,2),(24,8,9,19.99,3),(25,9,10,22.99,2),(26,9,11,13.99,1),(27,9,12,17.99,4),(28,10,13,21.99,3),(29,10,14,24.99,2),(30,10,15,27.99,1);
/*!40000 ALTER TABLE `linea_venta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medio_pago`
--

DROP TABLE IF EXISTS `medio_pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medio_pago` (
  `id_medio_pago` int NOT NULL AUTO_INCREMENT,
  `id_cuenta` int DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `modificador` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`id_medio_pago`),
  KEY `id_cuenta` (`id_cuenta`),
  CONSTRAINT `medio_pago_ibfk_1` FOREIGN KEY (`id_cuenta`) REFERENCES `cuenta` (`id_cuenta`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medio_pago`
--

LOCK TABLES `medio_pago` WRITE;
/*!40000 ALTER TABLE `medio_pago` DISABLE KEYS */;
INSERT INTO `medio_pago` VALUES (1,1,'QR Provincia',1.20),(2,1,'Transferencia Provincia',1.10),(3,2,'Transferencia Mercado Pago',1.10),(4,3,'Efectivo',1.00);
/*!40000 ALTER TABLE `medio_pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movimiento`
--

DROP TABLE IF EXISTS `movimiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movimiento` (
  `id_movimiento` int NOT NULL AUTO_INCREMENT,
  `id_cuenta` int DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `monto` decimal(12,2) DEFAULT NULL,
  `tipo` char(1) DEFAULT NULL,
  PRIMARY KEY (`id_movimiento`),
  KEY `id_cuenta` (`id_cuenta`),
  CONSTRAINT `movimiento_ibfk_1` FOREIGN KEY (`id_cuenta`) REFERENCES `cuenta` (`id_cuenta`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movimiento`
--

LOCK TABLES `movimiento` WRITE;
/*!40000 ALTER TABLE `movimiento` DISABLE KEYS */;
INSERT INTO `movimiento` VALUES (1,1,NULL,2000.00,'V'),(2,2,NULL,1500.00,'C'),(3,3,NULL,3000.00,'I'),(4,2,NULL,7000.00,'E'),(5,3,NULL,5000.00,'V'),(6,1,NULL,3000.00,'C'),(10,1,'2023-07-21 19:49:39',100.00,'V'),(11,1,'2023-07-21 19:54:24',100.00,'V'),(12,1,'2023-07-21 19:58:19',100.00,'V'),(13,1,'2023-07-21 19:59:42',100.00,'V'),(14,1,'2023-07-21 20:01:20',100.00,'V'),(15,1,'2023-07-21 20:01:20',200.00,'V'),(16,1,'2023-07-21 20:03:44',100.00,'V'),(17,1,'2023-07-21 20:03:44',200.00,'V'),(18,1,'2023-07-21 20:04:46',100.00,'V'),(19,2,'2023-07-21 20:04:46',200.00,'V'),(20,1,'2023-07-22 18:19:19',100.00,'V'),(21,2,'2023-07-22 18:19:19',200.00,'V'),(24,3,'2023-08-01 23:10:40',345.50,'C'),(25,3,'2023-08-01 23:13:27',345.70,'C');
/*!40000 ALTER TABLE `movimiento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `id_producto` int NOT NULL AUTO_INCREMENT,
  `id_categoria` int DEFAULT NULL,
  `id_proveedor` int DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `codigo` varchar(255) DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `descripcion` varchar(1024) DEFAULT NULL,
  `precio_compra` decimal(12,2) DEFAULT NULL,
  `rentabilidad` decimal(5,2) DEFAULT NULL,
  `ganancia` decimal(12,2) DEFAULT NULL,
  `precio_venta` decimal(12,2) DEFAULT NULL,
  `stock` int DEFAULT NULL,
  PRIMARY KEY (`id_producto`),
  KEY `id_categoria` (`id_categoria`),
  KEY `id_proveedor` (`id_proveedor`),
  CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`),
  CONSTRAINT `producto_ibfk_2` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedor` (`id_proveedor`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (1,1,1,'Producto 1','code123','imagen1.png','Descripción del producto 1',10.99,0.50,0.00,15.00,100),(2,2,1,'Producto 2','code123','imagen2.png','Descripción del producto 2',15.99,0.30,0.00,20.00,50),(3,3,1,'Producto 3','code123','imagen3.png','Descripción del producto 3',20.99,0.40,0.00,100.00,80),(4,4,1,'Producto 4','code123','imagen4.png','Descripción del producto 4',12.99,0.60,0.00,120.00,70),(5,5,1,'Producto 5','code123','imagen5.png','Descripción del producto 5',18.99,0.20,0.00,67.00,90),(6,1,1,'Producto 6','code123','imagen6.png','Descripción del producto 6',11.99,0.70,0.00,10.00,120),(7,3,1,'Producto 7','code123','imagen7.png','Descripción del producto 7',14.99,0.40,0.00,20.00,60),(8,2,1,'Producto 8','code123','imagen8.png','Descripción del producto 8',16.99,0.50,0.00,32.00,110),(9,4,1,'Producto 9','code123','imagen9.png','Descripción del producto 9',19.99,0.30,0.00,100.00,80),(10,5,1,'Producto 10','code123','imagen10.png','Descripción del producto 10',22.99,0.60,0.00,120.00,95),(11,3,1,'Producto 11','code123','imagen11.png','Descripción del producto 11',13.99,0.20,0.00,50.00,65),(12,1,1,'Producto 12','code123','imagen12.png','Descripción del producto 12',17.99,0.40,0.00,77.00,105),(13,2,1,'Producto 13','code123','imagen13.png','Descripción del producto 13',21.99,0.50,0.00,85.00,85),(14,4,1,'Producto 14','code123','imagen14.png','Descripción del producto 14',24.99,0.30,0.00,44.00,75),(15,5,1,'Producto 15','code123','imagen15.png','Descripción del producto 15',27.99,0.60,0.00,30.00,100);
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedor`
--

DROP TABLE IF EXISTS `proveedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proveedor` (
  `id_proveedor` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_proveedor`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedor`
--

LOCK TABLES `proveedor` WRITE;
/*!40000 ALTER TABLE `proveedor` DISABLE KEYS */;
INSERT INTO `proveedor` VALUES (1,'Proveedor 1'),(2,'Proveedor 2'),(3,'Proveedor 3'),(4,'Proveedor 4'),(5,'Proveedor 5'),(6,'Proveedor 6'),(7,'Proveedor 7');
/*!40000 ALTER TABLE `proveedor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'admin','$2a$10$BoJ47v3ebE/vnLMVQ1EvdOFunxxJZOCqVtmdVNEdg6aR1Gq9lBqS.');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `venta`
--

DROP TABLE IF EXISTS `venta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `venta` (
  `id_venta` int NOT NULL AUTO_INCREMENT,
  `id_movimiento1` int DEFAULT NULL,
  `id_movimiento2` int DEFAULT NULL,
  `id_medio_pago1` int DEFAULT NULL,
  `id_medio_pago2` int DEFAULT NULL,
  `parcial1` decimal(12,2) DEFAULT NULL,
  `parcial2` decimal(12,2) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `total` decimal(12,2) DEFAULT NULL,
  `estado` char(1) DEFAULT NULL,
  PRIMARY KEY (`id_venta`),
  KEY `id_movimiento1` (`id_movimiento1`),
  KEY `id_movimiento2` (`id_movimiento2`),
  KEY `id_medio_pago1` (`id_medio_pago1`),
  KEY `id_medio_pago2` (`id_medio_pago2`),
  CONSTRAINT `venta_ibfk_1` FOREIGN KEY (`id_movimiento1`) REFERENCES `movimiento` (`id_movimiento`),
  CONSTRAINT `venta_ibfk_2` FOREIGN KEY (`id_movimiento2`) REFERENCES `movimiento` (`id_movimiento`),
  CONSTRAINT `venta_ibfk_3` FOREIGN KEY (`id_medio_pago1`) REFERENCES `medio_pago` (`id_medio_pago`),
  CONSTRAINT `venta_ibfk_4` FOREIGN KEY (`id_medio_pago2`) REFERENCES `medio_pago` (`id_medio_pago`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venta`
--

LOCK TABLES `venta` WRITE;
/*!40000 ALTER TABLE `venta` DISABLE KEYS */;
INSERT INTO `venta` VALUES (1,NULL,NULL,1,NULL,NULL,NULL,'2023-07-19 21:56:54',150.50,'C'),(2,NULL,NULL,2,NULL,NULL,NULL,'2023-07-19 21:56:54',200.75,'C'),(3,NULL,NULL,3,NULL,NULL,NULL,'2023-07-19 21:56:54',250.25,'C'),(4,NULL,NULL,1,NULL,NULL,NULL,'2023-07-19 21:56:54',180.80,'C'),(5,NULL,NULL,2,NULL,NULL,NULL,'2023-07-19 21:56:54',220.10,'A'),(6,NULL,NULL,3,NULL,NULL,NULL,'2023-07-19 21:56:54',190.45,'C'),(7,NULL,NULL,1,NULL,NULL,NULL,'2023-07-19 21:56:54',210.60,'C'),(8,NULL,NULL,2,NULL,NULL,NULL,'2023-07-19 21:56:54',170.35,'A'),(9,NULL,NULL,3,NULL,NULL,NULL,'2023-07-19 21:56:54',230.90,'C'),(10,NULL,NULL,1,NULL,NULL,NULL,'2023-07-19 21:56:54',270.70,'C'),(11,NULL,NULL,2,NULL,NULL,NULL,'2023-07-19 21:56:54',160.65,'C'),(12,NULL,NULL,3,NULL,NULL,NULL,'2023-07-19 21:56:54',240.95,'A'),(13,NULL,NULL,1,NULL,NULL,NULL,'2023-07-19 21:56:54',260.55,'C'),(14,NULL,NULL,2,NULL,NULL,NULL,'2023-07-19 21:56:54',280.40,'C'),(15,NULL,NULL,3,NULL,NULL,NULL,'2023-07-19 21:56:54',210.30,'C'),(16,10,NULL,1,NULL,100.00,0.00,'2023-07-21 19:49:39',100.00,'C'),(17,11,NULL,1,NULL,100.00,0.00,'2023-07-21 19:54:24',100.00,'C'),(18,12,NULL,1,NULL,100.00,0.00,'2023-07-21 19:58:19',100.00,'C'),(19,13,NULL,1,NULL,100.00,0.00,'2023-07-21 19:59:42',100.00,'C'),(20,14,15,1,2,100.00,200.00,'2023-07-21 20:01:20',300.00,'C'),(21,16,17,1,2,100.00,200.00,'2023-07-21 20:03:44',300.00,'C'),(22,18,19,1,3,100.00,200.00,'2023-07-21 20:04:46',300.00,'C'),(23,20,21,1,3,100.00,200.00,'2023-07-22 18:19:19',300.00,'C');
/*!40000 ALTER TABLE `venta` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-03  1:40:38
