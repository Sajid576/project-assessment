const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Vendor);
      this.belongsTo(models.User);
      this.belongsTo(models.Product);
    }
  }
  ProductList.init(
    {
      name: DataTypes.STRING,
      ProductId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      price: DataTypes.DECIMAL(10, 2),
      unit: DataTypes.STRING,
      VendorId: DataTypes.INTEGER,
      image: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'ProductList',
    },
  );
  return ProductList;
};
