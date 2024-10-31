CREATE DATABASE IF NOT EXISTS digital_artist;
USE digital_artist;

CREATE TABLE users(
    id int NOT NULL AUTO_INCREMENT,
    username VARCHAR(250),
    password VARCHAR(250),
    PRIMARY KEY(id)
);

INSERT INTO users(username, password) VALUES ('admin', 'f5bd2911609a9515c25a2d0cf601453b0929e06edbb5d16e3c6eeb8f3bdda54c');

CREATE TABLE projects(
    id  int NOT NULL AUTO_INCREMENT,
    title VARCHAR(255),
    description VARCHAR(255),
    image_key VARCHAR(255),
    hidden BOOLEAN DEFAULT FALSE,
    customer_link VARCHAR(255)
    PRIMARY KEY(id)
)