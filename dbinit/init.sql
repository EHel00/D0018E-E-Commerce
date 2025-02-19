-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema mydatabase
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mydatabase` ;

-- -----------------------------------------------------
-- Schema mydatabase
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydatabase` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `mydatabase` ;

-- -----------------------------------------------------
-- Table `mydatabase`.`Category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydatabase`.`Category` ;

CREATE TABLE IF NOT EXISTS `mydatabase`.`Category` (
  `CategoryID` INT NOT NULL AUTO_INCREMENT,
  `Description` VARCHAR(255) NOT NULL,
  `Image` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`CategoryID`),
  UNIQUE INDEX `Description_UNIQUE` (`Description` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mydatabase`.`User`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydatabase`.`User` ;

CREATE TABLE IF NOT EXISTS `mydatabase`.`User` (
  `idUser` INT NOT NULL AUTO_INCREMENT,
  `Email` VARCHAR(45) NULL DEFAULT NULL,
  `Password` VARCHAR(45) NULL DEFAULT NULL,
  `PhoneNumber` VARCHAR(45) NULL DEFAULT NULL,
  `FirstName` VARCHAR(45) NULL DEFAULT NULL,
  `LastName` VARCHAR(45) NULL DEFAULT NULL,
  `Address` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mydatabase`.`Grade`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydatabase`.`Grade` ;

CREATE TABLE IF NOT EXISTS `mydatabase`.`Grade` (
  `idGrade` INT NOT NULL AUTO_INCREMENT,
  `User` INT NULL DEFAULT NULL,
  `Category` INT NULL DEFAULT NULL,
  `Grade` INT NULL DEFAULT NULL,
  `Comment` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`idGrade`),
  INDEX `Grade_User_FK_idx` (`User` ASC) VISIBLE,
  INDEX `Grade_Category_FK_idx` (`Category` ASC) VISIBLE,
  CONSTRAINT `Grade_Category_FK`
    FOREIGN KEY (`Category`)
    REFERENCES `mydatabase`.`Category` (`CategoryID`),
  CONSTRAINT `Grade_User_FK`
    FOREIGN KEY (`User`)
    REFERENCES `mydatabase`.`User` (`idUser`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mydatabase`.`Product`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydatabase`.`Product` ;

CREATE TABLE IF NOT EXISTS `mydatabase`.`Product` (
  `idProduct` INT NOT NULL AUTO_INCREMENT,
  `Category` INT NULL DEFAULT NULL,
  `Size` INT NULL DEFAULT NULL,
  `Price` DECIMAL(5,2) NULL DEFAULT NULL,
  PRIMARY KEY (`idProduct`),
  INDEX `Product_Category_FK_idx` (`Category` ASC) VISIBLE,
  CONSTRAINT `Product_Category_FK`
    FOREIGN KEY (`Category`)
    REFERENCES `mydatabase`.`Category` (`CategoryID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mydatabase`.`Order`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydatabase`.`Order` ;

CREATE TABLE IF NOT EXISTS `mydatabase`.`Order` (
  `idOrder` INT NOT NULL AUTO_INCREMENT,
  `Product` INT NULL DEFAULT NULL,
  `Quantity` INT NULL DEFAULT NULL,
  PRIMARY KEY (`idOrder`),
  INDEX `Order_Product_FK_idx` (`Product` ASC) VISIBLE,
  CONSTRAINT `Order_Product_FK`
    FOREIGN KEY (`Product`)
    REFERENCES `mydatabase`.`Product` (`idProduct`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mydatabase`.`Role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydatabase`.`Role` ;

CREATE TABLE IF NOT EXISTS `mydatabase`.`Role` (
  `RoleID` INT NOT NULL AUTO_INCREMENT,
  `User` INT NULL DEFAULT NULL,
  `Role` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`RoleID`),
  INDEX `Role_User_FK_idx` (`User` ASC) VISIBLE,
  CONSTRAINT `Role_User_FK`
    FOREIGN KEY (`User`)
    REFERENCES `mydatabase`.`User` (`idUser`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mydatabase`.`ShoppingCart`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydatabase`.`ShoppingCart` ;

CREATE TABLE IF NOT EXISTS `mydatabase`.`ShoppingCart` (
  `idShoppingCart` INT NOT NULL AUTO_INCREMENT,
  `User` INT NULL DEFAULT NULL,
  `Product` INT NULL DEFAULT NULL,
  `Quantity` INT NULL,
  PRIMARY KEY (`idShoppingCart`),
  INDEX `ShoppingCart_User_FK_idx` (`User` ASC) VISIBLE,
  INDEX `ShoppingCart_Productr_FK_idx` (`Product` ASC) VISIBLE,
  CONSTRAINT `ShoppingCart_Productr_FK`
    FOREIGN KEY (`Product`)
    REFERENCES `mydatabase`.`Product` (`idProduct`),
  CONSTRAINT `ShoppingCart_User_FK`
    FOREIGN KEY (`User`)
    REFERENCES `mydatabase`.`User` (`idUser`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mydatabase`.`Supply`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydatabase`.`Supply` ;

CREATE TABLE IF NOT EXISTS `mydatabase`.`Supply` (
  `idSupply` INT NOT NULL AUTO_INCREMENT,
  `Product` INT NULL DEFAULT NULL,
  `Quantity` INT NULL DEFAULT NULL,
  PRIMARY KEY (`idSupply`),
  UNIQUE INDEX `Product_UNIQUE` (`Product` ASC) VISIBLE,
  INDEX `Supply_Product_FK_idx` (`Product` ASC) VISIBLE,
  CONSTRAINT `Supply_Product_FK`
    FOREIGN KEY (`Product`)
    REFERENCES `mydatabase`.`Product` (`idProduct`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
