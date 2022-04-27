module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AssessmentSubmissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      files: {
        type: Sequelize.STRING,
      },
      submissionDate: {
        type: Sequelize.DATE,
      },
      AssessmentId: {
        type: Sequelize.INTEGER,
      },
      UserId: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('AssessmentSubmissions');
  },
};
