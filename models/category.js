'use strict';
const { Model, DataTypes } = require('sequelize');
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
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        unique: true
      }
    },
    {
      sequelize,
      modelName: 'Category',
    }
  );
  return Category;
};
