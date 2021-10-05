'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Apartment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */

        static associate(models) {
            // define association here
            this.belongsTo(models.User, {
                foreignKey: {
                    name: 'creatorId'
                }
            });
            this.hasMany(models.Favorite,{
                foreignKey: {
                    name: 'apartmentId'
                }
            });
        }
    };
    Apartment.init({
        city: DataTypes.STRING,
        country: DataTypes.STRING,
        rooms: DataTypes.INTEGER,
        latitude: DataTypes.DECIMAL(8, 6),
        longitude: DataTypes.DECIMAL(9, 6),
        creatorId: {
            allowNull: false,
            type: DataTypes.INTEGER,
        }
    }, {
        sequelize,
        modelName: 'Apartment',
    });
    return Apartment;
};