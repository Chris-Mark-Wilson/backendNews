# Northcoders News API

Welcome to the NC-News API

A backend demonstration project emulating a real news API to an SQL database.

## System requirements
**psql (PostgreSQL) 14.9** 

**node v19.8.1**

 (may work on earlier versions, this is the version the api was developed on)
##
### Installation 
Fork and clone this repo https://github.com/Chris-Mark-Wilson/backendNews

Run the following code in the terminal:

    cd backendNews
    npm install
    npm run setup-dbs  

## **Important**
To ensure the project works on your local system you will need to add 2 files at the top level.  
 `.env.test`  
 `.env.developement`

each file should contain the name of the database:  
`PGDATABASE=nc_news_test` (in .env.test)  
`PGDATABASE=nc_news` (for .env.development)

If you require to use the app on a live hosted database (such as elephant sql) then you will also need 
` .env.production`  
containing  
`DATABASE_URL=your database url eg: postgres://igw...@surus.db.elephantsql.com`  

## Seeding
In order to utilise the database api you will need to seed the database.  
run  
`npm run seed`  







