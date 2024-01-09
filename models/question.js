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
        type: Sequelize.UUIDV4,
        defaultValue: Sequelize.fn('gen_random_uuid'),
        primaryKey: true,
        allowNull: false,
      },
      type: DataTypes.STRING,
      difficultyId: Sequelize.UUIDV4,
      categoryId: Sequelize.UUIDV4,
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
