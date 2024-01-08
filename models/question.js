'use strict';
const { Model, DataTypes, Sequelize } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
  class Question extends Model {
    static associate(models) {
      Question.belongsTo(models.Difficulty, { foreignKey: 'difficultyId', as: 'difficulty' });
      Question.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
    }
  }

  Question.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      type: DataTypes.STRING,
      difficultyId: DataTypes.UUID,
      categoryId: DataTypes.UUID,
      question: DataTypes.STRING,
      correctAnswer: DataTypes.STRING,
      incorrectAnswers: DataTypes.JSONB,
    },
    {
      sequelize,
      modelName: 'Question',
    }
  );

  return Question;
};
