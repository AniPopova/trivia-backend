'use strict';

const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const { Category, Difficulty, Question } = require('../models'); 

// JSON data
const rawData = fs.readFileSync(path.join(__dirname, 'triviaData.json'));
const questionsData = JSON.parse(rawData);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    async function getCategoryIdByName(name) {
      const category = await Category.findOne({
        where: { name },
        attributes: ['id'],
      });
      return category ? category.id : null;
    }

    async function getDifficultyIdByName(name) {
      const difficulty = await Difficulty.findOne({
        where: { name },
        attributes: ['id'],
      });
      return difficulty ? difficulty.id : null;
    }

    const questionsWithCategoryAndDifficultyIds = await Promise.all(
      questionsData.results.map(async (question) => {
        const categoryId = await getCategoryIdByName(question.category);
        const difficultyId = await getDifficultyIdByName(question.difficulty);
    
        return {
          id: uuidv4(),
          type: question.type,
          difficultyId,
          categoryId,
          question: question.question,
          correct_answer: question.correct_answer,
          incorrect_answers: JSON.stringify(question.incorrect_answers), 
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      })
    );

    await queryInterface.bulkInsert('Questions', questionsWithCategoryAndDifficultyIds, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Questions', null, {});
  },
};
