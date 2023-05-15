# Code test

## Before we start

start database and create database

```bash
docker-compose up -d
docker-compose exec db psql -U postgres -c "CREATE DATABASE erp_dev;
```

## Front-end

`cd app && yarn install`

`yarn dev`

open `http://127.0.0.1:4000/`

## Back-end

`cd server && yarn install`

`yarn start:dev`

open `localhost:4001/docs`

then you can view the documentation of APIs
