'use strict';

/** @type {import('sequelize-cli').Migration} */
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = fs.readFileSync(path.join(__dirname, 'categoriesData.json'), 'utf-8');
    const categoriesData = JSON.parse(data);

    const categoriesWithUuid = categoriesData.categories.map(category => ({
      id: uuidv4(),
      name: category,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // insert categories into the table
    await queryInterface.bulkInsert('Categories', categoriesWithUuid, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Delete all entries on rollback
    await queryInterface.bulkDelete('Categories', null, {});
  },
};

