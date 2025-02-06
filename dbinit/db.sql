-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mydb` ;

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`User`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`User` ;

CREATE TABLE IF NOT EXISTS `mydb`.`User` (
  `UID` INT NOT NULL,
  `Email` VARCHAR(45) NOT NULL,
  `Password` VARCHAR(45) NOT NULL,
  `PhoneNumber` VARCHAR(45) NOT NULL,
  `FirstName` VARCHAR(45) NOT NULL,
  `LastName` VARCHAR(45) NOT NULL,
  `Address` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`UID`),
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Category` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Category` (
  `idCategory` INT NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  `Picture` VARCHAR(255) NULL,
  `Quantity` INT NULL,
  PRIMARY KEY (`idCategory`),
  UNIQUE INDEX `description_UNIQUE` (`description` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Product`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Product` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Product` (
  `ProdId` INT NOT NULL,
  `Category` INT NULL,
  `Name` VARCHAR(45) NULL,
  `Quantity` INT NULL,
  `Price` VARCHAR(45) NULL,
  `Batchnumber` VARCHAR(45) NULL,
  PRIMARY KEY (`ProdId`),
  UNIQUE INDEX `ProdId_UNIQUE` (`ProdId` ASC) VISIBLE,
  INDEX `Category_idx` (`Category` ASC) VISIBLE,
  UNIQUE INDEX `Batchnumber_UNIQUE` (`Batchnumber` ASC) VISIBLE,
  CONSTRAINT `Category`
    FOREIGN KEY (`Category`)
    REFERENCES `mydb`.`Category` (`idCategory`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`ShoppingCart`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`ShoppingCart` ;

CREATE TABLE IF NOT EXISTS `mydb`.`ShoppingCart` (
  `CartID` INT NOT NULL,
  `User` INT NULL,
  `Category` INT NULL,
  PRIMARY KEY (`CartID`),
  INDEX `User_idx` (`User` ASC) VISIBLE,
  INDEX `Category_idx` (`Category` ASC) VISIBLE,
  CONSTRAINT `User`
    FOREIGN KEY (`User`)
    REFERENCES `mydb`.`User` (`UID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `Category`
    FOREIGN KEY (`Category`)
    REFERENCES `mydb`.`Category` (`idCategory`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Grade`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Grade` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Grade` (
  `GradeID` INT NOT NULL,
  `User` INT NULL,
  `Category` INT NULL,
  `Rating` INT NULL,
  `Comment` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`GradeID`),
  UNIQUE INDEX `GradeID_UNIQUE` (`GradeID` ASC) VISIBLE,
  INDEX `User_idx` (`User` ASC) VISIBLE,
  INDEX `Category_idx` (`Category` ASC) VISIBLE,
  CONSTRAINT `User`
    FOREIGN KEY (`User`)
    REFERENCES `mydb`.`User` (`UID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `Category`
    FOREIGN KEY (`Category`)
    REFERENCES `mydb`.`Category` (`idCategory`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Admin`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Admin` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Admin` (
  `idAdmin` INT NOT NULL,
  `User` INT NULL,
  PRIMARY KEY (`idAdmin`),
  INDEX `User_idx` (`User` ASC) VISIBLE,
  CONSTRAINT `User`
    FOREIGN KEY (`User`)
    REFERENCES `mydb`.`User` (`UID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Supply`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Supply` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Supply` (
  `idSupply` INT NOT NULL,
  `Category` INT NULL,
  PRIMARY KEY (`idSupply`),
  INDEX `Category_idx` (`Category` ASC) VISIBLE,
  CONSTRAINT `Category`
    FOREIGN KEY (`Category`)
    REFERENCES `mydb`.`Category` (`idCategory`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
