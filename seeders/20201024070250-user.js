const bcrypt = require("bcrypt");
const faker = require("faker");
const helper = require("../helper");

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "sajid",
          email: "sajidahmed696@gmail.com",
          phone: "+8801535155114",
          password: bcrypt.hashSync("password", bcrypt.genSaltSync()),
          RoleId: 1,
          image: helper.getRandomImage(),
          verifiedAt: faker.date.past(2),
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => queryInterface.bulkDelete("Users", null, {}),
};
