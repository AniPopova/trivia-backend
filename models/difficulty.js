'use strict';
const { Model, DataTypes, Sequelize } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
  class Difficulty extends Model {
    static associate(models) {
      Difficulty.hasMany(models.Question, {
        foreignKey: 'difficultyId', 
        as: 'questions', 
      });
    }
  }
  Difficulty.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          allowNull: false,
        }
      }
    },
    {
      sequelize,
      modelName: 'Difficulty',
    }
  );
  return Difficulty;
};

