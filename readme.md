## QuickNode Framework

Simplified the setup of express node

### Installation

1. git clone this repo
2. yarn
3.

### Development

1. Sequelize is setup following this tutorial https://dev.to/nedsoft/getting-started-with-sequelize-and-postgres-emp
1. If sequelize is not installed, globally, can use `npx sequelize-cli <command>`

### Serve The App

```
yarn start
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
npm run erd
```
