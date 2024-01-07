const { Question, Category, Difficulty } = require('../models');

const quizService = {
  async generateQuiz({ category, difficulty }) {
    try {
      const questions = await Question.findAll({
        where: {},
        include: [
          { model: Category, as: 'category', where: { name: category } },
          { model: Difficulty, as: 'difficulty', where: { name: difficulty } },
        ],
      });

      const randomizedQuestions = questions.map((question) => {
        const answers = [
          question.correct_answer,
          ...question.incorrect_answers,
        ].sort(() => Math.random() - 0.5);

        return {
          ...question.toJSON(),
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
