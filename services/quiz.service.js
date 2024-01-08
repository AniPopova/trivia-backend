'use strict';
const { Question, Category, Difficulty, sequelize } = require('../models');

const quizService = {
  async generateQuiz({ category, difficulty, numQuestions }) {
    try {
      // Validate category and difficulty IDs
      const validCategory = await Category.findByPk(category);
      const validDifficulty = await Difficulty.findByPk(difficulty);

      if (!validCategory || !validDifficulty) {
        throw new Error('Invalid category or difficulty');
      }

      let limitedNumQuestions = parseInt(numQuestions, 10);

      if (isNaN(limitedNumQuestions) || limitedNumQuestions <= 0) {
        throw new Error('Number of questions must be positive number!');
      }

      const questions = await Question.findAll({
        where: {
          categoryId: category,
          difficultyId: difficulty,
        },
        limit: limitedNumQuestions,
      });

      const randomizedQuestions = questions.map((question) => {
        const answers = question.incorrectAnswers.map((answer) => ({
          text: answer
        }));

        answers.push({
          text: question.correctAnswer
        });

        answers.sort(() => Math.random() - 0.5);

        return {
          questionId: question.id,
          questionText: question.question,
          answers,
          correctAnswer: question.correctAnswer,
        };
      });

      // Shuffle the order of appearance of questions
      randomizedQuestions.sort(() => Math.random() - 0.5);

      return randomizedQuestions;
    } catch (error) {
      console.error(error);
      throw new Error('Error generating quiz');
    }
  },
};

module.exports = quizService;
