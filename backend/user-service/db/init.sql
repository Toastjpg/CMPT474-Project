CREATE DATABASE IF NOT EXISTS sfu_oclp_user_db;
USE sfu_oclp_user_db;

DROP TABLE IF EXISTS Accounts;

CREATE TABLE Accounts (
    username VARCHAR(50) NOT NULL,
    email VARCHAR(64) NOT NULL,
    password VARCHAR(128) NOT NULL
);