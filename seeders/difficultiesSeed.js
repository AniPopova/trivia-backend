// seeders/difficultiesSeed.js
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = fs.readFileSync(path.join(__dirname, 'difficultiesData.json'), 'utf-8');
    const difficultiesData = JSON.parse(data);

    // Extract difficulties array from the data and generate UUIDs for each difficulty
    const difficultiesWithUuid = difficultiesData.difficulties.map(difficulty => ({
      id: uuidv4(),
      name: difficulty,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Use Sequelize queryInterface to insert difficulties into the table
    await queryInterface.bulkInsert('Difficulties', difficultiesWithUuid, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Delete all entries from the Difficulties table on rollback
    await queryInterface.bulkDelete('Difficulties', null, {});
  },
};
