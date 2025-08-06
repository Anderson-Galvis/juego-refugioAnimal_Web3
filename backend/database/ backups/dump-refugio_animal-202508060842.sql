-- MySQL dump 10.13  Distrib 8.0.42, for Linux (x86_64)
--
-- Host: localhost    Database: refugio_animal
-- ------------------------------------------------------
-- Server version	8.0.42-0ubuntu0.22.04.1

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
-- Table structure for table `acciones_mascotas`
--

DROP TABLE IF EXISTS `acciones_mascotas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acciones_mascotas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mascota_id` int NOT NULL,
  `tipo_accion` enum('alimentar','bañar','curar','entrenar','jugar','rescatar') NOT NULL,
  `fecha` datetime DEFAULT CURRENT_TIMESTAMP,
  `descripcion` text,
  PRIMARY KEY (`id`),
  KEY `mascota_id` (`mascota_id`),
  CONSTRAINT `acciones_mascotas_ibfk_1` FOREIGN KEY (`mascota_id`) REFERENCES `mascotas` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acciones_mascotas`
--

LOCK TABLES `acciones_mascotas` WRITE;
/*!40000 ALTER TABLE `acciones_mascotas` DISABLE KEYS */;
INSERT INTO `acciones_mascotas` VALUES (1,1,'alimentar','2025-07-08 10:05:26','Comida balanceada'),(2,1,'bañar','2025-07-08 10:05:26','Baño completo con jabón antiséptico'),(3,2,'jugar','2025-07-08 10:05:26','Jugó con ratón de juguete');
/*!40000 ALTER TABLE `acciones_mascotas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enfermedades`
--

DROP TABLE IF EXISTS `enfermedades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enfermedades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text,
  `severidad` int NOT NULL DEFAULT '1',
  `veces_para_curar` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enfermedades`
--

LOCK TABLES `enfermedades` WRITE;
/*!40000 ALTER TABLE `enfermedades` DISABLE KEYS */;
INSERT INTO `enfermedades` VALUES (1,'Gripe','Síntomas leves como estornudos y letargo.',1,1),(2,'Infección de oído','Molestias al mover la cabeza o rascarse mucho.',2,1),(3,'Parvovirus','Enfermedad viral grave que afecta a los cachorros.',3,1),(4,'Resfriado','Estornudos y letargo leve.',1,1),(5,'Gripe canina','Fiebre, tos y decaimiento.',1,2),(6,'Parásitos intestinales','Malestar estomacal y pérdida de apetito.',1,2),(7,'Fractura leve','Cojea, pero puede moverse.',1,3),(8,'Infección severa','Requiere varias visitas al veterinario.',1,4),(9,'Dermatitis','Pérdida de pelo y picazón constante.',1,2);
/*!40000 ALTER TABLE `enfermedades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eventos_salud`
--

DROP TABLE IF EXISTS `eventos_salud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventos_salud` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ficha_id` int NOT NULL,
  `tipo` enum('diagnóstico','tratamiento') NOT NULL,
  `descripcion` text,
  `fecha` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `ficha_id` (`ficha_id`),
  CONSTRAINT `eventos_salud_ibfk_1` FOREIGN KEY (`ficha_id`) REFERENCES `ficha_tecnica` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventos_salud`
--

LOCK TABLES `eventos_salud` WRITE;
/*!40000 ALTER TABLE `eventos_salud` DISABLE KEYS */;
INSERT INTO `eventos_salud` VALUES (1,1,'diagnóstico','Desnutrición severa detectada','2025-07-08 10:05:22'),(2,1,'tratamiento','Suministro de vitaminas iniciado','2025-07-08 10:05:22');
/*!40000 ALTER TABLE `eventos_salud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ficha_tecnica`
--

DROP TABLE IF EXISTS `ficha_tecnica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ficha_tecnica` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mascota_id` int NOT NULL,
  `fecha_rescate` datetime DEFAULT CURRENT_TIMESTAMP,
  `edad` int NOT NULL,
  `habilidades` text,
  `notas` text,
  `enfermedades` text,
  `tratamientos` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mascota_id` (`mascota_id`),
  CONSTRAINT `ficha_tecnica_ibfk_1` FOREIGN KEY (`mascota_id`) REFERENCES `mascotas` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ficha_tecnica`
