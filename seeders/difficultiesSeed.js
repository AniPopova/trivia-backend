'use strict';
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = fs.readFileSync(path.join(__dirname, 'difficultiesData.json'), 'utf-8');
    const difficultiesData = JSON.parse(data);

    // Extract difficulties from the data and generate UUIDs for each difficulty
    const difficultiesWithUuid = difficultiesData.difficulties.map(difficulty => ({
      id: uuidv4(),
      name: difficulty,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Difficulties', difficultiesWithUuid, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Delete  on rollback
    await queryInterface.bulkDelete('Difficulties', null, {});
  },
};
