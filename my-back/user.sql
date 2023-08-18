CREATE DATABASE IF NOT EXISTS `login-db`;


CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    last_login_time DATETIME,
    registration_time DATETIME NOT NULL,
    status ENUM('active', 'blocked') NOT NULL
);

