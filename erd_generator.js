const { writeFileSync } = require('fs');
const sequelizeErd = require('sequelize-erd');
const { sequelize } = require('./models');

(async function generateERD() {
  // const db = new Sequelize(/* Your Sequelize config object */);
  // Import DB models here

  const svg = await sequelizeErd({ source: sequelize }); // sequelizeErd() returns a Promise
  writeFileSync('./erd.svg', svg);

  // Writes erd.svg to local path with SVG file from your Sequelize models
}());
