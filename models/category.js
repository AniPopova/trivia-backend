'use strict';
const { Model, DataTypes, Sequelize } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Question, {
        foreignKey: 'categoryId', 
        as: 'questions', 
      });
    }
  }

  Category.init(
    {
      id: {
        type: Sequelize.UUIDV4,
        defaultValue: Sequelize.fn('gen_random_uuid'),
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true, 
        },
      },
    },
    {
      sequelize,
      modelName: 'Category',
    }
  );

  return Category;
};
