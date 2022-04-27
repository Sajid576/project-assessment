module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Grades', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      marks: {
        type: Sequelize.INTEGER,
      },
      remarks: {
        type: Sequelize.INTEGER,
      },
      AssessmentId: {
        type: Sequelize.INTEGER,
      },
      AssessmentSubmissionId: {
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
    await queryInterface.dropTable('Grades');
  },
};
