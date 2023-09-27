DROP DATABASE IF EXISTS furniture_system;
CREATE DATABASE furniture_system;

USE furniture_system;

DROP TABLE IF EXISTS products;
CREATE TABLE products(
      id CHAR(8) PRIMARY KEY NOT NULL,
      name VARCHAR(100) NOT NULL,
      price INT NOT NULL,
      qty INT NOT NULL
);