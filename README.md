# world-map-api

## To run the project
```
nvm use
npm install
npm run start
```

## Linting
```
npm run lint
```

## Developement build
```
npm run build
```

## Database
Go to the folder with the confid: ./scr/db:

Run pending migrations
```
npx sequelize-cli db:migrate
```

Run every seeder
```
npx sequelize-cli db:seed:all
```

Deletes data from the database
```
npx sequelize-cli db:seed:undo:all
```

Create database
```
npx sequelize-cli db:create
```

Delete database
```
npx sequelize-cli db:drop
```