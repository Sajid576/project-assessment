const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Grade extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Assessment);
      this.belongsTo(models.AssessmentSubmission);
    }
  }
  Grade.init(
    {
      marks: {
        type: DataTypes.INTEGER,
      },
      remarks: {
        type: DataTypes.INTEGER,
      },
      AssessmentId: {
        type: DataTypes.INTEGER,
      },
      AssessmentSubmissionId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'Grade',
    },
  );
  return Grade;
};
