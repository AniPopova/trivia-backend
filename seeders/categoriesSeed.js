// seeders/categoriesSeed.js
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = fs.readFileSync(path.join(__dirname, 'categoriesData.json'), 'utf-8');
    const categoriesData = JSON.parse(data);

    // Extract categories array from the data and generate UUIDs for each category
    const categoriesWithUuid = categoriesData.categories.map(category => ({
      id: uuidv4(),
      name: category,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Use Sequelize queryInterface to insert categories into the table
    await queryInterface.bulkInsert('Categories', categoriesWithUuid, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Delete all entries from the Categories table on rollback
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
