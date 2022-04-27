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
      this.belongsTo(models.User);
    }
  }
  AssessmentSubmission.init(
    {
      files: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      submissionDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      AssessmentId: {
        type: DataTypes.INTEGER,
      },
      UserId: {
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
