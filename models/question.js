'use strict';
const { Model, DataTypes } = require('sequelize');
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
        defaultValue: () => uuidv4(),
        primaryKey: true,
        allowNull: false,
      },
      type: DataTypes.STRING,
      difficultyId: DataTypes.UUID, // Assuming you have a foreign key to Difficulty
      categoryId: DataTypes.UUID,
      question: DataTypes.STRING,
      correct_answer: DataTypes.STRING,
      incorrect_answers: DataTypes.JSONB, // Assuming you're using PostgreSQL for array storage
    },
    {
      sequelize,
      modelName: 'Question',
    }
  );
  return Question;
};
