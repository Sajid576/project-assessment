module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'Roles',
      [
        {
          id: 1,
          name: 'Admin',
        },
        {
          id: 2,
          name: 'Mentor',
        },
        {
          id: 3,
          name: 'Student',
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Roles', null, {});
  },
};
