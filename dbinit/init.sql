CREATE DATABASE  IF NOT EXISTS `mydatabase` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mydatabase`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: mydatabase
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Category`
--

DROP TABLE IF EXISTS `Category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Category` (
  `CategoryID` int NOT NULL AUTO_INCREMENT,
  `Description` varchar(255) NOT NULL,
  `Image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`CategoryID`),
  UNIQUE KEY `Description_UNIQUE` (`Description`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Category`
--

LOCK TABLES `Category` WRITE;
/*!40000 ALTER TABLE `Category` DISABLE KEYS */;
INSERT INTO `Category` VALUES (5,'Mörk','Fin'),(6,'Mjölk','Fin'),(7,'Vit','Fin'),(8,'Ruby','Fin');
/*!40000 ALTER TABLE `Category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Grade`
--

DROP TABLE IF EXISTS `Grade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Grade` (
  `idGrade` int NOT NULL AUTO_INCREMENT,
  `User` int DEFAULT NULL,
  `Category` int DEFAULT NULL,
  `Grade` int DEFAULT NULL,
  `Comment` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idGrade`),
  KEY `Grade_User_FK_idx` (`User`),
  KEY `Grade_Category_FK_idx` (`Category`),
  CONSTRAINT `Grade_Category_FK` FOREIGN KEY (`Category`) REFERENCES `Category` (`CategoryID`),
  CONSTRAINT `Grade_User_FK` FOREIGN KEY (`User`) REFERENCES `User` (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Grade`
--

LOCK TABLES `Grade` WRITE;
/*!40000 ALTER TABLE `Grade` DISABLE KEYS */;
INSERT INTO `Grade` VALUES (1,4,5,5,'Den är god');
/*!40000 ALTER TABLE `Grade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OrderHistory`
--

DROP TABLE IF EXISTS `OrderHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OrderHistory` (
  `idOrderHistory` int NOT NULL AUTO_INCREMENT,
  `User` int DEFAULT NULL,
  `Date` datetime DEFAULT NULL,
  `TotalPrice` decimal(10,2) DEFAULT NULL,
  `Status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idOrderHistory`),
  KEY `OrderHistory_User_FK_idx` (`User`),
  CONSTRAINT `OrderHistory_User_FK` FOREIGN KEY (`User`) REFERENCES `User` (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OrderHistory`
--

LOCK TABLES `OrderHistory` WRITE;
/*!40000 ALTER TABLE `OrderHistory` DISABLE KEYS */;
INSERT INTO `OrderHistory` VALUES (1,2,'2025-03-02 18:59:32',NULL,'Pending'),(2,2,'2025-03-02 19:10:02',NULL,'Pending'),(11,2,'2025-03-02 19:37:16',NULL,'Pending'),(13,2,'2025-03-03 15:10:07',450.00,'Pending'),(15,4,'2025-03-04 16:07:21',680.00,'Pending');
/*!40000 ALTER TABLE `OrderHistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Orders`
--

DROP TABLE IF EXISTS `Orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Orders` (
  `idOrder` int NOT NULL AUTO_INCREMENT,
  `OrderHistory` int DEFAULT NULL,
  `Product` int DEFAULT NULL,
  `Quantity` int DEFAULT NULL,
  PRIMARY KEY (`idOrder`),
  KEY `Order_Product_FK_idx` (`Product`),
  KEY `Order_OrderHistory_FK_idx` (`OrderHistory`),
  CONSTRAINT `Order_OrderHistory_FK` FOREIGN KEY (`OrderHistory`) REFERENCES `OrderHistory` (`idOrderHistory`),
  CONSTRAINT `Order_Product_FK` FOREIGN KEY (`Product`) REFERENCES `Product` (`idProduct`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Orders`
--

LOCK TABLES `Orders` WRITE;
/*!40000 ALTER TABLE `Orders` DISABLE KEYS */;
INSERT INTO `Orders` VALUES (1,1,40,1),(2,11,39,2),(3,11,40,2),(4,11,42,5),(8,13,42,5),(9,13,43,5),(10,13,41,5),(13,15,41,8),(14,15,40,13);
/*!40000 ALTER TABLE `Orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Product`
--

DROP TABLE IF EXISTS `Product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Product` (
  `idProduct` int NOT NULL AUTO_INCREMENT,
  `Category` int DEFAULT NULL,
  `Size` int DEFAULT NULL,
  `Price` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`idProduct`),
  KEY `Product_Category_FK_idx` (`Category`),
  CONSTRAINT `Product_Category_FK` FOREIGN KEY (`Category`) REFERENCES `Category` (`CategoryID`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Product`
--

LOCK TABLES `Product` WRITE;
/*!40000 ALTER TABLE `Product` DISABLE KEYS */;
INSERT INTO `Product` VALUES (35,5,100,20.00),(36,5,200,30.00),(37,5,300,40.00),(38,6,100,20.00),(39,6,200,30.00),(40,6,300,40.00),(41,7,100,20.00),(42,7,200,30.00),(43,7,300,40.00),(44,8,100,20.00),(45,8,200,30.00),(46,8,300,40.00);
/*!40000 ALTER TABLE `Product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Role`
--

DROP TABLE IF EXISTS `Role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Role` (
  `RoleID` int NOT NULL AUTO_INCREMENT,
  `User` int DEFAULT NULL,
  `Role` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`RoleID`),
  KEY `Role_User_FK_idx` (`User`),
  CONSTRAINT `Role_User_FK` FOREIGN KEY (`User`) REFERENCES `User` (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Role`
--

LOCK TABLES `Role` WRITE;
/*!40000 ALTER TABLE `Role` DISABLE KEYS */;
INSERT INTO `Role` VALUES (1,5,'customer'),(2,6,'admin'),(3,4,'customer');
/*!40000 ALTER TABLE `Role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ShoppingCart`
--

DROP TABLE IF EXISTS `ShoppingCart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ShoppingCart` (
  `idShoppingCart` int NOT NULL AUTO_INCREMENT,
  `User` int DEFAULT NULL,
  `Product` int DEFAULT NULL,
  `Quantity` int DEFAULT NULL,
  PRIMARY KEY (`idShoppingCart`),
  KEY `ShoppingCart_User_FK_idx` (`User`),
  KEY `ShoppingCart_Productr_FK_idx` (`Product`),
  CONSTRAINT `ShoppingCart_Productr_FK` FOREIGN KEY (`Product`) REFERENCES `Product` (`idProduct`),
  CONSTRAINT `ShoppingCart_User_FK` FOREIGN KEY (`User`) REFERENCES `User` (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ShoppingCart`
--

LOCK TABLES `ShoppingCart` WRITE;
/*!40000 ALTER TABLE `ShoppingCart` DISABLE KEYS */;
INSERT INTO `ShoppingCart` VALUES (21,NULL,40,1),(22,NULL,40,1),(23,NULL,40,1),(24,NULL,40,1),(25,NULL,40,1),(27,2,42,8);
/*!40000 ALTER TABLE `ShoppingCart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Supply`
--

DROP TABLE IF EXISTS `Supply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Supply` (
  `idSupply` int NOT NULL AUTO_INCREMENT,
  `Product` int DEFAULT NULL,
  `Quantity` int DEFAULT NULL,
  PRIMARY KEY (`idSupply`),
  UNIQUE KEY `Product_UNIQUE` (`Product`),
  KEY `Supply_Product_FK_idx` (`Product`),
  CONSTRAINT `Supply_Product_FK` FOREIGN KEY (`Product`) REFERENCES `Product` (`idProduct`),
  CONSTRAINT `Supply_chk_1` CHECK ((`Quantity` > 0))
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Supply`
--

LOCK TABLES `Supply` WRITE;
/*!40000 ALTER TABLE `Supply` DISABLE KEYS */;
INSERT INTO `Supply` VALUES (34,35,30),(35,36,30),(36,37,38),(37,38,50),(38,39,46),(39,40,37),(40,41,37),(41,42,40),(42,43,45),(43,44,50),(44,45,50),(45,46,50);
/*!40000 ALTER TABLE `Supply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `idUser` int NOT NULL AUTO_INCREMENT,
  `Email` varchar(45) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `PhoneNumber` varchar(45) DEFAULT NULL,
  `FirstName` varchar(45) DEFAULT NULL,
  `LastName` varchar(45) DEFAULT NULL,
  `Address` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE KEY `Email_UNIQUE` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (2,'test@test.se','test','1234','testy','tester','gatan'),(4,'tester@test.se','$2b$10$SIEIpYPFQAMoPOdSO/N/BenDbllZZJnoDhygho/MJaFvkyHHVzb8S','1234','tester','test','gatan'),(5,'role@test.se','$2b$10$dURxnc9oP4DSSOemt3Hg7.SWed3GKZtaWnO5ieoMokmhC17jU0AzC','1234','role','test','gatan'),(6,'admin@admin.se','$2b$10$0KGOt0XxStewk8moX4u.EeNbr77XQyb/8svu88sfaiTvZ46m.cPoW','1234','admin','admin','admin');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'mydatabase'
--

--
-- Dumping routines for database 'mydatabase'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-05 17:19:08
