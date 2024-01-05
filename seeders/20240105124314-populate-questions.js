'use strict';

const fs = require('fs');
const path = require('path');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = fs.readFileSync(path.join(__dirname, '/trivia-backend/models/questions.json'), 'utf-8');
    const questions = JSON.parse(data);

    async function getDifficultyIdByName(name) {
      const difficulty = await queryInterface.sequelize.models.Difficulty.findOne({
        where: { name },
        attributes: ['id'],
      });
      return difficulty ? difficulty.id : null;
    }

    // Inside the seed script
    const questionsWithDifficultyIds = await Promise.all(
      questions.map(async (question) => {
        const difficultyId = await getDifficultyIdByName(question.difficulty);

        return {
          ...question,
          difficultyId,
          categoryId,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      })
    );

    // Insert seededQuestions into the database
    await queryInterface.bulkInsert('Questions', questionsWithDifficultyIds, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the inserted data
    await queryInterface.bulkDelete('Questions', null, {});
  },
};


'use strict';

const fs = require('fs');
const path = require('path');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Read questions from the JSON file
    const data = fs.readFileSync(path.join(__dirname, 'path/to/your/questions.json'), 'utf-8');
    const questions = JSON.parse(data);

    // Function to get difficulty ID by name
    async function getDifficultyIdByName(name) {
      const difficulty = await queryInterface.sequelize.models.Difficulty.findOne({
        where: { name },
        attributes: ['id'],
      });
      return difficulty ? difficulty.id : null;
    }

    // Mapping questions with difficulty IDs and other attributes
    const questionsWithDifficultyIds = await Promise.all(
      questions.map(async (question) => {
        const difficultyId = await getDifficultyIdByName(question.difficulty);
        const categoryId = await getCategoryIdByName(question.category);

        return {
          ...question,
          difficultyId,
          categoryId,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      })
    );

    // Insert seededQuestions into the 'Questions' table
    await queryInterface.bulkInsert('Questions', questionsWithDifficultyIds, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the inserted data from the 'Questions' table
    await queryInterface.bulkDelete('Questions', null, {});
  },
};


async function getCategoryIdByName(name, parentCategoryId = null) {
  const category = await queryInterface.sequelize.models.Category.findOne({
    where: { name, parentCategoryId },
    attributes: ['id'],
  });

  if (!category) {
    throw new Error(`Category not found: ${name}`);
  }

  return category.id;
}
