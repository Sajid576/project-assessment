const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AssessmentSubmission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Assessment);
    }
  }
  AssessmentSubmission.init(
    {
      file: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      submissionDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      grades: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      AssessmentId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'AssessmentSubmission',
    },
  );
  return AssessmentSubmission;
};
