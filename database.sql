CREATE DATABASE IF NOT EXISTS digital_artist;
USE digital_artist;
CREATE TABLE users(
    id int NOT NULL AUTO_INCREMENT,
    username VARCHAR(250),
    password VARCHAR(250),
    PRIMARY KEY(id)
);

INSERT INTO users(username, password) VALUES ('admin', 'f5bd2911609a9515c25a2d0cf601453b0929e06edbb5d16e3c6');