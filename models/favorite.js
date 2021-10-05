'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: {
          name: 'userId'
        }
      });
      this.belongsTo(models.Apartment, {
        foreignKey: {
          name: 'apartmentId'
        }
      });
    }
  };
  Favorite.init({
    userId: DataTypes.STRING,
    apartmentId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Favorite',
  });
  return Favorite;
};