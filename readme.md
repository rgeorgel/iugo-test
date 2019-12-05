# IUGO - API

node.js API to be used on IUGO's assessment

# Environment setup
## Start the database
> docker-compose up -d
## Install dependencies
>npm i
## Execute migrations
>npx sequelize db:migrate
## Execute seeds
>npx sequelize db:seed:all

# How to run
## To run in development mode
### To start the database
> docker-compose up -d

### To start the application
> **npm start**