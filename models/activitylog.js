const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ActivityLog extends Model {
    static associate(models) {
      this.belongsTo(models.User);
    }
  }
  ActivityLog.init({
    description: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    ip_address: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'ActivityLog',
  });

  ActivityLog.log = (req, description) => (
    ActivityLog.create({ UserId: req.user.id, ip_address: req.ip, description })
  );

  return ActivityLog;
};
