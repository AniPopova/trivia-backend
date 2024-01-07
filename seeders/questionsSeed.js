'use strict';

const fs = require('fs');
const path = require('path');
require('../config/sequelize');
const questionsData = require('./triviaData.json');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    async function getCategoryIdByName(name) {
      const category = await queryInterface.sequelize.models.Category.findOne({
        where: { name },
        attributes: ['id'],
      });
      return category ? category.id : null;
    }

    async function getDifficultyIdByName(name) {
      const difficulty = await queryInterface.sequelize.models.Difficulty.findOne({
        where: { name },
        attributes: ['id'],
      });
      return difficulty ? difficulty.id : null;
    }

    // Inside the seed script
    const questionsWithCategoryAndDifficultyIds = await Promise.all(
      questionsData.results.map(async (question) => {
        const categoryId = await getCategoryIdByName(question.category);
        const difficultyId = await getDifficultyIdByName(question.difficulty);
    
        return {
          ...question,
          categoryId,
          difficultyId,
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





