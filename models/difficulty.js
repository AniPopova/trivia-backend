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
        type: DataTypes.UUIDV4,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
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
      modelName: 'Difficulty',
    }
  );

  return Difficulty;
};
