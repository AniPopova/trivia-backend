'use strict';
const { Question, Difficulty, Category } = require("../models");

const QuestionService = {
  getAllQuestions: async () => {
    try {
      const allQuestions = await Question.findAll({
        include: ["category", "difficulty"],
      });
      return allQuestions;
    } catch (error) {
      throw error;
    }
  },

  getQuestionsSorted: async (difficultyId, categoryId) => {
    try {
      // Validate difficultyId and categoryId as UUIDv4
      const validDifficulty = await Difficulty.findByPk(difficultyId);
      const validCategory = await Category.findByPk(categoryId);
  
      if (!validDifficulty || !validCategory) {
        throw new Error('Invalid difficultyId or categoryId, or one or both do not exist');
      }
  
      const sortedQuestions = await Question.findAll({
        order: [
          ["difficultyId", "ASC"],
          ["categoryId", "ASC"],
        ],
        include: [
          {
            model: Difficulty,
            as: "difficulty",
            where: { id: difficultyId },
          },
          {
            model: Category,
            as: "category",
            where: { id: categoryId },
          },
        ],
      });
  
      return sortedQuestions;
    } catch (error) {
      throw error;
    }
  }
  
};

module.exports = QuestionService;
