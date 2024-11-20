# This is a simple CRUD app for a digital artist

## Here is a demo video of the app: [Demo Video](https://youtu.be/lwDl8J4Fwt4)

## Requirements:

    MySQL Server - My version is : Ver 9.0.1 for macos14 on arm64 (MySQL Community Server - GPL)
    Insert the queries from database.sql into your MYSQL server

## The only accepted extensions for images are png & jpg

## The unhashed password for /login is : KLEM812pnd!

## Startup:

    cd frontend/
    npm install --force
    npm run dev

    cd ..
    cd backend/
    npm install --force
    npm start

    touch .env

    Add the following env variables inside your .env file

    MYSQL_PASSWORD="YOUR MYSQL SERVER PASSWORD"
    MYSQL_DATABASE="digital_artist"
    MYSQL_PORT="3306"
    MYSQL_HOST="localhost"
    MYSQL_USERNAME="root"
    SECRET="THIS IS A SECRET FOR AUTH"

## Have fun!
