const bcrypt = require('bcrypt');
const faker = require('faker');
const helper = require('../helper');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Users', [{
      name: 'johndoe',
      email: 'johndoe@example.com',
      phone: '+601111111111',
      password: bcrypt.hashSync('password', bcrypt.genSaltSync()),
      RoleId: 1,
      image: helper.getRandomImage(),
      verifiedAt: faker.date.past(2),
    },
    ], {});
  },

  down: async (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
