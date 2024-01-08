'use strict';
const { Question, Difficulty, Category } = require("../models");

const QuestionService = {
  getAllQuestions: async () => {
    try {
      const allQuestions = await Question.findAll();
      return allQuestions;
    } catch (error) {
      throw error;
    }
  },

  getAllQuestionsWithDetails: async () => {
    try {
      const allQuestions = await Question.findAll({
        include: ["category", "difficulty"],
      });
      return allQuestions;
    } catch (error) {
      throw error;
    }
  },

  getQuestionsSortedByDifficulty: async (difficultyName) => {
    try {
      const sortedQuestions = await Question.findAll({
        order: [["difficultyId", "ASC"]],
        include: {
          model: Difficulty,
          as: "difficulty",
          where: { name: difficultyName },
        },
      });
      return sortedQuestions;
    } catch (error) {
      throw error;
    }
  },

  getQuestionsSortedByCategory: async (categoryName) => {
    try {
      const sortedQuestions = await Question.findAll({
        order: [["categoryId", "ASC"]],
        include: {
          model: Category,
          as: "category",
          where: { name: categoryName },
        },
      });
      return sortedQuestions;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = QuestionService;
