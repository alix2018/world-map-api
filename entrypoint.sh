#!/bin/sh

# Connecting to the DB à la base de données

# wait until Postgres is ready
while ! pg_isready -q -h $DATABASE_HOST -p 5432 -U $DB_USER
do
  echo "$(date) - waiting for database to start"
  sleep 2
done

# Migrations commands
cd ./src/db
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

# RUN image
cd /world-map-api
npm run start:prod