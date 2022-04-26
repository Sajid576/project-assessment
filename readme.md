## QuickNode Framework

Simplified the setup of express node

### Installation
- Setup `mysql` docker container using:
```
$ sudo docker run -p 3306:3306 --name algorizin -e MYSQL_ROOT_PASSWORD=Password -d mysql:latest
```
- Install SQL DB client E.g- `DBeaver` and connect to installed docker container. 

- Clone this repo using

```
$ git clone
```

- Install `node modules` using

```
$ yarn
```

- Create database using

```
$ yarn db:create
```

- Perform database migrations and seeds using

```
$ yarn migrate
```

- Serve The App using

```
$ yarn dev
```
- Test the app using
```
$ yarn test
```


### Database sequlize thingy (SQL)

1. fresh migrate

```zsh
npx sequelize-cli db:migrate:undo:all && npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all
```

### Model & Seeder (example)

```zsh
npx sequelize-cli model:generate --name Role --attributes name:string
npx sequelize-cli seed:generate --name role
```

### Visualize ERD

```zsh
yarn erd
```
