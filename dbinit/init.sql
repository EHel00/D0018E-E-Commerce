-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

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
-- Table `mydatabase`.`User`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydatabase`.`User` ;

CREATE TABLE IF NOT EXISTS `mydatabase`.`User` (
  `idUser` INT NOT NULL AUTO_INCREMENT,
  `Email` VARCHAR(45) NULL,
  `Password` VARCHAR(45) NULL,
  `PhoneNumber` VARCHAR(45) NULL,
  `FirstName` VARCHAR(45) NULL,
  `LastName` VARCHAR(45) NULL,
  `Address` VARCHAR(45) NULL,
  PRIMARY KEY (`idUser`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydatabase`.`Role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydatabase`.`Role` ;

CREATE TABLE IF NOT EXISTS `mydatabase`.`Role` (
  `RoleID` INT NOT NULL AUTO_INCREMENT,
  `User` INT NULL,
  `Role` VARCHAR(45) NULL,
  PRIMARY KEY (`RoleID`),
  INDEX `Role_User_FK_idx` (`User` ASC) VISIBLE,
  CONSTRAINT `Role_User_FK`
    FOREIGN KEY (`User`)
    REFERENCES `mydatabase`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydatabase`.`Category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydatabase`.`Category` ;

CREATE TABLE IF NOT EXISTS `mydatabase`.`Category` (
  `CategoryID` INT NOT NULL AUTO_INCREMENT,
  `Description` VARCHAR(255) NULL,
  `Image` VARCHAR(255) NULL,
  PRIMARY KEY (`CategoryID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydatabase`.`Product`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydatabase`.`Product` ;

CREATE TABLE IF NOT EXISTS `mydatabase`.`Product` (
  `idProduct` INT NOT NULL AUTO_INCREMENT,
  `Category` INT NULL,
  `Size` VARCHAR(45) NULL,
  `Price` DECIMAL(4,2) NULL,
  PRIMARY KEY (`idProduct`),
  INDEX `Product_Category_FK_idx` (`Category` ASC) VISIBLE,
  CONSTRAINT `Product_Category_FK`
    FOREIGN KEY (`Category`)
    REFERENCES `mydatabase`.`Category` (`CategoryID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydatabase`.`Supply`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydatabase`.`Supply` ;

CREATE TABLE IF NOT EXISTS `mydatabase`.`Supply` (
  `idSupply` INT NOT NULL AUTO_INCREMENT,
  `Product` INT NULL,
  `Quantity` INT NULL,
  PRIMARY KEY (`idSupply`),
  INDEX `Supply_Product_FK_idx` (`Product` ASC) VISIBLE,
  CONSTRAINT `Supply_Product_FK`
    FOREIGN KEY (`Product`)
    REFERENCES `mydatabase`.`Product` (`idProduct`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydatabase`.`Order`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydatabase`.`Order` ;

CREATE TABLE IF NOT EXISTS `mydatabase`.`Order` (
  `idOrder` INT NOT NULL AUTO_INCREMENT,
  `Product` INT NULL,
  `Quantity` INT NULL,
  PRIMARY KEY (`idOrder`),
  INDEX `Order_Product_FK_idx` (`Product` ASC) VISIBLE,
  CONSTRAINT `Order_Product_FK`
    FOREIGN KEY (`Product`)
    REFERENCES `mydatabase`.`Product` (`idProduct`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydatabase`.`ShoppingCart`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydatabase`.`ShoppingCart` ;

CREATE TABLE IF NOT EXISTS `mydatabase`.`ShoppingCart` (
  `idShoppingCart` INT NOT NULL AUTO_INCREMENT,
  `User` INT NULL,
  `Order` INT NULL,
  PRIMARY KEY (`idShoppingCart`),
  INDEX `ShoppingCart_Order_FK_idx` (`Order` ASC) VISIBLE,
  INDEX `ShoppingCart_User_FK_idx` (`User` ASC) VISIBLE,
  CONSTRAINT `ShoppingCart_Order_FK`
    FOREIGN KEY (`Order`)
    REFERENCES `mydatabase`.`Order` (`idOrder`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `ShoppingCart_User_FK`
    FOREIGN KEY (`User`)
    REFERENCES `mydatabase`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
