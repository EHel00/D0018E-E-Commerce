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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Category`
--

LOCK TABLES `Category` WRITE;
/*!40000 ALTER TABLE `Category` DISABLE KEYS */;
INSERT INTO `Category` VALUES (1,'Milk chocolate','Beautiful');
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
  CONSTRAINT `Grade_Category_FK` FOREIGN KEY (`Category`) REFERENCES `Category` (`CategoryID`) ON DELETE CASCADE,
  CONSTRAINT `Grade_User_FK` FOREIGN KEY (`User`) REFERENCES `User` (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Grade`
--

LOCK TABLES `Grade` WRITE;
/*!40000 ALTER TABLE `Grade` DISABLE KEYS */;
INSERT INTO `Grade` VALUES (1,2,1,4,'Amazing product'),(2,2,1,2,'Not sure about it'),(3,2,1,5,'The best'),(4,3,1,5,'Absolute greatest'),(5,3,1,1,'Worst ive had');
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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OrderHistory`
--

LOCK TABLES `OrderHistory` WRITE;
/*!40000 ALTER TABLE `OrderHistory` DISABLE KEYS */;
INSERT INTO `OrderHistory` VALUES (1,2,'2025-03-08 13:51:39',70.00,'Pending'),(3,3,'2025-03-09 00:30:06',180.00,'Pending'),(4,3,'2025-03-09 00:32:02',120.00,'Pending'),(5,3,'2025-03-09 00:34:55',50.00,'Pending'),(6,3,'2025-03-09 00:40:28',30.00,'Pending'),(7,3,'2025-03-09 00:42:23',70.00,'Pending'),(8,3,'2025-03-09 00:42:55',30.00,'Pending'),(9,3,'2025-03-09 00:43:50',20.00,'Pending'),(10,3,'2025-03-09 00:44:20',20.00,'Pending'),(11,3,'2025-03-09 00:47:11',30.00,'Pending'),(12,3,'2025-03-09 00:50:15',30.00,'Pending'),(13,2,'2025-03-09 12:42:23',50.00,'Pending'),(14,1,'2025-03-09 12:46:18',50.00,'Pending'),(15,2,'2025-03-09 13:00:52',50.00,'Pending');
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
  `Quantity` int DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `Size` int DEFAULT NULL,
  `Price` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`idOrder`),
  KEY `Order_OrderHistory_FK_idx` (`OrderHistory`),
  CONSTRAINT `Order_OrderHistory_FK` FOREIGN KEY (`OrderHistory`) REFERENCES `OrderHistory` (`idOrderHistory`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Orders`
--

LOCK TABLES `Orders` WRITE;
/*!40000 ALTER TABLE `Orders` DISABLE KEYS */;
INSERT INTO `Orders` VALUES (1,1,2,'Milk chocolate',200,35.00),(2,3,3,'Milk chocolate',600,60.00),(3,4,2,'Milk chocolate',600,60.00),(4,5,1,'Dark Chocolate',100,20.00),(5,5,1,'Dark Chocolate',200,30.00),(6,6,1,'Dark Chocolate',200,30.00),(7,7,2,'Dark Chocolate',100,20.00),(8,7,1,'Dark Chocolate',200,30.00),(9,8,1,'Dark Chocolate',200,30.00),(10,9,1,'Dark Chocolate',100,20.00),(11,10,1,'Dark Chocolate',100,20.00),(12,11,1,'Dark Chocolate',200,30.00),(13,12,1,'Dark Chocolate',200,30.00),(14,13,1,'Milk chocolate',400,50.00),(15,14,1,'Milk chocolate',400,50.00),(16,15,1,'Milk chocolate',400,50.00);
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
  KEY `Product_Category_FK_idx` (`Category`) /*!80000 INVISIBLE */,
  CONSTRAINT `Product_Category_FK` FOREIGN KEY (`Category`) REFERENCES `Category` (`CategoryID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Product`
--

LOCK TABLES `Product` WRITE;
/*!40000 ALTER TABLE `Product` DISABLE KEYS */;
INSERT INTO `Product` VALUES (2,1,400,50.00),(3,1,600,60.00);
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
INSERT INTO `Role` VALUES (1,1,'admin'),(2,2,'customer'),(3,3,'customer');
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
  CONSTRAINT `ShoppingCart_Productr_FK` FOREIGN KEY (`Product`) REFERENCES `Product` (`idProduct`) ON DELETE CASCADE,
  CONSTRAINT `ShoppingCart_User_FK` FOREIGN KEY (`User`) REFERENCES `User` (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ShoppingCart`
--

LOCK TABLES `ShoppingCart` WRITE;
/*!40000 ALTER TABLE `ShoppingCart` DISABLE KEYS */;
INSERT INTO `ShoppingCart` VALUES (26,1,2,2),(28,3,2,2),(30,2,2,2);
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
  CONSTRAINT `Supply_Product_FK` FOREIGN KEY (`Product`) REFERENCES `Product` (`idProduct`) ON DELETE CASCADE,
  CONSTRAINT `Supply_chk_1` CHECK ((`Quantity` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Supply`
--

LOCK TABLES `Supply` WRITE;
/*!40000 ALTER TABLE `Supply` DISABLE KEYS */;
INSERT INTO `Supply` VALUES (2,2,1),(3,3,35);
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'admin@admin.se','$2b$10$0KGOt0XxStewk8moX4u.EeNbr77XQyb/8svu88sfaiTvZ46m.cPoW','1234','admin','admin','admin'),(2,'cust@test.se','$2b$10$IioRiY34o/389ZQAfBbwSeZgmU/Um9cAmYub9qXpIeUt7PNcR52S6','1234567890','test','tester','testergatan12'),(3,'seb@test.se','$2b$10$GKXbdJoyn2wK81ty8lTDoucg0ciDn.VwvMi5icue9Nk4rKM7cXkDG','1234456778','test','testing','teststreet');
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

-- Dump completed on 2025-03-09 17:09:31
