# This is wonderful website for a digital artist

## Requirements:

    MySQL Server - My version is : Ver 9.0.1 for macos14 on arm64 (MySQL Community Server - GPL)
    Insert the queries from database.sql into your MYSQL server

## The only accepted extensions for images are png & jpg

## I wanted to add the authentication system but because I am new to the Nest JS ecosystem I didn't have time until now, the login page is just a simple check for password

## Startup:

    cd frontend/
    npm install postcss-load-config postcss -D postcss-discard-duplicates
    npm run dev

    cd ..
    cd backend/
    npm i typeorm
    npm start

    touch .env

    Add the following env variables inside your .env file

    MYSQL_PASSWORD="YOUR MYSQL SERVER PASSWORD"
    MYSQL_DATABASE="digital_artist"
    MYSQL_PORT="3306"
    MYSQL_HOST="localhost"
    MYSQL_USERNAME="root"

## I have a demo video of the app inside video folder

### Have fun!