--

LOCK TABLES `ficha_tecnica` WRITE;
/*!40000 ALTER TABLE `ficha_tecnica` DISABLE KEYS */;
INSERT INTO `ficha_tecnica` VALUES (1,1,'2025-07-08 00:00:00',3,'Jugar con pelota','Rescatado en mal estado','Desnutrición','Alimentación y vitamina'),(2,2,'2025-07-08 00:00:00',2,'Caza instintiva','Sin problemas visibles','','');
/*!40000 ALTER TABLE `ficha_tecnica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historial_enfermedades`
--

DROP TABLE IF EXISTS `historial_enfermedades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historial_enfermedades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mascota_id` int NOT NULL,
  `enfermedad_id` int NOT NULL,
  `fecha_inicio` datetime DEFAULT CURRENT_TIMESTAMP,
  `fecha_fin` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `mascota_id` (`mascota_id`),
  KEY `enfermedad_id` (`enfermedad_id`),
  CONSTRAINT `historial_enfermedades_ibfk_1` FOREIGN KEY (`mascota_id`) REFERENCES `mascotas` (`id`),
  CONSTRAINT `historial_enfermedades_ibfk_2` FOREIGN KEY (`enfermedad_id`) REFERENCES `enfermedades` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historial_enfermedades`
--

LOCK TABLES `historial_enfermedades` WRITE;
/*!40000 ALTER TABLE `historial_enfermedades` DISABLE KEYS */;
INSERT INTO `historial_enfermedades` VALUES (1,3,4,'2025-07-09 09:45:36',NULL);
/*!40000 ALTER TABLE `historial_enfermedades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historial_entrenamiento`
--

DROP TABLE IF EXISTS `historial_entrenamiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historial_entrenamiento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mascota_id` int NOT NULL,
  `tipo_entrenamiento_id` int NOT NULL,
  `fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `mascota_id` (`mascota_id`),
  KEY `tipo_entrenamiento_id` (`tipo_entrenamiento_id`),
  CONSTRAINT `historial_entrenamiento_ibfk_1` FOREIGN KEY (`mascota_id`) REFERENCES `mascotas` (`id`),
  CONSTRAINT `historial_entrenamiento_ibfk_2` FOREIGN KEY (`tipo_entrenamiento_id`) REFERENCES `tipos_entrenamiento` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historial_entrenamiento`
--

LOCK TABLES `historial_entrenamiento` WRITE;
/*!40000 ALTER TABLE `historial_entrenamiento` DISABLE KEYS */;
INSERT INTO `historial_entrenamiento` VALUES (1,3,1,'2025-07-08 21:26:55'),(2,3,1,'2025-07-08 21:34:45'),(3,3,1,'2025-07-08 21:34:48'),(4,3,1,'2025-07-08 21:34:51'),(5,3,1,'2025-07-09 20:35:14'),(6,3,1,'2025-07-09 21:44:32'),(7,3,1,'2025-07-09 21:44:37'),(8,3,2,'2025-07-09 21:44:49'),(9,3,2,'2025-07-09 21:44:51'),(10,3,2,'2025-07-09 21:44:52'),(11,3,2,'2025-07-09 21:44:52'),(12,3,2,'2025-07-09 21:44:52'),(13,3,2,'2025-07-09 21:44:52'),(14,3,2,'2025-07-09 21:44:52'),(15,3,2,'2025-07-09 21:44:52'),(16,3,2,'2025-07-09 21:44:52'),(17,3,2,'2025-07-09 21:44:53'),(18,3,2,'2025-07-09 21:44:53');
/*!40000 ALTER TABLE `historial_entrenamiento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historial_juegos`
--

DROP TABLE IF EXISTS `historial_juegos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historial_juegos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mascota_id` int NOT NULL,
  `tipo_juego_id` int NOT NULL,
  `fecha` datetime DEFAULT CURRENT_TIMESTAMP,
  `energia_resultante` float DEFAULT NULL,
  `experiencia_ganada` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `mascota_id` (`mascota_id`),
  KEY `tipo_juego_id` (`tipo_juego_id`),
  CONSTRAINT `historial_juegos_ibfk_1` FOREIGN KEY (`mascota_id`) REFERENCES `mascotas` (`id`) ON DELETE CASCADE,
  CONSTRAINT `historial_juegos_ibfk_2` FOREIGN KEY (`tipo_juego_id`) REFERENCES `tipos_juegos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historial_juegos`
--

LOCK TABLES `historial_juegos` WRITE;
/*!40000 ALTER TABLE `historial_juegos` DISABLE KEYS */;
INSERT INTO `historial_juegos` VALUES (1,3,2,'2025-07-08 16:12:22',100,8),(2,3,1,'2025-07-09 16:51:46',100,2),(3,3,1,'2025-07-09 16:51:48',100,2),(4,3,2,'2025-07-09 16:51:51',100,8),(5,3,2,'2025-07-09 16:51:51',100,8),(6,3,2,'2025-07-09 16:51:54',100,8),(7,3,2,'2025-07-09 16:51:54',100,8),(8,3,2,'2025-07-09 16:51:54',100,8),(9,3,2,'2025-07-09 16:51:55',100,8),(10,3,2,'2025-07-09 16:51:55',100,8),(11,3,2,'2025-07-09 16:51:55',100,8),(12,3,2,'2025-07-09 16:51:55',100,8),(13,3,2,'2025-07-09 16:51:55',100,8),(14,3,2,'2025-07-09 16:51:55',100,8),(15,3,2,'2025-07-09 16:51:56',100,8),(16,3,2,'2025-07-09 16:51:56',100,8),(17,3,2,'2025-07-09 16:51:56',100,8),(18,3,2,'2025-07-09 16:51:56',100,8),(19,3,2,'2025-07-09 16:51:56',100,8),(20,3,2,'2025-07-09 16:51:56',100,8),(21,3,2,'2025-07-09 16:51:57',100,8),(22,3,2,'2025-07-09 16:51:57',100,8),(23,3,2,'2025-07-09 16:51:57',100,8),(24,3,2,'2025-07-09 16:51:57',100,8),(25,3,2,'2025-07-09 16:51:57',100,8),(26,3,1,'2025-07-17 11:32:56',90,2),(27,3,1,'2025-07-17 11:32:58',95,2),(28,3,1,'2025-07-17 11:32:58',100,2),(29,3,1,'2025-07-17 11:33:05',100,2);
/*!40000 ALTER TABLE `historial_juegos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historial_salida`
--

DROP TABLE IF EXISTS `historial_salida`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historial_salida` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mascota_id` int NOT NULL,
  `fecha_salida` datetime DEFAULT CURRENT_TIMESTAMP,
  `motivo` enum('adoptada','fallecida','trasladada') DEFAULT 'adoptada',
  `score_otorgado` int DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `mascota_id` (`mascota_id`),
  CONSTRAINT `historial_salida_ibfk_1` FOREIGN KEY (`mascota_id`) REFERENCES `mascotas` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historial_salida`
--

LOCK TABLES `historial_salida` WRITE;
/*!40000 ALTER TABLE `historial_salida` DISABLE KEYS */;
INSERT INTO `historial_salida` VALUES (1,2,'2025-07-08 00:00:00','adoptada',100);
/*!40000 ALTER TABLE `historial_salida` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mapas`
--

DROP TABLE IF EXISTS `mapas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mapas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mapas`
--

LOCK TABLES `mapas` WRITE;
/*!40000 ALTER TABLE `mapas` DISABLE KEYS */;
INSERT INTO `mapas` VALUES (1,'Ciudad','Zona donde se rescatan las mascotas'),(2,'Refugio','Zona donde se cuidan y entrenan las mascotas');
/*!40000 ALTER TABLE `mapas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mascotas`
--

DROP TABLE IF EXISTS `mascotas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mascotas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `edad` int DEFAULT NULL,
  `especie` enum('perro','gato','otro') NOT NULL,
  `estado_salud` enum('saludable','enfermo','en tratamiento') DEFAULT NULL,
  `limpieza` int DEFAULT '0',
  `hambre` int DEFAULT '100',
  `entrenamiento` int DEFAULT '0',
  `juego` int DEFAULT '0',
  `habilidades` text,
  `diversion` int DEFAULT '0',
  `adoptado` tinyint(1) DEFAULT '0',
  `nivel_mascota` int DEFAULT '1',
  `partida_id` int NOT NULL,
  `tipo_id` int DEFAULT NULL,
  `enfermedad_id` int DEFAULT NULL,
  `progreso_curacion` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `partida_id` (`partida_id`),
  KEY `tipo_id` (`tipo_id`),
  KEY `enfermedad_id` (`enfermedad_id`),
  CONSTRAINT `mascotas_ibfk_1` FOREIGN KEY (`partida_id`) REFERENCES `partidas` (`id`) ON DELETE CASCADE,
  CONSTRAINT `mascotas_ibfk_2` FOREIGN KEY (`tipo_id`) REFERENCES `tipos_mascotas` (`id`),
  CONSTRAINT `mascotas_ibfk_3` FOREIGN KEY (`enfermedad_id`) REFERENCES `enfermedades` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mascotas`
--

LOCK TABLES `mascotas` WRITE;
/*!40000 ALTER TABLE `mascotas` DISABLE KEYS */;
INSERT INTO `mascotas` VALUES (1,'Max',NULL,'perro','enfermo',30,60,20,0,NULL,10,0,1,1,NULL,NULL,0),(2,'Luna',NULL,'gato','saludable',80,90,50,0,NULL,70,0,2,1,NULL,NULL,0),(3,'Firulais',3,'perro','saludable',100,100,100,100,'Ninguna',0,0,1,6,4,NULL,NULL);
/*!40000 ALTER TABLE `mascotas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partidas`
--

DROP TABLE IF EXISTS `partidas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `partidas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `nombre_refugio` varchar(100) NOT NULL,
  `ubicacion_actual` int NOT NULL,
  `score` int DEFAULT '0',
  `nivel_jugador` int DEFAULT '1',
  `experiencia` int DEFAULT '0',
  `vida` int DEFAULT '100',
  `energia` int DEFAULT '100',
  `en_juego` tinyint(1) DEFAULT '1',
  `fecha_inicio` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario_id` (`usuario_id`),
  KEY `ubicacion_actual` (`ubicacion_actual`),
  CONSTRAINT `partidas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  CONSTRAINT `partidas_ibfk_2` FOREIGN KEY (`ubicacion_actual`) REFERENCES `mapas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partidas`
--

LOCK TABLES `partidas` WRITE;
/*!40000 ALTER TABLE `partidas` DISABLE KEYS */;
INSERT INTO `partidas` VALUES (1,1,'Refugio Esperanza',2,0,1,0,100,100,1,'2025-07-08 10:05:11'),(3,2,'Refugio Esperanza',2,0,1,0,100,100,1,'2025-07-08 10:16:38'),(4,3,'Refugio Patitas Felices',2,0,1,0,100,100,1,'2025-07-08 10:31:56'),(5,4,'Refugio Estelar',1,0,1,0,100,100,1,'2025-07-08 11:41:47'),(6,5,'Refugio El Buen Amigo',2,0,1,469,100,100,1,'2025-07-08 14:00:33');
/*!40000 ALTER TABLE `partidas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipos_entrenamiento`
--

DROP TABLE IF EXISTS `tipos_entrenamiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipos_entrenamiento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `efecto_entrenamiento` int NOT NULL,
  `efecto_experiencia` int NOT NULL,
  `descripcion` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipos_entrenamiento`
--

LOCK TABLES `tipos_entrenamiento` WRITE;
/*!40000 ALTER TABLE `tipos_entrenamiento` DISABLE KEYS */;
INSERT INTO `tipos_entrenamiento` VALUES (1,'Trucos',15,10,'Aprender comandos básicos como sentarse y dar la pata.'),(2,'Higiene',10,8,'Entrenamiento para hacer sus necesidades en el lugar correcto.'),(3,'Obediencia',20,15,'Adiestramiento para competencias y obediencia avanzada.');
/*!40000 ALTER TABLE `tipos_entrenamiento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipos_juegos`
--

DROP TABLE IF EXISTS `tipos_juegos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipos_juegos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `efecto_energia` float NOT NULL,
  `efecto_experiencia` int NOT NULL,
  `descripcion` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipos_juegos`
--

LOCK TABLES `tipos_juegos` WRITE;
/*!40000 ALTER TABLE `tipos_juegos` DISABLE KEYS */;
INSERT INTO `tipos_juegos` VALUES (1,'Atrapar la pelota',5,2,'Mejora física y genera alegría'),(2,'Juguetes inteligentes',2,8,'Mejora mental y concentración'),(3,'Buscar objetos escondidos',3.5,5,'Desarrolla memoria y olfato');
/*!40000 ALTER TABLE `tipos_juegos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipos_mascotas`
--

DROP TABLE IF EXISTS `tipos_mascotas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipos_mascotas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `especie` varchar(20) NOT NULL,
  `raza` varchar(50) NOT NULL,
  `nivel_dificultad` int NOT NULL,
  `salud_inicial` enum('sano','enfermo') DEFAULT 'enfermo',
  `limpieza_inicial` int DEFAULT '10',
  `hambre_inicial` int DEFAULT '10',
  `juego_inicial` int DEFAULT '10',
  `entrenamiento_inicial` int DEFAULT '10',
  `recompensa_score` int DEFAULT '20',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipos_mascotas`
--

LOCK TABLES `tipos_mascotas` WRITE;
/*!40000 ALTER TABLE `tipos_mascotas` DISABLE KEYS */;
INSERT INTO `tipos_mascotas` VALUES (1,'Gato','Persa',1,'enfermo',20,20,15,12,25),(2,'Gato','Siames',2,'enfermo',15,10,12,15,35),(3,'Gato','Bengalí',3,'enfermo',5,10,10,10,45),(4,'Perro','Callejero',1,'enfermo',20,20,15,10,30),(5,'Perro','Pitbull',2,'enfermo',10,15,10,12,40),(6,'Perro','Pastor Alemán',3,'enfermo',5,10,10,8,50);
/*!40000 ALTER TABLE `tipos_mascotas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `fecha_registro` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'ernesto','segundo@email.com','$2b$10$sjFxD1H0NhPyNlKTmBGJmOzwMU/c4tqS8xjjWyl0Sm2eOWe0GIqm6','2025-07-08 09:51:37'),(2,'Stiven Tester','stiven@example.com','$2b$10$PruebaDeHashSeguroParaTesteo','2025-07-08 10:05:03'),(3,'Laura Salvadora','laura@example.com','$2b$10$1j22l61XRbajSfSQqEOX9uNr21CVc1izEVQmB5pkRPmmrr4t5f0ou','2025-07-08 10:31:02'),(4,'pruebas','prueba@example.com','$2b$10$Tk213wyZy0D/CTSEURVS5eE46Qc8.cpROum8KZ4XkKm89zowB/NtK','2025-07-08 11:11:23'),(5,'Juan López','juan@example.com','$2b$10$1NKzDOMBMOMBSerlQzAUQegvl/WBERxTdxBVMZS1nHwsO8chIJ36O','2025-07-08 13:53:48'),(6,'','','$2b$10$nufAUeBlPnxrnP08voBReucoZKRNIdJsYjkrgQwU./aat6ukcce8m','2025-07-17 10:43:36');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'refugio_animal'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-06  8:42:58
