'use strict';
const { Model, DataTypes } = require('sequelize');
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
        defaultValue: () => uuidv4(),
        primaryKey: true,
        allowNull: false,
      },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Difficulty',
    }
  );
  return Difficulty;
};
