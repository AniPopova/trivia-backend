'use strict';
const { Question, Category, Difficulty, sequelize } = require('../models');

const quizService = {
  async generateQuiz({ category, difficulty, numQuestions }) {
    try {
      const questions = await Question.findAll({
        where: {},
        include: [
          { model: Category, as: 'category', where: { name: category } },
          { model: Difficulty, as: 'difficulty', where: { name: difficulty } },
        ],
        limit: numQuestions,
      });

      const randomizedQuestions = questions.map((question) => {
        const answers = question.incorrect_answers.map((answer) => ({
          text: answer,
          isCorrect: false,
        }));
       //combine correct and incorrect answers together
        answers.push({
          text: question.correct_answer,
          isCorrect: true,
        });

        answers.sort(() => Math.random() - 0.5);

        return {
          category: question.category,
          difficulty: question.difficulty,
          question: question.question,
          answers,
        };
      });

      return randomizedQuestions;
    } catch (error) {
      console.error(error);
      throw new Error('Error generating quiz');
    }
  },
};

module.exports = quizService;

