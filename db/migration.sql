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

DROP TABLE IF EXISTS orders;
CREATE TABLE orders(
      id CHAR(8) PRIMARY KEY NOT NULL,
      product_id CHAR(8) NOT NULL,
      qty INT NOT NULL,
      state CHAR(10) NOT NULL DEFAULT 'ordered',
      client_id CHAR(8) NOT NULL
);